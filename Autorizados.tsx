import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Detalles from './Detalles';
import stylesAutorizados from './stylesAutorizados'; 

interface Compra {
  id_compra: number;
  c72_estatus: string;
  c67_comprador: string;
  c31_tipo: string;
  c6_folio: string;
  c7_moneda: string;
  c9_fecha: string;
  c32_provedor: string;
  c16_total: number;
  c24_concepto1: string;
  c25_concepto2: string;
  c26_concepto3: string;
  c30_autoriza: string;
  c48_solicita: string;
  fecha_insercion: string;
}

export function Autorizados({ queryProp, propState, tipoUsuarioAutorizados }: { queryProp?: string; propState?: boolean; tipoUsuarioAutorizados?: string; }) {
  const [idDetalle, setIdDetalle] = useState<number | null>(null);
  const [verDetalle, setVerDetalle] = useState(propState);
  const [compras, setCompras] = useState<Compra[]>([]);
  const [forceRender, setForceRender] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false); // Estado para manejar el refresh

  // Función para obtener datos
  const fetchData = async () => {
    let url;
    switch(queryProp) {
      case "Autorizados":
        url = 'http://192.168.1.220:3000/api/autorizados';
        break;
      case "AutorizadosGerentes":
        url = 'http://192.168.1.220:3000/api/autorizados/gerentes';
        break;
      case "ordenesCompra":
        url = 'http://192.168.1.220:3000/api/autorizados/oc';
        break;
      case "ordenesCompraGerentes":
        url = 'http://192.168.1.220:3000/api/autorizados/oc/gerentes';
        break;
      case "solicitudesGastos":
        url = 'http://192.168.1.220:3000/api/autorizados/sg';
        break;
      case "solicitudesGastosGerentes":
        url = 'http://192.168.1.220:3000/api/autorizados/sg/gerentes';
        break;
      default:
        url = 'http://192.168.1.220:3000/api/error';
        break;
    }

    try {
      const response = await axios.get(url);
      setCompras(response.data);
    } catch (error: any) {
      console.error('Error al obtener los datos axios:', error.message);
      if (error.response) {
        console.error('Detalles del error:', error.response);
      }
    } finally {
      setIsRefreshing(false); // Finaliza el estado de refresh
    }
  };

  // Efecto para cargar datos al montar el componente y al forzar renderizado
  useEffect(() => {
    fetchData();
  }, [forceRender, queryProp]);

  // Manejo de selección de detalles
  const handleCardPress = (id_compra: number, c31_tipo: string) => {
    setIdDetalle(id_compra);
    setVerDetalle(true);
  };

  const handleBack = (forceUpdate = false) => {
    setVerDetalle(false);
    if (forceUpdate) {
      setForceRender(prev => prev + 1);
    }
  };

  // Para manejar el caso donde se seleccione la misma opción del menú
  useEffect(() => {
    if (verDetalle) {
      setForceRender(prev => prev + 1);
    }
  }, [queryProp]);

  const AutorizadosComponent = () => {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => {
                setIsRefreshing(true);
                fetchData();
              }}
            />
          }
        >
          <View style={stylesAutorizados.title}>
            <Icon name="check-circle-outline" size={45} color="#797676" />
            <Text allowFontScaling={false} style={stylesAutorizados.titleText}>
              {queryProp === 'ordenesCompra' || queryProp === 'ordenesCompraGerentes'
                ? 'Ordenes autorizadas'
                : 'Solicitudes autorizadas'}
            </Text>
          </View>
          <View style={stylesAutorizados.cardSection}>
            {compras.length > 0 ? (
              compras.map(compra => (
                <TouchableOpacity
                  key={compra.id_compra}
                  style={stylesAutorizados.cardContainer}
                  onPress={() => handleCardPress(compra.id_compra, compra.c31_tipo)}
                >
                  <View style={stylesAutorizados.cardSec1}>
                    <Text allowFontScaling={false} style={stylesAutorizados.textFecha}>
                      {dayjs(compra.c9_fecha).format('DD-MM-YYYY')}
                    </Text>
                    <Text allowFontScaling={false} style={stylesAutorizados.textTipo}>
                      {compra.c31_tipo === 'Sol' ? ' Solicitud de gastos' : compra.c31_tipo}
                    </Text>
                  </View>
                  <View style={stylesAutorizados.cardSec2}>
                    <Text allowFontScaling={false} style={stylesAutorizados.textConcepto}>{compra.c24_concepto1}</Text>
                    <Icon name="keyboard-double-arrow-right" size={60} color="#00bcd4db" />
                  </View>
                  <View style={stylesAutorizados.cardSec3}>
                    <Text allowFontScaling={false} style={stylesAutorizados.textTotal}>Total: $ <Text allowFontScaling={false} style={stylesAutorizados.textTotalNumber}>{compra.c16_total}</Text></Text>
                    <View style={stylesAutorizados.viewAutorizado}>
                      <Icon name="check-circle-outline" size={20} color="#4caf50" />
                      <Text allowFontScaling={false} style={stylesAutorizados.autorizadoText}>Autorizado</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={stylesAutorizados.cardContainer}>
                <Text>{compras.length === 0 ? 'Cargando...' : 'No hay datos disponibles'}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView>
      {verDetalle ? <Detalles idProp={idDetalle!} onBack={handleBack} tipoUsuarioDetalles={tipoUsuarioAutorizados}/> : <AutorizadosComponent />}
    </SafeAreaView>
  );
}

export default Autorizados;
