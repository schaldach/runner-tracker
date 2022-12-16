import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from "react-native";
import Geolocation from 'react-native-geolocation-service';

function Track({ navigation }) {
    const location = null
    // const [location, setLocation] = useState(null);
    /* useEffect(() => {
        Geolocation.requestAuthorization();

        const watchId = Geolocation.watchPosition(
            (position) => {
                setLocation(position);
            },
            (error) => {
                console.log(error);
            },
            { enableHighAccuracy: true, distanceFilter: 0 }
        );

        return () => Geolocation.clearWatch(watchId);
    }, []); */

    return (
        <View style={styles.container}>
            {location ? (
                <Text style={styles.text}>
                    Latitude: {location.coords.latitude} Longitude: {location.coords.longitude}
                </Text>
            ) : (
                <Text style={styles.text}>Loading...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop: 100,
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Helvetica',
        fontSize: 40
    }
});

export default Track;