import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  Pressable,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage

import RNRestart from 'react-native-restart';
import Pendientes from './Pendientes';
import Autorizados from './Autorizados';
import Configuracion from './Configuracion';
// import Login from './Login';

import styles from './styles';
import { LogLevel, OneSignal } from 'react-native-onesignal';

const { width } = Dimensions.get('window');



export default function App({ usuario, tipoUsuario, onLogout }: {usuario?: string; tipoUsuario?: string; onLogout: () => void;}) {
  const [usuarioState, setUsuarioState] = useState<string | undefined>(usuario);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnim = useState(new Animated.Value(-width * 0.8))[0];
  const backdropOpacity = useState(new Animated.Value(0))[0];
  const [isArrowRightVisiblePendientes, setIsArrowRightVisiblePendientes] = useState(true);
  const [subMenuHeightPendientes, setSubMenuHeightPendientes] = useState(new Animated.Value(0));
  const [isArrowRightVisibleAutorizados, setIsArrowRightVisibleAutorizados] = useState(true);
  const [subMenuHeightAutorizados, setSubMenuHeightAutorizados] = useState(new Animated.Value(0));
  const [selectedComponent, setSelectedComponent] = useState('');

  console.log('usuario state es: ', usuarioState);
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('usuario');
        if (storedUser) {
          setUsuarioState(storedUser);
        }
      } catch (error) {
        console.error('Failed to load user data from AsyncStorage:', error);
      }
    };

    loadUserData();
  }, []);

  const EmailDisplay = ({ usuarioState }: {usuarioState?: string}) => {
    if (!usuarioState) {
      return <Text style={styles.userName}>No se encontro el correo</Text>;
    }
  
    // Dividir el correo en dos partes: antes y después del arroba
    const [localPart, domainPart] = usuarioState.split('@');
  
    return (
      <Text style={styles.userName}>
        {/* {localPart}{"\n"}@{domainPart} */}
        {localPart}{"\n"}@{"sellosyretenes.com"}

      </Text>
    );
  };
  

  useEffect(() => {
    // Actualiza `usuarioState` si cambia la prop `usuario`
    if (usuario) {
      setUsuarioState(usuario);
    }
  }, [usuario]);
  

  useEffect(() => {
    if (tipoUsuario === 'gerente') {
      setSelectedComponent('PendientesGerentes');
    } else if (tipoUsuario === 'director') {
      setSelectedComponent('Pendientes');
    }
  }, [tipoUsuario]);

  useEffect(() => {
    const saveUserData = async () => {
      if (usuarioState) {
        try {
          await AsyncStorage.setItem('usuario', usuarioState);
        } catch (error) {
          console.error('Failed to save user data to AsyncStorage:', error);
        }
      }
    };

    saveUserData();
  }, [usuario]);
  
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
        toValue: 100, // Ajustar según la altura de tu submenú
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
        toValue: 100, // Ajustar según la altura de tu submenú
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
    setSelectedComponent(component);
  };
  

