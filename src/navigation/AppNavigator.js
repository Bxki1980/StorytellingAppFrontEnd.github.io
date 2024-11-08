// src/navigation/AppNavigator.js
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HelpScreen from '../screens/HelpScreen';
import AboutScreen from '../screens/AboutScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PlaylistScreen from '../screens/PlaylistScreen';
import LibraryScreen from '../screens/LibraryScreen';
import StoryDetail from '../screens/StoryDetail';
import StoryReader from '../screens/StoryReader';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(null);

  useEffect(() => {
    // Check if onboarding has been completed
    const checkOnboardingStatus = async () => {
      const completed = await AsyncStorage.getItem('onboardingCompleted');
      setIsOnboardingCompleted(completed === 'true');
    };

    checkOnboardingStatus();
  }, []);

  if (isOnboardingCompleted === null) {
    // Return null or a loading screen while checking the status
    return null;
  }

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Playlist" component={PlaylistScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Library" component={LibraryScreen} />
        <Stack.Screen name="StoryDetail" component={StoryDetail} />
        <Stack.Screen name="StoryReader" component={StoryReader} />
      <Stack.Screen name="Help" component={HelpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
