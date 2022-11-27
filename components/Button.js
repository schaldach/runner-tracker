import { View, StyleSheet, Text, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function Button({ text }) {
    return (
        <LinearGradient start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} colors={['#FF416C', '#FF4B2B']} style={styles.button}>
            <Text style={styles.text}>{text}</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 40,
    },
    text: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Helvetica',
    }
});

export default Button;