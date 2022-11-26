import { View, StyleSheet, Text, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function Button() {
    return (
        <LinearGradient colors={['#FF512F','#F09819']} style={styles.button}>
            <Text style={styles.text}>ENTRAR</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    text: {
        fontSize: 20,
        color: '#fff',
    }
});

export default Button;