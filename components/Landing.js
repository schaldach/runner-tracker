import GradientButton from './GradientButton';
import { Dimensions } from 'react-native';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

function LandingScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/runnerlogo.png')} />
            <View style={styles.description}>
                <Text style={styles.subtitletext}>Bem vindo ao Runner!</Text>
                <Text style={styles.descriptiontext}>Um aplicativo para você acompanhar as suas caminhadas, corridas, pedaladas, e muito mais.</Text>
                <GradientButton text='COMEÇAR' onPress={() => navigation.navigate('Auth')} />
                <Image style={styles.landingimg} source={require('../assets/running.jpg')} />
            </View>
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Helvetica',
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 50
    },
    description: {
        flex: 3,
        alignItems: 'center'
    },
    logo: {
        width: 250,
        height: 60,

    },
    landingimg: {
        width: windowWidth,
        height: windowWidth*4/5,
        marginTop: 20
    },
    descriptiontext:{
        fontFamily: 'Helvetica',
        textAlign: 'center',
        paddingHorizontal: 20,
        fontSize: 20
    },
    subtitletext:{
        fontFamily: 'Helvetica',
        fontSize: 30,
        marginTop: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

export default LandingScreen;