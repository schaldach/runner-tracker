import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function GradientButton({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} colors={['#FF416C', '#FF4B2B']} style={styles.button}>
                <Text style={styles.text}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 75,
    },
    text: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Helvetica',
    }
});

export default GradientButton;