import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
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

let tipoDeDetalle = "Orden";

export function Pendientes({ queryProp, propState, tipoUsuarioPendientes }: { queryProp?: string; propState?: boolean; tipoUsuarioPendientes?: string; }) {

    const [idDetalle, setIdDetalle] = useState<number | null>(null); 
    const [verDetalle, setVerDetalle] = useState(propState); 
    const [compras, setCompras] = useState<Compra[]>([]);
    const [forceRender, setForceRender] = useState(0); // Estado para forzar re-renderizado
    console.log('ahora ver detalle es: ', verDetalle, queryProp);

    // Decide qué API usar dependiendo de la prop queryProp que le pasaste
    useEffect(() => {
        let url;
        switch(queryProp) {
            case "Pendientes":
                url = 'http://10.0.2.2:3000/api/compras';
                break;
            case "PendientesGerentes":
                url = 'http://10.0.2.2:3000/api/compras/gerentes';
                break;
            case "ordenesCompra":
                url = 'http://10.0.2.2:3000/api/compras/oc';
                break;
            case "ordenesCompraGerentes":
                url = 'http://10.0.2.2:3000/api/compras/oc/gerentes';
                break;
            case "solicitudesGastos":
                url = 'http://10.0.2.2:3000/api/compras/sg';
                break;
            case "solicitudesGastosGerentes":
                url = 'http://10.0.2.2:3000/api/compras/sg/gerentes';
                break;
            default:
                url = 'http://10.0.2.2:3000/api/error';
                break;
        }

        axios.get(url)
            .then(response => {
                setCompras(response.data);
                setVerDetalle(false); // Reiniciar el estado de verDetalle al cargar nuevos datos
                setIdDetalle(null);   // Reiniciar idDetalle
            })
            .catch(error => {
                console.error('Error al obtener los datos axios:', error.message);
                console.error('Detalles del error:', error.response);
                console.error('Config:', error.config);
            });
    }, [forceRender, queryProp]);  // Agregamos forceRender al array de dependencias

    // Manejo de selección de detalles
    const handleCardPress = (id_compra: number, c31_tipo: string) => {
        setIdDetalle(id_compra);
        setVerDetalle(true);  // Mostrar el detalle cuando se presiona una tarjeta
    };

    const handleBack = () => {
        setVerDetalle(false);
    };

    // Para manejar el caso donde se seleccione la misma opción del menú
    useEffect(() => {
        // Si el componente ya se había renderizado (detalles visibles) y se selecciona el mismo queryProp
        if (verDetalle) {
            setForceRender(prev => prev + 1); // Cambiamos forceRender para forzar re-renderizado
        }
    }, [queryProp]);
    console.log('ahora ver detalle es: ', verDetalle, queryProp, forceRender);

    const PendientesComponent = () => {
        return ( 
            <SafeAreaView style={{height: '100%'}}>
                <ScrollView>
                    <View style={stylesPendientes.title}>
                        <Icon name="notifications-none" size={60} color="#797676" />
                        <Text style={stylesPendientes.titleText}>{queryProp === 'ordenesCompra' || queryProp === 'ordenesCompraGerentes' ? 'Ordenes de compra pendientes' : 'Compras pendientes'}</Text>
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
            {verDetalle ? <Detalles idProp={idDetalle!} onBack={handleBack} tipoUsuarioDetalles={tipoUsuarioPendientes}/> : <PendientesComponent />}
        </SafeAreaView>
    );
}

export default Pendientes;
