import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from 'react-native-maps';
import GradientButton from './GradientButton';
import * as Location from "expo-location";
import * as TaskManager from 'expo-task-manager';
import { Dimensions } from 'react-native';

function Track({ navigation }) {
    const [region, setRegion] = useState(null);
    const [coordinates, setCoordinates] = useState(null)
    const [coordinatesTrail, setTrail] = useState([])
    const [trackType, setTrack] = useState('Livre')
    const [elapsedDistance, setDistance] = useState(0)
    const watchingStatus = useRef(null)

    const options = {
        enableHighAccuracy: true,
        distanceInterval: 10,
    };

    function distanceBetweenCoordinates(la1, lo1, la2, lo2){
        let lat1 = la1*Math.PI/180
        let lon1 = lo1*Math.PI/180
        let lat2 = la2*Math.PI/180
        let lon2 = lo2*Math.PI/180
        distance = 6371 * 1000 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2-lon1) + Math.sin(lat1) * Math.sin(lat2))
        return distance
    }

    async function startTrack(){
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return
        }
        watchingStatus = await Location.watchPositionAsync(options, (location) => {
            let newCoordinates = {
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
            }
            setCoordinates(newCoordinates)
            setRegion({
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            })
            let newDistance = elapsedDistance
            newDistance += distanceBetweenCoordinates(newCoordinates.latitude, newCoordinates.longitude, coordinatesTrail[coordinatesTrail.length-1].latitude, coordinatesTrail[coordinatesTrail.length-1].longitude)
            setDistance(newDistance)
            let newTrail = [...coordinatesTrail]
            newTrail.push(newCoordinates)
            setTrail(newTrail)
            console.log(location.coords)
        });
    }

    async function stopTrack(){
        Location.stopWatchingAsync(watchingStatus);
    }

    return (
        <View style={styles.container}>
            {region ?
                (
                    <View>
                        <MapView
                            zoomControlEnabled={true}
                            region={region}
                            mapType='hybrid'
                            style={styles.mapview}
                        >
                            <Marker coordinate={coordinates} />
                            <Polyline geodesic={true} strokeColor={'#FF4B2B'} lineCap='round' strokeWidth={5} coordinates={[{ latitude: -26.9190254, longitude: -48.649837, }, { latitude: -26.9190254, longitude: -48.652837, }, { latitude: -26.9200254, longitude: -48.655837, }]} />
                        </MapView>
                        <Text style={styles.text}>Longitude: {region.longitude}</Text>
                        <Text style={styles.text}>Latitude: {region.latitude}</Text>
                        <Text style={styles.text}>Você percorreu:</Text>
                        <Text style={styles.textDisplay}>{elapsedDistance}m</Text>
                        <GradientButton text='COMEÇAR CORRIDA' onPress={() => startTrack()}/>
                        <GradientButton text='TERMINAR CORRIDA' onPress={() => stopTrack()}/>
                    </View>
                )
                :
                (
                    <Text style={styles.text}>Loading...</Text>
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