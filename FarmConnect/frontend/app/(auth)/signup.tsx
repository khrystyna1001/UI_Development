import { View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    }
from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

import { signup } from '../../scripts/api';

import styles from '../../styles/auth/signup.jsx';


const Icon = ({ name, size, color }) => (
  <Text style={{ fontSize: size, color: color, marginLeft: 10 }}>
    {name === 'arrow-right' ? '>' : ''}
  </Text>
);

export default function SignupScreen () {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const data = await signup(username, email, password, confirmPassword);
      
      if (data.key) {
        router.replace('/login');
      } else {
        setError('Registration successful but no authentication token received');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Signup failed. Please try again.');
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
          <Text style={styles.inputLabel}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            secureTextEntry
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

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
          <Icon name="arrow-right" size={20} color="#fff" />
        </Pressable>

        <Pressable style={styles.switchLink}
            onPress={() =>
                router.navigate('/login')
            }>
          <Text style={styles.switchLinkText}>Already have an account? Log In</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};
