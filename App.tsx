import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Pendientes from './Pendientes';
import Autorizados from './Autorizados';
import Configuracion from './Configuracion';
import Login from './Login';

import styles from './styles';
import { LogLevel, OneSignal } from 'react-native-onesignal';


const { width, height } = Dimensions.get('window');

export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnim = useState(new Animated.Value(-width * 0.8))[0];
  const backdropOpacity = useState(new Animated.Value(0))[0];
  const [isArrowRightVisiblePendientes, setIsArrowRightVisiblePendientes] = useState(true);
  const [subMenuHeightPendientes, setSubMenuHeightPendientes] = useState(new Animated.Value(0));
  const [isArrowRightVisibleAutorizados, setIsArrowRightVisibleAutorizados] = useState(true);
  const [subMenuHeightAutorizados, setSubMenuHeightAutorizados] = useState(new Animated.Value(0));
  const [selectedComponent, setSelectedComponent] = useState('Pendientes');

  //-------------PRUEBAS DE NOTIFICACIONES PUSH OneSignal-----------------------
    // Remove this method to stop OneSignal Debugging
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // OneSignal Initialization
    OneSignal.initialize("7e4843fb-2466-4180-9343-74ef25a3ac82");
  
    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    OneSignal.Notifications.requestPermission(true);
  
    // Method for listening for notification clicks
    OneSignal.Notifications.addEventListener('click', (event) => {
      console.log('OneSignal: notification clicked:', event);
    });
  //----------------------------------------------------------------------------
  const toggleMenu = () => {
    if (menuVisible) {
      Animated.parallel([
        Animated.timing(menuAnim, {
          toValue: -width * 0.8,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 100,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        })
      ]).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.parallel([
        Animated.timing(menuAnim, {
          toValue: 0,
          duration: 100,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0.5,
          duration: 700,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        })
      ]).start();
    }
  };

  const handleBackdropPress = () => {
    if (menuVisible) {
      toggleMenu();
    }
  };

  const togglePendientes = () => {
    if (isArrowRightVisiblePendientes) {
      Animated.timing(subMenuHeightPendientes, {
        toValue: 100, // Adjust based on the height of your submenu
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(subMenuHeightPendientes, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
    setIsArrowRightVisiblePendientes(!isArrowRightVisiblePendientes);
  };

  const toggleAutorizados = () => {
    if (isArrowRightVisibleAutorizados) {
      Animated.timing(subMenuHeightAutorizados, {
        toValue: 100, // Adjust based on the height of your submenu
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(subMenuHeightAutorizados, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
    setIsArrowRightVisibleAutorizados(!isArrowRightVisibleAutorizados);
  };

  const handleSelectComponent = (component: string) => {
    if (component === 'Pendientes') {
      setTimeout(() => setSelectedComponent('Pendientes'), 100); // Forzar rerenderización
    } else {
      setSelectedComponent(component);
    }

    if (component === 'PendientesOrdenesCompra') {
      setTimeout(() => setSelectedComponent('PendientesOrdenesCompra'), 100); // Forzar rerenderización
    } else {
      setSelectedComponent(component);
    }
    if (component === 'PendientesSolicitudesGastos') {
      setTimeout(() => setSelectedComponent('PendientesSolicitudesGastos'), 100); // Forzar rerenderización
    } else {
      setSelectedComponent(component);
    }
    if (component === 'Autorizados') {
      setTimeout(() => setSelectedComponent('Autorizados'), 100); // Forzar rerenderización
    } else {
      setSelectedComponent(component);
    }
    if (component === 'AutorizadosOrdenesCompra') {
      setTimeout(() => setSelectedComponent('AutorizadosOrdenesCompra'), 100); // Forzar rerenderización
    } else {
      setSelectedComponent(component);
    }
    if (component === 'AutorizadosSolicitudesGastos') {
      setTimeout(() => setSelectedComponent('AutorizadosSolicitudesGastos'), 100); // Forzar rerenderización
    } else {
      setSelectedComponent(component);
    }
    if (component === 'Configuracion') {
      setTimeout(() => setSelectedComponent('Configuracion'), 100); // Forzar rerenderización
    } else {
      setSelectedComponent(component);
    }
    if (component === 'Login') {
      setTimeout(() => setSelectedComponent('Login'), 100); // Forzar rerenderización
    } else {
      setSelectedComponent(component);
    }
  };
  
  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Pendientes':
        return <Pendientes queryProp="" propState={false}/>;
      case 'PendientesOrdenesCompra':
        return <Pendientes queryProp="ordenesCompra" propState={false}/>;
      case 'PendientesSolicitudesGastos':
        return <Pendientes queryProp="solicitudesGastos" propState={false}/>;
      case 'Autorizados':
        return <Autorizados queryProp="" />;
      case 'AutorizadosOrdenesCompra':
        return <Autorizados queryProp="ordenesCompra"/>;
      case 'AutorizadosSolicitudesGastos':
        return <Autorizados queryProp="solicitudesGastos"/>;
      case 'Configuracion':
        return <Configuracion />;
      // case 'Login':
      //   return <Login />;
      default:
        return <Pendientes queryProp="" />;
    }
  };

  return (
    <SafeAreaView >
      <StatusBar barStyle="light-content" />
      {/* --------------------------Header----------------- */}
      <LinearGradient
        colors={['#003c7e', '#2989d8', '#003c7e', '#7db9e8']}
        locations={[0, 0.5, 1, 1]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.logo_text}>
          <View style={styles.logo}></View>
          <Text style={styles.textoLogo}>Autorizaciones digitales</Text>
        </View>
        <TouchableOpacity style={styles.btnBurguer} onPress={toggleMenu}>
          <Icon name="density-medium" size={55} color="#c3bfbfe8" />
        </TouchableOpacity>
      </LinearGradient>

      {/* -------------------Backdrop--------------------- */}
      {menuVisible && (
        <Pressable style={styles.backdropPressable} onPress={handleBackdropPress}>
          <Animated.View
            style={[
              styles.backdrop,
              { opacity: backdropOpacity }
            ]}
          />
        </Pressable>
      )}

      {/* ------------------Slide Menu ------------------------*/}
      <Animated.View
        style={[
          styles.sideMenu,
          { transform: [{ translateX: menuAnim }] }
        ]}
      >
        <View style={styles.menuContainer}>
          <View style={styles.userContainer}>
            <View style={styles.userImageContainer}>
              <Image source={require('./android/app/src/images/usuario.png')} style={styles.userImage} />
            </View>
            <View style={styles.userNameContainer}>
              <Text style={styles.userName}>Usuario01</Text>
            </View>
          </View>

          <View style={styles.optionsContainer}>
            {/* /////////////////////////// OPCION DE PENDIENTES CON SUB MENU ////////////////////////// */}
            <View style={styles.optionPendientes}>
              <View style={styles.optionPendientes2}>
                <Icon name="notifications-none" size={50} color="#c3bfbfe8" />
                <TouchableOpacity onPress={() =>{ 
                  toggleMenu();
                  handleSelectComponent('Pendientes');
                  setSelectedComponent(''); // Resetea el componente seleccionado
                }}>
                  <Text style={styles.menuText}>Pendientes</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={togglePendientes}>
                {isArrowRightVisiblePendientes ? (
                  <Icon name="keyboard-arrow-right" size={50} color="#c3bfbfe8" style={{ paddingRight: 15 }} />
                ) : (
                  <Icon name="keyboard-arrow-down" size={50} color="#c3bfbfe8" style={{ paddingRight: 15 }} />
                )}
              </TouchableOpacity>
            </View>

            <Animated.View style={[styles.subPendientesContainer, { height: subMenuHeightPendientes }]}>
              <View style={styles.subOptionsContainer}>
                <TouchableOpacity onPress={() =>{ 
                  toggleMenu();
                  handleSelectComponent('PendientesOrdenesCompra');
                  setSelectedComponent(''); // Resetea el componente seleccionado
                }}>
                  <Text style={styles.textSubPendientes}>Ordenes de compra</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.subOptionsContainer}>
                <TouchableOpacity onPress={() =>{ 
                  toggleMenu();
                  handleSelectComponent('PendientesSolicitudesGastos');   
                  setSelectedComponent(''); // Resetea el componente seleccionado
                }}>
                  <Text style={styles.textSubPendientes}>Solicitudes de gastos</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
            {/* ///////////////////////////////////////////////////////////////////////////////////////// */}

            {/* /////////////////////////// OPCION DE AUTORIZADOS CON SUB MENU ////////////////////////// */}
            <View style={styles.optionAutorizados}>
              <View style={styles.optionAutorizados2}>
                
                <Icon name="check-circle-outline" size={48} color="#c3bfbfe8" />
                <TouchableOpacity onPress={() => {
                  toggleMenu();
                  handleSelectComponent('Autorizados');
                  setSelectedComponent(''); // Resetea el componente seleccionado

                }}>
                  <Text style={styles.menuText}>Autorizados</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={toggleAutorizados}>
                {isArrowRightVisibleAutorizados ? (
                  <Icon name="keyboard-arrow-right" size={50} color="#c3bfbfe8" style={{ paddingRight: 15 }} />
                ) : (
                  <Icon name="keyboard-arrow-down" size={50} color="#c3bfbfe8" style={{ paddingRight: 15 }} />
                )}
              </TouchableOpacity>
            </View>

            <Animated.View style={[styles.subAutorizadosContainer, { height: subMenuHeightAutorizados }]}>
              <View style={styles.subOptionsContainer}>
                <TouchableOpacity onPress={() => {
                  toggleMenu();
                  handleSelectComponent('AutorizadosOrdenesCompra');
                  setSelectedComponent(''); // Resetea el componente seleccionado

                }}>
                  <Text style={styles.textSubAutorizados}>Ordenes de compra</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.subOptionsContainer}>
                <TouchableOpacity onPress={() => {
                  toggleMenu();
                  handleSelectComponent('AutorizadosSolicitudesGastos');
                  setSelectedComponent(''); // Resetea el componente seleccionado

                }}>
                  <Text style={styles.textSubAutorizados}>Solicitudes de gastos</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
            {/* ///////////////////////////////////////////////////////////////////////////////////////// */}

            <View style={styles.optionContainer}>
              <Icon name="miscellaneous-services" size={50} color="#c3bfbfe8" />
              <TouchableOpacity onPress={() => {
                  toggleMenu();
                  handleSelectComponent('Configuracion');
                  setSelectedComponent(''); // Resetea el componente seleccionado

                }}>
                <Text style={styles.menuText}>Configuracion</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionContainer}>
              <Icon name="logout" size={50} color="#c3bfbfe8" />
              <TouchableOpacity onPress={() =>{ 
                  toggleMenu();
                  handleSelectComponent('Login');
                  setSelectedComponent(''); // Resetea el componente seleccionado

                }}>
                <Text style={styles.menuText}>Cerrar sesion</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* RENDERIZAR COMPONENTE SELECCIONADO DEL MENU */}
      <SafeAreaView style={[styles.componentContainer, { pointerEvents: menuVisible ? 'none' : 'auto' }]}>
        {renderComponent()}
      </SafeAreaView>



    </SafeAreaView>
  );
}


