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
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <Navbar {...props} routes={['Home', 'Track', 'Profile']} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Track" component={Track} />
      <Tab.Screen name="Profile" component={Profile} />
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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="HomeNav" component={HomeNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