const renderComponent = () => {
  const key = `component-${selectedComponent}`;
  switch (selectedComponent) {
    case 'Pendientes':
      return <Pendientes key={key} queryProp="Pendientes" propState={false} tipoUsuarioPendientes={tipoUsuario} />;

      case 'PendientesGerentes':
        console.log('Renderizar Pendientes con selectedComponent');
        return <Pendientes  queryProp="PendientesGerentes" propState={false} tipoUsuarioPendientes={tipoUsuario} />;

      case 'PendientesOrdenesCompra':
        console.log('Renderizar Pendientes con selectedComponent');
        return <Pendientes queryProp="ordenesCompra" propState={false} tipoUsuarioPendientes={tipoUsuario} />;

      case 'PendientesOrdenesCompraGerentes':
        console.log('Renderizar Pendientes con selectedComponent');
        return <Pendientes queryProp="ordenesCompraGerentes" propState={false} tipoUsuarioPendientes={tipoUsuario} />;

      case 'PendientesSolicitudesGastos':
        console.log('Renderizar Pendientes con selectedComponent');
        return <Pendientes queryProp="solicitudesGastos" propState={false} tipoUsuarioPendientes={tipoUsuario} />;

      case 'PendientesSolicitudesGastosGerentes':
        console.log('Renderizar Pendientes con selectedComponent');
        return <Pendientes queryProp="solicitudesGastosGerentes" propState={false} tipoUsuarioPendientes={tipoUsuario} />;
        
      //----------------------------AUTORIZADOS
      case 'Autorizados':
        console.log('Renderizar Autorizados con selectedComponent');
        return <Autorizados queryProp="Autorizados" propState={false} tipoUsuarioAutorizados={tipoUsuario} />;
      
      case 'AutorizadosGerentes':
        console.log('Renderizar Autorizados con selectedComponent');
        return <Autorizados queryProp="AutorizadosGerentes" propState={false} tipoUsuarioAutorizados={tipoUsuario} />;

      case 'AutorizadosOrdenesCompra':
        console.log('Renderizar Autorizados con selectedComponent');
        return <Autorizados queryProp="ordenesCompra" propState={false} tipoUsuarioAutorizados={tipoUsuario} />;

      case 'AutorizadosOrdenesCompraGerentes':
        console.log('Renderizar Autorizados con selectedComponent');
        return <Autorizados queryProp="ordenesCompraGerentes" propState={false} tipoUsuarioAutorizados={tipoUsuario} />;

      case 'AutorizadosSolicitudesGastos':
        console.log('Renderizar Autorizados con selectedComponent');
        return <Autorizados queryProp="solicitudesGastos" propState={false} tipoUsuarioAutorizados={tipoUsuario} />;

      case 'AutorizadosSolicitudesGastosGerentes':
        console.log('Renderizar Autorizados con selectedComponent');
        return <Autorizados queryProp="solicitudesGastosGerentes" propState={false} tipoUsuarioAutorizados={tipoUsuario} />;
        
      //---------------------OTROS
      case 'Configuracion':
        console.log('Renderizar Configuracion con selectedComponent');
        return <Configuracion />;
        
      // case 'Login':
      //   return <Login />;
        
      default:
        if (tipoUsuario === 'gerente') {
          console.log('Renderizar Pendientes con selectedComponent');
          console.log('gerente, Default de selectedComponent switch: ', selectedComponent);
          return <Pendientes queryProp="PendientesGerentes" tipoUsuarioPendientes={tipoUsuario} propState={false}/>;

        } else if (tipoUsuario === 'director') {
          console.log('Renderizar Pendientes con selectedComponent');
          console.log('director, Default de selectedComponent switch: ', selectedComponent);
          return <Pendientes key={key} queryProp="Pendientes" propState={false} tipoUsuarioPendientes={tipoUsuario} />;
        }
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('usuario');
      setUsuarioState(undefined);
      onLogout(); // Llama la función de logout pasada como prop
      RNRestart.Restart();
    } catch (error) {
      console.error('Failed to clear user data on logout:', error);
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
        <TouchableOpacity style={styles.btnBurguer}  onPress={toggleMenu}>
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
              <EmailDisplay usuarioState={usuarioState} />
            </View>
          </View>

          <View style={styles.optionsContainer}>
            {/* /////////////////////////// OPCION DE PENDIENTES CON SUB MENU ////////////////////////// */}
            <View style={styles.optionPendientes}>
              <View style={styles.optionPendientes2}>
                <Icon name="notifications-none" size={50} color="#c3bfbfe8" />
                <TouchableOpacity onPress={() =>{ 
                  toggleMenu();
                  if(tipoUsuario=="gerente"){
                    handleSelectComponent('PendientesGerentes');
                  }else if(tipoUsuario=="director"){
                    handleSelectComponent('Pendientes');
                  }
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
                  if(tipoUsuario=="gerente"){
                    handleSelectComponent('PendientesOrdenesCompraGerentes');
                  }else if(tipoUsuario=="director"){
                    handleSelectComponent('PendientesOrdenesCompra');
                  }
                }}>
                  <Text style={styles.textSubPendientes}>Ordenes de compra</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.subOptionsContainer}>
                <TouchableOpacity onPress={() =>{ 
                  toggleMenu();
                  if(tipoUsuario=="gerente"){
                    handleSelectComponent('PendientesSolicitudesGastosGerentes');   
                  }else if(tipoUsuario=="director"){
                    handleSelectComponent('PendientesSolicitudesGastos');   
                  }
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
                  if(tipoUsuario=="gerente"){
                    handleSelectComponent('AutorizadosGerentes');
                  }else if(tipoUsuario=="director"){
                    handleSelectComponent('Autorizados');
                  }
                }}>
                  <Text style={styles.menuText}>Autorizadas</Text>
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
                  if(tipoUsuario=="gerente"){
                    handleSelectComponent('AutorizadosOrdenesCompraGerentes');
                  }else if(tipoUsuario=="director"){
                    handleSelectComponent('AutorizadosOrdenesCompra');
                  }

                }}>
                  <Text style={styles.textSubAutorizados}>Ordenes de compra</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.subOptionsContainer}>
                <TouchableOpacity onPress={() => {
                  toggleMenu();
                  if(tipoUsuario=="gerente"){
                    handleSelectComponent('AutorizadosSolicitudesGastosGerentes');
                  }else if(tipoUsuario=="director"){
                    handleSelectComponent('AutorizadosSolicitudesGastos');
                  }

                }}>
                  <Text style={styles.textSubAutorizados}>Solicitudes de gastos</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
            {/* ///////////////////////////////////////////////////////////////////////////////////////// */}

            {/* <View style={styles.optionContainer}>
              <Icon name="miscellaneous-services" size={50} color="#c3bfbfe8" />
              <TouchableOpacity onPress={() => {
                  toggleMenu();
                  if(tipoUsuario=="gerente"){

                  }else if(tipoUsuario=="director"){

                  }
                  handleSelectComponent('Configuracion');
                }}>
                <Text style={styles.menuText}>Configuracion</Text>
              </TouchableOpacity>
            </View> */}

            <View style={styles.optionContainer}>
              <Icon name="logout" size={50} color="#c3bfbfe8" />
              <TouchableOpacity onPress={handleLogout}>
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
