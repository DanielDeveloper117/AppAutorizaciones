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
//   interface Compra {
//     id_compra: number;
//     c72_estatus: number;
//     c67_comprador: string;
//     c31_tipo: string;
//     c6_folio: string;
//     c7_moneda: string;
//     c9_fecha: string;
//     c32_provedor: string;
//     c16_total: number;
//     c24_concepto1: string;
//     c25_concepto1: string;
//     c26_concepto1: string;
//     c30_autoriza: string;
//     c48_solicita: string;
//     fecha_insercion: string;
// }

  let tipoDeDetalle="Orden";

export function Autorizados({ queryProp, propState }: { queryProp?: string; propState?: boolean }) {
    const [idDetalle, setIdDetalle] = useState<number | null>(null); // Estado para almacenar el id del detalle seleccionado
    const [verDetalle, setVerDetalle] = useState(propState); // Estado para mostrar detalles, inicialmente es false
    const [tipoDetalle, setTipoDetalle] = useState(tipoDeDetalle); // Estado inicial siempre a false

    //------BLOQUE DE CODIGO PARA REALIZAR PETICION A LA CONSULTA
    const [compras, setCompras] = useState<Compra[]>([]);
    const [reloadKey, setReloadKey] = useState(0); // Estado para manejar la recarga del componente

    //////////// DECIDE QUE API USAR DEPENDIENDO DE LA prop queryProp QUE LE PASASTE
    useEffect(() => {
        let url;
        switch(queryProp) {
            case "ordenesCompra":
                url = 'http://10.0.2.2:3000/api/autorizados/oc';
                console.log('es oc');
                break;
            case "solicitudesGastos":
                url = 'http://10.0.2.2:3000/api/autorizados/sg';
                console.log('es sg');

                break;
            default:
                url = 'http://10.0.2.2:3000/api/autorizados';
                console.log('no es nada');
                break;
        }
        axios.get(url)
            .then(response => {
                setCompras(response.data);
                setReloadKey(prevKey => prevKey + 1);
            })
            .catch(error => {
                console.error('Error al obtener los datos axios:', error.message);
                console.error('Detalles del error:', error.response);
                console.error('Config:', error.config);
            });
    }, [queryProp]);
    //////////////////////////////////////////////////////////////////////////////

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

    // const handleCardPress = (id_compra: number, c31_tipo: string) => {
    //     setIdDetalle(id_compra);
    //     setVerDetalle(true);
    //     setTipoDetalle(c31_tipo);
    // };
    let titleText;
    if (queryProp == 'ordenesCompra') {
        titleText = 'Ordenes de compra autorizadas';
    } else if (queryProp == 'solicitudesGastos') {
        titleText = 'Solicitudes de gastos autorizadas';
    } else if (queryProp == '') {
        titleText = 'Compras autorizadas';
    } else {
        titleText = 'Compras autorizadas';
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
                                key={compra.id}
                                style={stylesAutorizados.cardContainer} 
                                onPress={() => handleCardPress(compra.id, compra.tipo)}>
                                {/* onPress={() => handleCardPress(compra.id_compra, compra.c31_tipo)}> */}


                                <View style={stylesAutorizados.cardSec1}>
                                    <Text style={stylesAutorizados.textFecha}>
                                        {new Date(compra.fecha).toISOString().split('T')[0]} {/* Formatea la fecha a 'YYYY-MM-DD' */}
                                        {/* {new Date(compra.c9_fecha).toISOString().split('T')[0]} Formatea la fecha a 'YYYY-MM-DD' */}

                                    </Text>                            
                                    <Text style={stylesAutorizados.textTipo}>{compra.tipo}</Text>
                                    {/* <Text style={stylesAutorizados.textTipo}>{compra.c31_tipo}</Text> */}
                                </View>
                                <View style={stylesAutorizados.cardSec2}>
                                    <Text style={stylesAutorizados.textConcepto}>{compra.concepto}</Text>
                                    {/* <Text style={stylesAutorizados.textConcepto}>{compra.c24_concepto1}</Text> */}
                                    <Icon name="keyboard-double-arrow-right" size={60} color="#00bcd4db" />
                                </View>
                                <View style={stylesAutorizados.cardSec3}>
                                    <Text style={stylesAutorizados.textTotal}>Total: $ <Text style={stylesAutorizados.textTotalNumber}>{compra.total}</Text></Text>
                                    {/* <Text style={stylesAutorizados.textTotal}>Total: $ <Text style={stylesAutorizados.textTotalNumber}>{compra.c16_total}</Text></Text> */}
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
