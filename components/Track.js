import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from "expo-location";
import { Dimensions } from 'react-native';

function Track({ navigation }) {
    const [region, setRegion] = useState(null);
    const [coordinates, setCoordinates] = useState(null)
    const [coordinatesTrail, setTrail] = useState([])
    const options = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
    };

    useEffect(() => {
        async function getFirstLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return
            }
            const locationWatcher = await Location.watchPositionAsync(options, (location) => {
                setCoordinates({
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude,
                })
                setRegion({
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                })
                console.log(location.coords)
            });

        }
        getFirstLocation()
    }, [])

    return (
        <View style={styles.container}>
            {region ?
                (
                    <View>
                        <MapView
                            zoomControlEnabled={true}
                            // onRegionChange={(region) => setRegion(region)}
                            region={region}
                            style={styles.mapview}
                        >
                            <Marker coordinate={coordinates} />
                            <Polyline strokeColor='#FF4B2B' strokeWidth={5} coordinates={[{latitude: -26.9190254,longitude: -48.649837,}, {latitude: -26.9190254,longitude: -48.652837,}, {latitude: -26.9200254,longitude: -48.655837,}]}/>
                        </MapView>
                        <Text style={styles.text}>Longitude: {region.longitude}</Text>
                        <Text style={styles.text}>Latitude: {region.latitude}</Text>
                    </View>)
                :
                (<Text style={styles.text}>Loading...</Text>)
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
    }
});

export default Track;