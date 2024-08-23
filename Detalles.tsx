import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import stylesDetalle from './stylesDetalle'; 
import axios from 'axios';
import dayjs from 'dayjs';


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

export function Detalles({ idProp, onBack }: { idProp?: number; onBack: () => void }) {
    //--------------------------BLOQUE DE CODIGO PARA REALIZAR PETICION A LA CONSULTA
    const [compras, setCompras] = useState<Compra[]>([]);
    useEffect(() => {
        if (idProp) {
            axios.get(`http://10.0.2.2:3000/api/compra/${idProp}`)
            .then(response => {
                const compraData = response.data[0];  // accediendo al primer elemento del array
    
                // Verifica la estructura de la respuesta
                console.log('Datos de la compra:', compraData);
    
                // Verificar y manejar la fecha
                if (compraData.fecha && dayjs(compraData.fecha).isValid()) {
                    compraData.fecha = dayjs(compraData.fecha).format('YYYY-MM-DD');
                } else {
                    console.warn('Fecha inválida recibida:', compraData.fecha);
                    compraData.fecha = 'Fecha inválida';
                }
        
                setCompras([compraData]);
            })
            .catch(error => {
                console.error('Error al obtener los datos axios:', error.message);
            });
        }
    }, [idProp]);
    //////////////////////////////////////////////////////////////////////////////

    //////////////////////////////-BLOQUE DE CODIGO PARA REALIZAR PETICION A LA CONSULTA
    const autorizarCompra = () => {
        if (idProp) {
            axios.get(`http://10.0.2.2:3000/api/autorizar/${idProp}`)
            .then(response => {
                console.log('Compra autorizada exitosamente');
                // Actualizar el estatus localmente después de la autorización
                setCompras(prevCompras => prevCompras.map(compra => compra.id === idProp ? { ...compra, estatus: 3 } : compra));
            })
            .catch(error => {
                console.error('Error al autorizar la compra:', error.message);
            });
        }
    };
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////-BLOQUE DE CODIGO PARA REALIZAR PETICION A LA CONSULTA
    const revertirAutorizacion = () => {
        if (idProp) {
            axios.get(`http://10.0.2.2:3000/api/revertir/${idProp}`)
            .then(response => {
                console.log('Autorizacion cancelada correctamente');
                // Actualizar el estatus localmente después de la autorización
                setCompras(prevCompras => prevCompras.map(compra => compra.id === idProp ? { ...compra, estatus: 2 } : compra));
            })
            .catch(error => {
                console.error('Error al autorizar la compra:', error.message);
            });
        }
    };
    //////////////////////////////////////////////////////////////////////////////

    // Buscar la compra específica por idProp
    const compra = compras.length > 0 ? compras[0] : null;

    if (compra) {
        console.log('Tipo:', compra.tipo);
        console.log('Folio:', compra.folio);
        console.log('Concepto:', compra.concepto);
        console.log('Total:', compra.total);
    }
    
    return (
        <SafeAreaView style={{ height: '100%' }}>
            <ScrollView>
                {/* <TouchableOpacity style={stylesDetalle.backButton} onPress={onBack}>
                    <Icon name="arrow-back" size={50} color="#00bcd4db" />
                    <Text style={stylesDetalle.backButtonText}>Regresar</Text>
                </TouchableOpacity> */}
    
                <View style={stylesDetalle.title}>
                    <Icon name="article" size={60} color="#797676" />
                    <Text style={stylesDetalle.titleText}>Detalles</Text>
                </View>
    
                <View style={stylesDetalle.sectionDetalles}>
                    {compra ? (
                        <>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text style={stylesDetalle.textDetalle}>Id: <Text style={stylesDetalle.textDetalleValue}>{compra.id}</Text></Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text style={stylesDetalle.textDetalle}>Tipo: <Text style={stylesDetalle.textDetalleValue}>{compra.tipo}</Text></Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>    
                                <Text style={stylesDetalle.textDetalle}>Fecha: <Text style={stylesDetalle.textDetalleValue}>{dayjs(compra.fecha).format('YYYY-MM-DD')}</Text></Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text style={stylesDetalle.textDetalle}>Folio: <Text style={stylesDetalle.textDetalleValue}>{compra.folio}</Text></Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text style={stylesDetalle.textDetalle}>Nombre: <Text style={stylesDetalle.textDetalleValue}>{compra.nombre}</Text></Text>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 15 }}>
                                <Text style={stylesDetalle.textDetalle}>Concepto: </Text>
                                <Text style={stylesDetalle.textConceptoValue}>{compra.concepto}</Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text style={stylesDetalle.textDetalle}>Estatus actual: <Text style={stylesDetalle.textDetalleValue}>{compra?.estatus}</Text></Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text style={stylesDetalle.textDetalle}>Total: $<Text style={stylesDetalle.textDetalleValue}>{compra.total}</Text></Text>
                            </View>
                        </>
                    ) : (
                        
                        <Text>
                            {
                                compra ? (<>No se encontraron detalles para esta compra.</>): (<>Cargando...</>)
                            }
                        </Text> 
                            
                    )}
                </View>
                { compra?.estatus == 2 ? (
                <TouchableOpacity style={stylesDetalle.btnGuardar} onPress={autorizarCompra}>
                    <Text style={stylesDetalle.textGuardar}>Autorizar</Text>
                </TouchableOpacity>
                ) : (
                <TouchableOpacity style={stylesDetalle.btnRojo} onPress={revertirAutorizacion}>
                    <Text style={stylesDetalle.textGuardar}>Revertir autorizacion</Text>
                </TouchableOpacity>
                )}

            </ScrollView>
        </SafeAreaView>
    );
}

export default Detalles;
