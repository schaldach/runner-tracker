import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

function LandingScreen({ navigation }) {
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile', { name: 'Jane' })}></TouchableOpacity>
        </View>
    );
}

export default LandingScreen;