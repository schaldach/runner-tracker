import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './components/Auth.js';
import LandingScreen from './components/Landing.js';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Helvetica: require('./assets/Helvetica.ttf'),
  });
  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={Auth}/>
        <Stack.Screen name="Landing" component={LandingScreen}/>
      </Stack.Navigator>

    </NavigationContainer>
  );
}
