import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import stylesConfig from './stylesConfiguracion'; 


export function Configuracion() {
    return (
        <SafeAreaView style={{height: '100%'}}>
                <View style={stylesConfig.title}>
                    <Icon name="miscellaneous-services" size={60} color="#797676" />
                    <Text style={stylesConfig.titleText}>Configuracion</Text>
                </View>

                <View style={stylesConfig.sectionForm}>
                    <View style={stylesConfig.inputContainer}>
                        <Text style={stylesConfig.label}>Número telefónico</Text>
                        <TextInput
                        style={stylesConfig.input}
                        placeholder="Ingresa tu número telefónico"
                        keyboardType="phone-pad"
                        // value={phoneNumber}
                        // onChangeText={setPhoneNumber}
                        />
                    </View>

                    <View style={stylesConfig.inputContainer}>
                        <Text style={stylesConfig.label}>Cambiar contraseña</Text>
                        <TextInput
                        style={stylesConfig.input}
                        placeholder="Ingresa tu nueva contraseña"
                        secureTextEntry={true}
                        // value={password}
                        // onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity style={stylesConfig.btnGuardar}>
                        <Text style={stylesConfig.textGuardar}>Guardar Cambios</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
}

export default Configuracion;