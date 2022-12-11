import GradientButton from './GradientButton';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

function LandingScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>RUNNER</Text>
            <View style={styles.description}>
                <GradientButton text='COMEÇAR' onPress={() => navigation.navigate('Auth')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Helvetica',
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    description:{
        flex: 3
    },
    title: {
        flex: 1,
        textAlignVertical: 'bottom',
        textAlign: 'center',
        fontFamily: 'Helvetica',
        color: '#000',
        borderBottomColor: '#fff',
        borderBottomWidth: 2,
        fontSize: 64,
    }
});

export default LandingScreen;