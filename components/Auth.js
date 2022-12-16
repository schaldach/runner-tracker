import GradientButton from './GradientButton.js';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import InputField from './InputField.js';

function Auth({ navigation }) {
    const [email, setEmail] = useState('gabimorgado0311@gmail.com')
    const [username, setUsername] = useState('gabriel')
    const [password, setPassword] = useState('123456')
    const [loginMode, changeLogin] = useState(true)
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/runnerlogo.png')} />
            {loginMode ?
                <View style={styles.login}>
                    <Text style={styles.text}>Entrar na Conta</Text>
                    <InputField placeholder='Email' bottomMargin={true} topMargin={true} state={email} stateFunction={setEmail} fieldName='Email' />
                    <InputField placeholder='Senha' passwordType={true} bottomMargin={true} state={password} stateFunction={setPassword} fieldName='Senha' />
                    <GradientButton text='ENTRAR' onPress={() => navigation.navigate('HomeNav', {screen:'Home'})}/>
                    <GradientButton text='INÍCIO' onPress={() => navigation.navigate('Landing')}/>
                    <View style={styles.loginchange}>
                        <Text style={styles.text}>Não possui uma conta?</Text>
                        <TouchableOpacity onPress={() => changeLogin(false)}>
                            <Text style={styles.discretetext}>Fazer Cadastro</Text>
                        </TouchableOpacity>
                    </View>
                </View> :
                <View style={styles.login}>
                    <Text style={styles.text}>Fazer Cadastro</Text>
                    <InputField placeholder='Email' bottomMargin={true} state={email} stateFunction={setEmail} fieldName='Email' />
                    <InputField placeholder='Confirmar email' bottomMargin={true} state={email} stateFunction={setEmail} fieldName='Confirmar email' />
                    <InputField placeholder='Usuário' bottomMargin={true} state={username} stateFunction={setUsername} fieldName='Nome' />
                    <InputField placeholder='Senha' passwordType={true} state={password} stateFunction={setPassword} fieldName='Senha' />
                    <GradientButton text='CADASTRAR' onPress={() => navigation.navigate('HomeNav', {screen:'Home'})}/>
                    <GradientButton text='INÍCIO' onPress={() => navigation.navigate('Landing')}/>
                    <View style={styles.loginchange}>
                        <Text style={styles.text}>Já possui uma conta?</Text>
                        <TouchableOpacity onPress={() => changeLogin(true)}>
                            <Text style={styles.discretetext}>Fazer Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
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
        paddingTop: 100
    },
    logo: {
        width: 250,
        height: 60,
    },
    discretetext: {
        fontSize: 16,
        fontFamily: 'Helvetica',
        marginLeft: 10,
        color: '#FF4B2B',
    },
    loginchange: {
        flexDirection: 'row',
        marginTop: 16
    },
    login: {
        flex: 3,
        alignItems: 'center',
    },
    text: {
        color: '#000',
        fontFamily: 'Helvetica',
        fontSize: 16,
    }
});

export default Auth;