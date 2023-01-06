import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from 'react-native-maps';
import GradientButton from './GradientButton';
import * as Location from "expo-location";
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';

const BACKGROUND_TRACKING = 'BACKGROUND_TRACKING'

async function getSavedCoordinates() {
    try {
        const item = await AsyncStorage.getItem('background_coords')
        return item ? JSON.parse(item) : []
    } catch (e) {
        return []
    }

}

TaskManager.defineTask(BACKGROUND_TRACKING, async ({ data, error }) => {
    if (error) {
        console.error(error);
        return;
    }
    if (data) {
        const { locations } = data
        const coords = locations[0].coords
        console.log('oi', coords)
        if (coords.accuracy > 40) { return }
        let allCoordinates = await getSavedCoordinates()
        let length = allCoordinates.length
        console.log(coords, allCoordinates)
        if (!length || coords.longitude !== allCoordinates[length - 1].longitude || coords.latitude !== allCoordinates[length - 1].latitude) {
            allCoordinates.push(coords)
            await AsyncStorage.setItem('background_coords', JSON.stringify(allCoordinates))
        }
    }
});

function Track({ navigation }) {
    const [region, setRegion] = useState(null);
    const [coordinatesTrail, setTrail] = useState([])
    const [trackStatus, setStatus] = useState(false)
    const [elapsedDistance, setDistance] = useState(0)
    const [watchingStatus, setWatcher] = useState(null)
    const allCoordinates = useRef(null)
    allCoordinates.current = [...coordinatesTrail]

    useEffect(() => {
        if (coordinatesTrail.length > 1) {
            let newDistance = elapsedDistance
            newDistance += distanceBetweenCoordinates(coordinatesTrail[coordinatesTrail.length - 2].latitude, coordinatesTrail[coordinatesTrail.length - 2].longitude, coordinatesTrail[coordinatesTrail.length - 1].latitude, coordinatesTrail[coordinatesTrail.length - 1].longitude)
            setDistance(newDistance)
        }
    }, [coordinatesTrail.length])

    function distanceBetweenCoordinates(la1, lo1, la2, lo2) {
        let lat1 = la1 * Math.PI / 180
        let lon1 = lo1 * Math.PI / 180
        let lat2 = la2 * Math.PI / 180
        let lon2 = lo2 * Math.PI / 180
        const distance = 6371 * 1000 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1) + Math.sin(lat1) * Math.sin(lat2))
        return Math.floor(distance)
    }

    async function fetchBackgroundCoordinates() {
        try {
            let backgroundTrail = JSON.parse(await AsyncStorage.getItem('background_coords'))
            console.log('ola', backgroundTrail, backgroundTrail[0].latitude, backgroundTrail[0].longitude)
            setTrail(backgroundTrail)
            setRegion({
                latitude: backgroundTrail[0].latitude,
                longitude: backgroundTrail[0].longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            })
        }
        catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        async function firstLocation() {
            try {
                let foreground = await Location.requestForegroundPermissionsAsync();
                let background = await Location.requestBackgroundPermissionsAsync();
                if (foreground.status !== 'granted' || background.status !== 'granted') {
                    return
                }
                const location = await Location.getCurrentPositionAsync({});
                setRegion({
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                })
            }
            catch (err) {
                console.log(err)
            }
        }
        firstLocation()
    }, [])

    async function startTrack() {
        try {
            if (region === null) {
                return
            }
            setStatus(true)
            setTrail([region])
            await AsyncStorage.setItem('background_coords', JSON.stringify([]))
            setInterval(fetchBackgroundCoordinates, 5000)
            await Location.startLocationUpdatesAsync(BACKGROUND_TRACKING, {
                deferredUpdatesInterval: 1000,
                deferredUpdatesDistance: 10,
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    async function stopTrack() {
        try {
            watchingStatus.remove()
            Location.stopLocationUpdatesAsync(BACKGROUND_TRACKING)
            await AsyncStorage.setItem('background_coords', JSON.stringify([]))
            setStatus(false)
            setDistance(0)
            setTrail([region])
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <View style={styles.container}>
            {trackStatus ?
                (
                    <View>
                        <MapView
                            zoomControlEnabled={true}
                            region={region}
                            mapType='hybrid'
                            style={styles.mapview}
                        >
                            <Marker coordinate={region} />
                            <Polyline geodesic={true} strokeColor={'#FF4B2B'} lineCap='round' strokeWidth={5} coordinates={coordinatesTrail} />
                        </MapView>
                        <Text style={styles.text}>Longitude: {region.longitude}</Text>
                        <Text style={styles.text}>Latitude: {region.latitude}</Text>
                        <Text style={styles.text}>Você percorreu:</Text>
                        <Text style={styles.textDisplay}>{elapsedDistance}m</Text>
                        <Text style={styles.text}>Você registrou:</Text>
                        <Text style={styles.textDisplay}>{coordinatesTrail.length} posições</Text>
                        <GradientButton text='TERMINAR CORRIDA' onPress={() => stopTrack()} />
                    </View>
                )
                :
                (
                    <View>
                        <GradientButton text='COMEÇAR CORRIDA' onPress={() => startTrack()} />
                    </View>
                )
            }
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapview: {
        width: windowWidth * 7 / 8,
        height: windowWidth * 7 / 8
    },
    text: {
        fontFamily: 'Helvetica',
        fontSize: 20
    },
    textDisplay: {
        fontFamily: 'Helvetica',
        fontSize: 20,
        color: '#FF4B2B'
    }
});

export default Track;