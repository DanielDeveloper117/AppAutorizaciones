import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  StyleSheet
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import App from './App';

import stylesLogin from './stylesLogin'; 


const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        console.log('Login button pressed');
        setIsLoggedIn(true);
      };

    const LoginComponent = () => {
        return (
        <SafeAreaView style={stylesLogin.body}>
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
                        <Text style={stylesLogin.label}>Usuario</Text>
                        <TextInput
                        style={stylesLogin.input}
                        placeholder="Ingresa tu nombre de usuario"
                        keyboardType="default"
                        // value={phoneNumber}
                        // onChangeText={setPhoneNumber}
                        />
                    </View>

                    <View style={stylesLogin.inputContainer}>
                        <Text style={stylesLogin.label}>Contraseña</Text>
                        <TextInput
                        style={stylesLogin.input}
                        placeholder="Ingresa tu contraseña"
                        secureTextEntry={true}
                        // value={password}
                        // onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity style={stylesLogin.btnGuardar} onPress={handleLogin}>
                        <Text style={stylesLogin.textGuardar}>Iniciar sesion</Text>
                    </TouchableOpacity>
                </LinearGradient>

            </View>
        </SafeAreaView>
        );
    };

    let content;

    if (isLoggedIn) {
        content = <App />;

      } else {
        content = <LoginComponent />;
      }

      console.log('isLoggedIn:', isLoggedIn);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {content}
        </SafeAreaView>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});

export default Login;