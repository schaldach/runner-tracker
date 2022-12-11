import { useFonts } from 'expo-font';
import * as React from 'react';
import Navbar from './components/Navbar.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './components/Auth.js';
import LandingScreen from './components/Landing.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
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
      <Tab.Navigator tabBar={props => <Navbar {...props} routes={['Auth', 'Landing']} />}>
        <Stack.Screen options={{ headerShown: false }} name="Landing" component={LandingScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Auth" component={Auth} />
      </Tab.Navigator>
    </NavigationContainer>

  );
}
