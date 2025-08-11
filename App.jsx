import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';

import React from 'react';

import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen
  from './src/screens/DashboardScreen';  // Make sure this path is correct
import HomeScreen
  from './src/screens/HomeScreen';  // Make sure this path is correct
import LoginScreen
  from './src/screens/LoginScreen';  // Make sure this path is correct
import SignupScreen from './src/screens/SignupScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HOME" component={HomeScreen} />
        <Stack.Screen name="LOGIN" component={LoginScreen} />
        <Stack.Screen name="SIGNUP" component={SignupScreen} />
        <Stack.Screen name="DASHBOARD" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});