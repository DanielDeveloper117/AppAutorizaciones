import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import App from './App';

import stylesLogin from './stylesLogin';

const Login = () => {
  // Usamos refs para evitar la re-renderización del componente TextInput
  const usuarioRef = useRef<string>('');
  const passRef = useRef<string>('');

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [tipoUsuario, setTipoUsuario] = useState<string>('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userSession');
        if (storedUser) {
          const userSession = JSON.parse(storedUser);
          setIsLoggedIn(true);
          setTipoUsuario(userSession.tipoUsuario);
        }
      } catch (error) {
        console.error('Error loading user session', error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    const usuario = usuarioRef.current;
    const pass = passRef.current;

    if (!usuario || !pass) {
      setError('Por favor, llena todos los campos.');
      return;
    }

    try {
      const response = await axios.post('http://187.189.75.29:3000/api/login', {
        usuario,
        pass,
      });

      if (response.data.authenticated) {
        const tipoUsuarioResponse = response.data.usuario;
        setIsLoggedIn(true);
        setTipoUsuario(tipoUsuarioResponse);
        setError('');
        await AsyncStorage.setItem('userSession', JSON.stringify({ tipoUsuario: tipoUsuarioResponse }));
      } else {
        setError('Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      setError('Error al conectar con el servidor.');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userSession');
      setIsLoggedIn(false);
      setTipoUsuario('');
      RNRestart.Restart();
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };

  const LoginComponent = () => {
    return (
      <KeyboardAvoidingView
        style={stylesLogin.body}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={stylesLogin.section}>
          <LinearGradient
            colors={['#003c7e', '#2989d8', '#003c7e', '#7db9e8']}
            locations={[0, 0.5, 1, 1]}
            style={stylesLogin.sectionForm}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={stylesLogin.iconContainer}>
              <Icon name="account-circle" size={100} color="#ededed" />
            </View>

            <View style={stylesLogin.inputContainer}>
              <Text style={stylesLogin.label}>Correo</Text>
              <TextInput
                style={stylesLogin.input}
                placeholder="Ingresa tu correo"
                keyboardType="default"
                onChangeText={(text) => (usuarioRef.current = text)}
                autoCorrect={false}
                autoCapitalize="none"
              />
            </View>

            <View style={stylesLogin.inputContainer}>
              <Text style={stylesLogin.label}>Contraseña</Text>
              <TextInput
                style={stylesLogin.input}
                placeholder="Ingresa tu contraseña"
                secureTextEntry={true}
                onChangeText={(text) => (passRef.current = text)}
                autoCorrect={false}
                autoCapitalize="none"
              />
            </View>

            {error ? <Text style={stylesLogin.errorText}>{error}</Text> : null}

            <TouchableOpacity style={stylesLogin.btnGuardar} onPress={handleLogin}>
              <Text style={stylesLogin.textGuardar}>Iniciar sesión</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </KeyboardAvoidingView>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoggedIn ? <App usuario={usuarioRef.current} tipoUsuario={tipoUsuario} onLogout={handleLogout} /> : <LoginComponent />}
    </SafeAreaView>
  );
};

export default Login;
