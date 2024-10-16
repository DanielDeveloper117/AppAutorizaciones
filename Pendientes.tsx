import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Detalles from './Detalles';
import stylesPendientes from './stylesPendientes';

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

export function Pendientes({ queryProp, propState, tipoUsuarioPendientes }: { queryProp?: string; propState?: boolean; tipoUsuarioPendientes?: string; }) {
  const [idDetalle, setIdDetalle] = useState<number | null>(null);
  const [verDetalle, setVerDetalle] = useState(propState);
  const [compras, setCompras] = useState<Compra[]>([]);
  const [forceRender, setForceRender] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Función para obtener los datos
  const fetchData = async () => {
    let url;
    switch (queryProp) {
      case "Pendientes":
        url = 'http://192.168.1.220:3000/api/compras';
        break;
      case "PendientesGerentes":
        url = 'http://192.168.1.220:3000/api/compras/gerentes';
        break;
      case "ordenesCompra":
        url = 'http://192.168.1.220:3000/api/compras/oc';
        break;
      case "ordenesCompraGerentes":
        url = 'http://192.168.1.220:3000/api/compras/oc/gerentes';
        break;
      case "solicitudesGastos":
        url = 'http://192.168.1.220:3000/api/compras/sg';
        break;
      case "solicitudesGastosGerentes":
        url = 'http://192.168.1.220:3000/api/compras/sg/gerentes';
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
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [forceRender, queryProp]);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };

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

  useEffect(() => {
    if (verDetalle) {
      setForceRender(prev => prev + 1);
    }
  }, [queryProp]);

  const PendientesComponent = () => {
    return (
      <SafeAreaView style={{ height: '100%' }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          }>
          <View style={stylesPendientes.title}>
            <Icon name="notifications-none" size={50} color="#797676" />
            <Text style={stylesPendientes.titleText}>
              {queryProp === 'ordenesCompra' || queryProp === 'ordenesCompraGerentes' ? 'Ordenes pendientes' : 'Solicitudes pendientes'}
            </Text>
          </View>

          <View style={stylesPendientes.cardSection}>
            {compras.length > 0 ? (
              compras.map(compra => (
                <TouchableOpacity
                  key={compra.id_compra}
                  style={stylesPendientes.cardContainer}
                  onPress={() => handleCardPress(compra.id_compra, compra.c31_tipo)}>
                  <View style={stylesPendientes.cardSec1}>
                    <Text style={stylesPendientes.textFecha}>
                      {dayjs(compra.c9_fecha).format('DD-MM-YYYY')}
                    </Text>
                    <Text style={stylesPendientes.textTipo}>
                      {compra.c31_tipo === 'Sol' ? ' Solicitud de gastos' : compra.c31_tipo}
                    </Text>
                  </View>

                  <View style={stylesPendientes.cardSec2}>
                    <Text style={stylesPendientes.textConcepto}>{compra.c24_concepto1}</Text>
                    <Icon name="keyboard-double-arrow-right" size={60} color="#00bcd4db" />
                  </View>
                  <View style={stylesPendientes.cardSec3}>
                    <Text style={stylesPendientes.textTotal}>Total: $ <Text style={stylesPendientes.textTotalNumber}>{compra.c16_total}</Text></Text>
                    <Text style={stylesPendientes.textFecha}>{compra.c6_folio}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={stylesPendientes.cardContainer}>
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
      {verDetalle ? <Detalles idProp={idDetalle!} onBack={handleBack} tipoUsuarioDetalles={tipoUsuarioPendientes} /> : <PendientesComponent />}
    </SafeAreaView>
  );
}

export default Pendientes;
