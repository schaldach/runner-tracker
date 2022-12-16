import { View, StyleSheet } from "react-native";
import GradientButton from "./GradientButton";

function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <GradientButton text='VOLTAR' onPress={() => navigation.navigate('Auth')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

})

export default Home;