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

import { styles } from '../../styles/auth/signup.jsx'


const Icon = ({ name, size, color }) => (
  <Text style={{ fontSize: size, color: color, marginLeft: 10 }}>
    {name === 'arrow-right' ? '>' : ''}
  </Text>
);

export default function LoginScreen (onSwitchToLogin) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e) => {
      e.preventDefault();
      if (!login || !password || !confirmPassword) {
          alert("All fields are required for sign up.");
          return;
      }
      if (password !== confirmPassword) {
        alert("Error: Passwords do not match!");
        return;
      }

      if (password.length < 8) {
          alert("Password must be at least 8 characters long.");
          return;
      }

      console.log('Signing up with:', { login, password });
      alert("Sign Up successful! Please log in.");
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
            value={login}
            onChangeText={setLogin}
            keyboardType="email-address"
            autoCapitalize="none"
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

        <Pressable style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
          <Icon name="arrow-right" size={20} color="#fff" />
        </Pressable>

        <Pressable style={styles.switchLink}
            onPress={() =>
                router.navigate({pathname: '/login'})
            }>
          <Text style={styles.switchLinkText}>Already have an account? Log In</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};
