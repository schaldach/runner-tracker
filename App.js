import { StatusBar } from 'expo-status-bar';
import Button from './components/Button.js';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InputField from './components/InputField.js';

export default function App() {
  const [username, setUsername] = useState('gabriel')
  const [password, setPassword] = useState('123456')
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Entrar na Conta</Text>
      <InputField placeholder='Usuário' state={username} stateFunction={setUsername} fieldName='Nome'/>
      <InputField placeholder='Senha' passwordType={true} state={username} stateFunction={setUsername} fieldName='Senha'/>
      <Button></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#191414',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    marginBottom: 20,
  }
});
