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

import { styles } from '../../styles/auth/login.jsx';

const Icon = ({ name, size, color }) => (
  <Text style={{ fontSize: size, color: color, marginLeft: 10 }}>
    {name === 'arrow-right' ? '-->' : ''}
  </Text>
);

export default function LoginScreen (onSwitchToSignUp) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
      e.preventDefault();
      if (!login || !password) {
        alert("Please enter both login and password.");
        return;
      }
      console.log('Logging in with:', { login, password });
      alert("Login attempt successful (check console).");
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
            placeholder="Login"
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

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
          <Icon name="arrow-right" size={20} color="#fff" />
        </Pressable>

        <Pressable style={styles.switchLink}
            onPress={() =>
                router.navigate({pathname: '/signup'})
            }>
          <Text style={styles.switchLinkText}>Need an account? Sign Up</Text>
        </Pressable>

      </View>
    </KeyboardAvoidingView>
  );
};
