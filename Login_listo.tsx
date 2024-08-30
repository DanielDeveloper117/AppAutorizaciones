import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import App from './App';
import stylesLogin from './stylesLogin'; 

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [usuario, setUsuario] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        console.log('Enviando solicitud con:', { usuario, pass });
    
        try {
            const response = await axios.post('http://10.0.2.2:3000/api/login', {
                usuario,
                pass
            });
    
            console.log('Respuesta de la API:', response.data);
    
            if (response.data.authenticated) {
                setIsLoggedIn(true);
                setError('');
            } else {
                // Mensaje más amigable para el usuario
                if (response.data.message === 'Usuario o contraseña incorrectos') {
                    setError('Usuario o contraseña incorrectos. Por favor, verifica tus datos.');
                } else {
                    setError(response.data.message || 'No se pudo iniciar sesión. Inténte de nuevo.');
                }
            }
        } catch (error) {
            console.error('Error en la autenticación:', error);
    
            let errorMessage = 'No se pudo conectar con el servidor. Intente más tarde.';
    
            if (error instanceof Error) {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        if (error.response.status === 400) {
                            errorMessage = 'Por favor, llene todos los campos solicitados.';
                        } else if (error.response.status === 401) {
                            errorMessage = 'Usuario o contraseña incorrectos. Por favor, verifique la información.';
                        }
                    } else if (error.request) {
                        errorMessage = 'No fue posible conectarse al servidor. Verifique su conexión a internet.';
                    }
                } else {
                    errorMessage = error.message;
                }
            }
    
            setError(errorMessage);
        }
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
                                value={usuario}
                                onChangeText={setUsuario}
                            />
                        </View>

                        <View style={stylesLogin.inputContainer}>
                            <Text style={stylesLogin.label}>Contraseña</Text>
                            <TextInput
                                style={stylesLogin.input}
                                placeholder="Ingresa tu contraseña"
                                secureTextEntry={true}
                                value={pass}
                                onChangeText={setPass}
                            />
                        </View>

                        {error ? <Text style={stylesLogin.errorText}>{error}</Text> : null}

                        <TouchableOpacity style={stylesLogin.btnGuardar} onPress={handleLogin}>
                            <Text style={stylesLogin.textGuardar}>Iniciar sesión</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </SafeAreaView>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoggedIn ? <App /> : <LoginComponent />}
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
