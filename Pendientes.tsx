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

export function Pendientes({ queryProp, propState, tipoUsuarioPendientes }: { queryProp?: string; propState?: boolean; tipoUsuarioPendientes?: string; }) {

    const [idDetalle, setIdDetalle] = useState<number | null>(null); 
    const [verDetalle, setVerDetalle] = useState(propState); 
    const [compras, setCompras] = useState<Compra[]>([]);
    const [forceRender, setForceRender] = useState(0); // Estado para forzar re-renderizado
    console.log('ahora ver detalle es: ', verDetalle, queryProp, forceRender, propState);

    // Decide qué API usar dependiendo de la prop queryProp que le pasaste
    useEffect(() => {
        let url;
        switch(queryProp) {
            case "Pendientes":
                setVerDetalle(false);
                setIdDetalle(0);
                url = 'http://192.168.1.220:3000/api/compras';
                console.log('query es: ', queryProp);
                console.log('todas directores');
                break;

            case "PendientesGerentes":
                setVerDetalle(false);
                setIdDetalle(0);
                url = 'http://192.168.1.220:3000/api/compras/gerentes';
                console.log('query es: ', queryProp);
                console.log('todas gerentes');
                break;

            case "ordenesCompra":
                setVerDetalle(false);
                setIdDetalle(0);
                url = 'http://192.168.1.220:3000/api/compras/oc';
                console.log('query es: ', queryProp);
                console.log('es oc');
                break;

            case "ordenesCompraGerentes":
                setVerDetalle(false);
                setIdDetalle(0);
                url = 'http://192.168.1.220:3000/api/compras/oc/gerentes';
                console.log('query es: ', queryProp);
                console.log('es oc');
                break;

            case "solicitudesGastos":
                setVerDetalle(false);
                setIdDetalle(0);
                url = 'http://192.168.1.220:3000/api/compras/sg';
                console.log('query es: ', queryProp);
                console.log('es sg');
                break;

            case "solicitudesGastosGerentes":
                setVerDetalle(false);
                setIdDetalle(0);
                url = 'http://192.168.1.220:3000/api/compras/sg/gerentes';
                console.log('query es: ', queryProp);
                console.log('es sg');
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
    }, [forceRender, queryProp]);  // Agregamos forceRender al array de dependencias
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

    const PendientesComponent = () => {
        return ( 
            <SafeAreaView style={{height: '100%'}}>
                <ScrollView>
                    <View style={stylesPendientes.title}>
                        <Icon name="notifications-none" size={60} color="#797676" />
                        <Text style={stylesPendientes.titleText}>{queryProp === 'ordenesCompra' || queryProp === 'ordenesCompraGerentes' ? 'Ordenes pendientes' : 'Solicitudes pendientes'}</Text>
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
            {verDetalle ? <Detalles idProp={idDetalle!} onBack={handleBack} tipoUsuarioDetalles={tipoUsuarioPendientes}/> : <PendientesComponent />}
        </SafeAreaView>
    );
}

export default Pendientes;
