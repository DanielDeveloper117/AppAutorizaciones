import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Detalles from './Detalles';
import stylesPendientes from './stylesPendientes'; 

interface Compra {
    id: number;
    nombre: string;
    tipo: string;
    folio: string;
    estatus: number;
    concepto: string;
    fecha: string;
    total: string;
}

let tipoDeDetalle = "Orden"; 

export function Pendientes({ queryProp, propState }: { queryProp?: string; propState?: boolean; }) {
    const [idDetalle, setIdDetalle] = useState<number | null>(null); 
    const [verDetalle, setVerDetalle] = useState(propState); 
    const [tipoDetalle, setTipoDetalle] = useState(tipoDeDetalle); 

    const [compras, setCompras] = useState<Compra[]>([]);
    const [reloadKey, setReloadKey] = useState(0); // Estado para manejar la recarga del componente

    useEffect(() => {
        axios.get('http://10.0.2.2:3000/api/compras')
            .then(response => {
                setCompras(response.data);
                setReloadKey(prevKey => prevKey + 1); // Incrementa la key para forzar el remontado
            })
            .catch(error => {
                console.error('Error al obtener los datos axios:', error.message);
                console.error('Detalles del error:', error.response);
                console.error('Config:', error.config);
            });
    }, []);

    console.log('ahora ver detalle es: ', verDetalle, queryProp); 

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

    const PendientesComponent = () => {
        return ( 
            <SafeAreaView style={{height: '100%'}}>
                <ScrollView style={{paddingBottom: 220}}>
                    <View style={stylesPendientes.title}>
                        <Icon name="notifications-none" size={60} color="#797676" />
                        <Text style={stylesPendientes.titleText}>Pendientes</Text>
                    </View>

                    <View style={stylesPendientes.cardSection}>

                    {compras.length > 0 ? (
                        compras.map(compra => (
                            <TouchableOpacity
                                key={compra.id}
                                style={stylesPendientes.cardContainer}
                                onPress={() => handleCardPress(compra.id, compra.tipo)}>
                                    
                                <View style={stylesPendientes.cardSec1}>

                                    <Text style={stylesPendientes.textFecha}>
                                        {new Date(compra.fecha).toISOString().split('T')[0]}
                                    </Text>

                                    <Text style={stylesPendientes.textTipo}>{compra.tipo}</Text>
                                </View>

                                <View style={stylesPendientes.cardSec2}>
                                    <Text style={stylesPendientes.textConcepto}>{compra.concepto}</Text>
                                    <Icon name="keyboard-double-arrow-right" size={60} color="#00bcd4db" />
                                </View>
                                <View style={stylesPendientes.cardSec3}>
                                    <Text style={stylesPendientes.textTotal}>Total: $ <Text style={stylesPendientes.textTotalNumber}>{compra.total}</Text></Text>
                                </View>
                            </TouchableOpacity>  
                        ))
                    ) : (
                        <View style={stylesPendientes.cardContainer}>
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
            {verDetalle ? (
                <Detalles idProp={idDetalle!} onBack={handleBack} />
            ) : (
                <PendientesComponent key={reloadKey} /> // Usa reloadKey para forzar la recarga
            )}
        </SafeAreaView>
    );
}

export default Pendientes;
