import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from 'react-native-maps';
import GradientButton from './GradientButton';
import * as Location from "expo-location";
import * as TaskManager from 'expo-task-manager';
import { Dimensions } from 'react-native';

function Track({ navigation }) {
    const [region, setRegion] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    });
    const [coordinatesTrail, setTrail] = useState([])
    const [trackStatus, setStatus] = useState(false)
    const [elapsedDistance, setDistance] = useState(0)
    const [watchingStatus, setWatcher] = useState(null)
    const allCoordinates = useRef(null)
    allCoordinates.current = [...coordinatesTrail]

    const options = {
        enableHighAccuracy: true,
        distanceInterval: 10,
    };

    useEffect(() => {
        if (coordinatesTrail.length > 1) {
            let newDistance = elapsedDistance
            newDistance += distanceBetweenCoordinates(coordinatesTrail[coordinatesTrail.length - 2].latitude, coordinatesTrail[coordinatesTrail.length - 2].longitude, coordinatesTrail[coordinatesTrail.length - 1].latitude, coordinatesTrail[coordinatesTrail.length - 1].longitude)
            setDistance(newDistance)
        }
    }, [coordinatesTrail])

    function distanceBetweenCoordinates(la1, lo1, la2, lo2) {
        let lat1 = la1 * Math.PI / 180
        let lon1 = lo1 * Math.PI / 180
        let lat2 = la2 * Math.PI / 180
        let lon2 = lo2 * Math.PI / 180
        distance = 6371 * 1000 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1) + Math.sin(lat1) * Math.sin(lat2))
        return Math.floor(distance)
    }

    useEffect(() => {
        async function firstLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return
            }
            const location = await Location.getCurrentPositionAsync({});
            setRegion({
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            })
            let newCoordinates = {
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
            }
            let newTrail = allCoordinates.current
            newTrail.push(newCoordinates)
            setTrail(newTrail)
        }
        firstLocation()
    }, [])

    async function startTrack() {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted' || region === null) {
                return
            }
            setStatus(true)
            const watcher = await Location.watchPositionAsync(options, (location) => {
                try {
                    if (location.coords.accuracy > 30) { return }
                    let newCoordinates = {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                    }
                    setRegion({
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    })
                    console.log(location.coords.accuracy)
                    let newTrail = allCoordinates.current
                    newTrail.push(newCoordinates)
                    setTrail(newTrail)
                }
                catch (err) {
                    console.log(err)
                }
            });
            setWatcher(watcher)
        }
        catch (err) {
            console.log(err)
        }
    }

    async function stopTrack() {
        try {
            watchingStatus.remove()
            setStatus(false)
            setDistance(0)
            setTrail([])
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