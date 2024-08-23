import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Detalles from './Detalles'; // Importa tu componente de detalles
import stylesAutorizados from './stylesAutorizados'; 

interface Compra {
    id: number;
    autorizo: string;
    tipo: string;
    folio: string;
    estatus: number;
    concepto: string;
    fecha: string;
    total: string;
  }
  let tipoDeDetalle="Orden";

export function Autorizados({ queryProp, propState }: { queryProp?: string; propState?: boolean }) {
    const [idDetalle, setIdDetalle] = useState<number | null>(null); // Estado para almacenar el id del detalle seleccionado
    const [verDetalle, setVerDetalle] = useState(propState); // Estado para mostrar detalles, inicialmente es false
    const [tipoDetalle, setTipoDetalle] = useState(tipoDeDetalle); // Estado inicial siempre a false


    //------BLOQUE DE CODIGO PARA REALIZAR PETICION A LA CONSULTA
    const [compras, setCompras] = useState<Compra[]>([]);
    useEffect(() => {
        // Realizar la solicitud a la API
        axios.get('http://10.0.2.2:3000/api/autorizados')
        .then(response => {
            setCompras(response.data);
        })
        .catch(error => {
            console.error('Error al obtener los datos axios:', error.message);
            console.error('Detalles del error:', error.response);
            console.error('Config:', error.config);        });
    }, []);
    ////////////////////////////////////////////////////////////////////////////////

    const handleBack = () => {
        setVerDetalle(false);
    };

    useEffect(() => {
        setVerDetalle(propState);
      }, [propState]);

    const handleCardPress = (id: number, tipo: string) => {
        setIdDetalle(id);
        setVerDetalle(true);
        setTipoDetalle(tipo);
    };

    // Componente para renderizar la lista de autorizados
    const AutorizadosComponent = () => {
        return ( 
        <SafeAreaView style={{height: '100%'}}>
            <ScrollView>
                <View style={stylesAutorizados.title}>
                    <Icon name="check-circle-outline" size={60} color="#797676" />
                    <Text style={stylesAutorizados.titleText}>Autorizados</Text>
                </View>

                <View style={stylesAutorizados.cardSection}>
                    {compras.length > 0 ? (
                        compras.map(compra => (
                            <TouchableOpacity
                                key={compra.id}
                                style={stylesAutorizados.cardContainer} 
                                onPress={() => handleCardPress(compra.id, compra.tipo)}>

                                <View style={stylesAutorizados.cardSec1}>
                                    <Text style={stylesAutorizados.textFecha}>
                                        {new Date(compra.fecha).toISOString().split('T')[0]} {/* Formatea la fecha a 'YYYY-MM-DD' */}
                                    </Text>                            
                                    <Text style={stylesAutorizados.textTipo}>{compra.tipo}</Text>
                                </View>
                                <View style={stylesAutorizados.cardSec2}>
                                    <Text style={stylesAutorizados.textConcepto}>{compra.concepto}</Text>
                                    <Icon name="keyboard-double-arrow-right" size={60} color="#00bcd4db" />
                                </View>
                                <View style={stylesAutorizados.cardSec3}>
                                    <Text style={stylesAutorizados.textTotal}>Total: $ <Text style={stylesAutorizados.textTotalNumber}>{compra.total}</Text></Text>
                                    <View style={stylesAutorizados.viewAutorizado}>
                                        <Icon name="check-circle-outline" size={20} color="#4caf50" />
                                        <Text style={stylesAutorizados.autorizadoText}>Autorizado</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            ))
                        ) : (
                            <View style={stylesAutorizados.cardContainer}>
                                { 
                                    compras.length == 0 ? (<Text>No hay datos disponibles</Text>) : <Text>Cargando...</Text>
                                }
                            </View>
                        )}
                </View>
            </ScrollView>
        </SafeAreaView>
        );
    };

    return (
        <SafeAreaView>
            {verDetalle ? <Detalles idProp={idDetalle!} onBack={handleBack}/> : <AutorizadosComponent />}
        </SafeAreaView>
    );
}

export default Autorizados;
