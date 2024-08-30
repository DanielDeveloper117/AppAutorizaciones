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
// interface Compra {
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

let tipoDeDetalle = "Orden"; 

export function Pendientes({ queryProp, propState }: { queryProp?: string; propState?: boolean; }) {
    const [idDetalle, setIdDetalle] = useState<number | null>(null); 
    const [verDetalle, setVerDetalle] = useState(propState); 
    const [tipoDetalle, setTipoDetalle] = useState(tipoDeDetalle); 

    const [compras, setCompras] = useState<Compra[]>([]);
    const [reloadKey, setReloadKey] = useState(0); // Estado para manejar la recarga del componente

    //////////// DECIDE QUE API USAR DEPENDIENDO DE LA prop queryProp QUE LE PASASTE
    useEffect(() => {
        let url;
        switch(queryProp) {
            case "ordenesCompra":
                url = 'http://10.0.2.2:3000/api/compras/oc';
                console.log('es oc');
                break;
            case "solicitudesGastos":
                url = 'http://10.0.2.2:3000/api/compras/sg';
                console.log('es sg');

                break;
            default:
                url = 'http://10.0.2.2:3000/api/compras';
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
    // const handleCardPress = (id_compra: number, c31_tipo: string) => {
    //     setIdDetalle(id_compra);
    //     setVerDetalle(true);
    //     setTipoDetalle(c31_tipo);
    // };
    let titleText;
    if (queryProp == 'ordenesCompra') {
        titleText = 'Ordenes de compra pendientes';
    } else if (queryProp == 'solicitudesGastos') {
        titleText = 'Solicitudes de gastos pendientes';
    } else if (queryProp == '') {
        titleText = 'Compras pendientes';
    } else {
        titleText = 'Compras pendientes';
    }

    const PendientesComponent = () => {
        return ( 
            <SafeAreaView style={{height: '100%'}}>
                <ScrollView style={{paddingBottom: 220}}>
                    <View style={stylesPendientes.title}>
                        <Icon name="notifications-none" size={60} color="#797676" />
                        <Text style={stylesPendientes.titleText}>{titleText}</Text>
                    </View>

                    <View style={stylesPendientes.cardSection}>

                    {compras.length > 0 ? (
                        compras.map(compra => (
                            <TouchableOpacity
                                key={compra.id}
                                // key={compra.id_compra}
                                style={stylesPendientes.cardContainer}
                                onPress={() => handleCardPress(compra.id, compra.tipo)}>
                                {/* onPress={() => handleCardPress(compra.id_compra, compra.c31_tipo)}> */}

                                    
                                <View style={stylesPendientes.cardSec1}>

                                    <Text style={stylesPendientes.textFecha}>
                                        {new Date(compra.fecha).toISOString().split('T')[0]}
                                        {/* {new Date(compra.c9_fecha).toISOString().split('T')[0]} */}
                                    </Text>

                                    <Text style={stylesPendientes.textTipo}>{compra.tipo}</Text>
                                    {/* <Text style={stylesPendientes.textTipo}>{compra.c31_tipo}</Text> */}
                                </View>

                                <View style={stylesPendientes.cardSec2}>
                                    <Text style={stylesPendientes.textConcepto}>{compra.concepto}</Text>
                                    {/* <Text style={stylesPendientes.textConcepto}>{compra.c24_concepto1}</Text> */}
                                    <Icon name="keyboard-double-arrow-right" size={60} color="#00bcd4db" />
                                </View>
                                <View style={stylesPendientes.cardSec3}>
                                    <Text style={stylesPendientes.textTotal}>Total: $ <Text style={stylesPendientes.textTotalNumber}>{compra.total}</Text></Text>
                                    {/* <Text style={stylesPendientes.textTotal}>Total: $ <Text style={stylesPendientes.textTotalNumber}>{compra.c16_total}</Text></Text> */}
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
