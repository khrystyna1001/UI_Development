import { View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ActivityIndicator,
    } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { login } from '../../scripts/api';
import { styles } from '../../styles/auth/login.jsx';

const Icon = ({ name, size, color }) => (
  <Text style={{ fontSize: size, color: color, marginLeft: 10 }}>
    {name === 'arrow-right' ? '-->' : ''}
  </Text>
);

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      console.log('Attempting login with:', { username });
      const data = await login(username, password);
      console.log('Login response:', data);  // Add this line to see the actual response
      
      // Check for both 'key' and 'access' token in the response
      const token = data.key || data.access;
      
      if (token) {
        console.log('Token received, storing...');
        if (Platform.OS === 'web') {
          window.localStorage.setItem('userToken', token);
          // Also store the refresh token if available
          if (data.refresh) {
            window.localStorage.setItem('refreshToken', data.refresh);
          }
        } else {
          await SecureStore.setItemAsync('userToken', token);
          if (data.refresh) {
            await SecureStore.setItemAsync('refreshToken', data.refresh);
          }
        }
        router.replace('/(tabs)');
      } else {
        console.error('No token in response:', data);
        setError('Invalid response from server. No token received.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.screenContainer}
    >
      <View style={styles.content}>
        <Text style={styles.appTitle}>FarmConnect</Text>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <Pressable 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.buttonText}>Log In</Text>
              <Icon name="arrow-right" size={20} color="#fff" />
            </>
          )}
        </Pressable>

        <Pressable style={styles.switchLink}
            onPress={() =>
                router.navigate('/signup')
            }>
          <Text style={styles.switchLinkText}>Need an account? Sign Up</Text>
        </Pressable>

      </View>
    </KeyboardAvoidingView>
  );
};
