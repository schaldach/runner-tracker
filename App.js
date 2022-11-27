import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Button from './components/Button.js';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InputField from './components/InputField.js';

export default function App() {
  const [username, setUsername] = useState('gabriel')
  const [password, setPassword] = useState('123456')

  const [loaded] = useFonts({
    Helvetica: require('./assets/Helvetica.ttf'),
  });
  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Runner</Text>
      <View style={styles.login}>
        <Text style={styles.text}>Entrar na Conta</Text>
        <InputField placeholder='Usuário' bottomMargin={true} state={username} stateFunction={setUsername} fieldName='Nome' />
        <InputField placeholder='Senha' passwordType={true} state={password} stateFunction={setPassword} fieldName='Senha' />
        <Button text='ENTRAR' />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Helvetica',
    flexDirection: 'column',
    backgroundColor: '#191414',
    alignItems: 'center',
  },
  title:{
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    color: '#fff',
    fontSize: 64,
  },
  login: {
    flex: 2,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontFamily: 'Helvetica',
    fontSize: 26,
    marginBottom: 20,
  }
});
