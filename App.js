import { useFonts } from 'expo-font';
import * as React from 'react';
import Navbar from './components/Navbar.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './components/Auth.js';
import Profile from './components/Profile.js';
import Home from './components/Home.js';
import Track from './components/Track.js';
import LandingScreen from './components/Landing.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeNav({ navigation }) {
  return (
    <Tab.Navigator tabBar={props => <Navbar {...props} routes={['Home', 'Track', 'Profile']} />}>
      <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
      <Stack.Screen options={{ headerShown: false }} name="Track" component={Track} />
      <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

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
        <Stack.Screen options={{ headerShown: false }} name="Landing" component={LandingScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Auth" component={Auth} />
        <Stack.Screen options={{ headerShown: false }} name="HomeNav" component={HomeNav} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
