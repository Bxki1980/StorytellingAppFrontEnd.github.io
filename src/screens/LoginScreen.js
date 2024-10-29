// File: src/screens/LoginScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ApiService from '../services/ApiService'; // Correctly imported ApiService

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      await ApiService.login(trimmedEmail, trimmedPassword);

      Alert.alert('Success', 'Logged in successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]);
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage =
        error.response?.data || 'Invalid credentials. Please try again.';
      Alert.alert('Login Failed', errorMessage);
    }
  };

  const handleLoginWithGoogle = () => {
    Alert.alert('Info', 'Google Login not implemented yet.');
  };

  const handleGuestLogin = async () => {
    try {
      await ApiService.guestLogin();

      Alert.alert('Success', 'Logged in as Guest!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]);
    } catch (error) {
      console.error('Guest login error:', error);
      const errorMessage = error.response?.data || 'Unable to login as guest.';
      Alert.alert('Guest Login Failed', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        textContentType="password"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={styles.googleButton} onPress={handleLoginWithGoogle}>
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.guestButton} onPress={handleGuestLogin}>
        <Text style={styles.buttonText}>Continue as Guest</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>Don't have an account? Sign up here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // Same styles as before
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6347',
    alignSelf: 'center',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: '#DB4437',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  guestButton: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orText: {
    alignSelf: 'center',
    marginVertical: 10,
    fontSize: 16,
    color: '#555',
  },
  linkText: {
    color: '#FF6347',
    marginTop: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
