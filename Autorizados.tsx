import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import dayjs from 'dayjs';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Detalles from './Detalles'; // Importa tu componente de detalles
import stylesAutorizados from './stylesAutorizados'; 

// interface Compra {
//     id: number;
//     autorizo: string;
//     tipo: string;
//     folio: string;
//     estatus: number;
//     concepto: string;
//     fecha: string;
//     total: string;
//   }

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
    const [idDetalle, setIdDetalle] = useState<number | null>(null); // Estado para almacenar el id del detalle seleccionado
    const [verDetalle, setVerDetalle] = useState(propState); // Estado para mostrar detalles, inicialmente es false
    const [compras, setCompras] = useState<Compra[]>([]);
    const [forceRender, setForceRender] = useState(0); // Estado para forzar re-renderizado

    console.log('ahora ver detalle es: ', verDetalle, queryProp, forceRender, propState);
    //////////// DECIDE QUE API USAR DEPENDIENDO DE LA prop queryProp QUE LE PASASTE
    useEffect(() => {
        let url;
        switch(queryProp) {
            case "Autorizados":
                setVerDetalle(false);
                setIdDetalle(0);
                url = 'http://192.168.1.220:3000/api/autorizados';
                console.log('query es: ', queryProp);
                console.log('todas directores');
                break;

            case "AutorizadosGerentes":
                setVerDetalle(false);
                setIdDetalle(0);
                url = 'http://192.168.1.220:3000/api/autorizados/gerentes';
                console.log('query es: ', queryProp);
                console.log('todas gerentes');
                break;

            case "ordenesCompra":
                setIdDetalle(0);
                setVerDetalle(false);
                url = 'http://192.168.1.220:3000/api/autorizados/oc';
                console.log('es oc');
                break;

            case "ordenesCompraGerentes":
                setIdDetalle(0);
                setVerDetalle(false);
                url = 'http://192.168.1.220:3000/api/autorizados/oc/gerentes';
                console.log('es oc gerentes');
                break;

            case "solicitudesGastos":
                setIdDetalle(0);
                setVerDetalle(false);
                url = 'http://192.168.1.220:3000/api/autorizados/sg';
                console.log('es sg');
                break;

            case "solicitudesGastosGerentes":
                setIdDetalle(0);
                setVerDetalle(false);
                url = 'http://192.168.1.220:3000/api/autorizados/sg/gerentes';
                console.log('es sg gerentes');
                break;

            default:
                setVerDetalle(false);
                setIdDetalle(0);
                url = 'http://192.168.1.220:3000/api/error';
                (<Text>Cargando...</Text>)
                console.log('query es: ', queryProp);
                console.log('es error');
                
                break;
        }
        axios.get(url)
            .then(response => {
                setCompras(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los datos axios:', error.message);
                console.error('Detalles del error:', error.response);
                console.error('Config:', error.config);
            });
    }, [forceRender, queryProp]);
    //////////////////////////////////////////////////////////////////////////////

    // Manejo de selección de detalles
    const handleCardPress = (id_compra: number, c31_tipo: string) => {
        setIdDetalle(id_compra);
        setVerDetalle(true);  // Mostrar el detalle cuando se presiona una tarjeta
    };
    // Manejo del botón de regresar
    const handleBack = (forceUpdate = false) => {
        setVerDetalle(false);
        if (forceUpdate) {
            setForceRender(prev => prev + 1);  // Forzar re-render si forceUpdate es true
        }
    };
    // Para manejar el caso donde se seleccione la misma opción del menú
    useEffect(() => {
        // Si el componente ya se había renderizado (detalles visibles) y se selecciona el mismo queryProp
        if (verDetalle) {
            setForceRender(prev => prev + 1); // Cambiamos forceRender para forzar re-renderizado
        }
    }, [queryProp]);

    console.log('ahora ver detalle es: ', verDetalle, queryProp, forceRender, propState);

    let titleText;
    if (queryProp == 'ordenesCompra' || queryProp == 'ordenesCompraGerentes') {
        titleText = 'Ordenes autorizadas';
    } else if (queryProp == 'solicitudesGastos' || queryProp == 'solicitudesGastosGerentes') {
        titleText = 'Solicitudes autorizadas';
    } else if (queryProp == '') {
        titleText = 'Solicitudes autorizadas';
    } else {
        titleText = 'Solicitudes autorizadas';
    }

    // Componente para renderizar la lista de autorizados
    const AutorizadosComponent = () => {
        return ( 
        <SafeAreaView style={{height: '100%'}}>
            <ScrollView>
                <View style={stylesAutorizados.title}>
                    <Icon name="check-circle-outline" size={60} color="#797676" />
                    <Text style={stylesAutorizados.titleText}>{titleText}</Text>
                </View>

                <View style={stylesAutorizados.cardSection}>
                    {compras.length > 0 ? (
                        compras.map(compra => (
                            <TouchableOpacity
                                // key={compra.id}
                                key={compra.id_compra}
                                style={stylesAutorizados.cardContainer} 
                                // onPress={() => handleCardPress(compra.id, compra.tipo)}>
                                onPress={() => handleCardPress(compra.id_compra, compra.c31_tipo)}>


                                <View style={stylesAutorizados.cardSec1}>
                                    <Text style={stylesAutorizados.textFecha}>
                                        {/* {new Date(compra.fecha).toISOString().split('T')[0]} Formatea la fecha a 'YYYY-MM-DD' */}
                                        {/* {new Date(compra.c9_fecha).toISOString().split('T')[0]} */}
                                        {dayjs(compra.c9_fecha).format('DD-MM-YYYY')}

                                    </Text>                            
                                    {/* <Text style={stylesAutorizados.textTipo}>{compra.tipo}</Text> */}
                                    <Text style={stylesAutorizados.textTipo}>
                                        {compra.c31_tipo === 'Sol' ? ' Solicitud de gastos' : compra.c31_tipo}
                                    </Text>
                                </View>
                                <View style={stylesAutorizados.cardSec2}>
                                    {/* <Text style={stylesAutorizados.textConcepto}>{compra.concepto}</Text> */}
                                    <Text style={stylesAutorizados.textConcepto}>{compra.c24_concepto1}</Text>
                                    <Icon name="keyboard-double-arrow-right" size={60} color="#00bcd4db" />
                                </View>
                                <View style={stylesAutorizados.cardSec3}>
                                    {/* <Text style={stylesAutorizados.textTotal}>Total: $ <Text style={stylesAutorizados.textTotalNumber}>{compra.total}</Text></Text> */}
                                    <Text style={stylesAutorizados.textTotal}>Total: $ <Text style={stylesAutorizados.textTotalNumber}>{compra.c16_total}</Text></Text>
                                    <View style={stylesAutorizados.viewAutorizado}>
                                        <Icon name="check-circle-outline" size={20} color="#4caf50" />
                                        <Text style={stylesAutorizados.autorizadoText}>Autorizado</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            ))
                        ) : (
                            <View style={stylesAutorizados.cardContainer}>
                                <Text>{compras.length === 0 ? 'Cargando...' : 'No hay datos disponibles'}</Text>
                                {/* <Text>{compras.length === 0 ? 'No se encontraron resultados.' : 'Cargando...'}</Text> */}
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
