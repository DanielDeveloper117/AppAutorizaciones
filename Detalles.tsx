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


//interface Compra {
//    id: number;
//    nombre: string;
//    tipo: string;
//    folio: string;
//    estatus: number;
//    concepto: string;
//    fecha: string;
//    total: string;
//}

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

export function Detalles({ idProp, onBack, tipoUsuarioDetalles }: { idProp?: number; onBack: () => void; tipoUsuarioDetalles?: string; }) {
    //--------------------------BLOQUE DE CODIGO PARA REALIZAR PETICION A LA CONSULTA
    const [compras, setCompras] = useState<Compra[]>([]);
    console.log('tipo de usuario es: ', tipoUsuarioDetalles);

    //////////// CONSULTA QUE LA INFORMACION DE LA COMPRA CON LA ID
    useEffect(() => {
        if (idProp) {
            axios.get(`http://10.0.2.2:3000/api/compra/${idProp}`)
            .then(response => {
                const compraData = response.data[0];  // accediendo al primer elemento del array
                console.log('Datos de la compra:', compraData);
                setCompras([compraData]);
            })
            .catch(error => {
                console.error('Error al obtener los datos axios:', error.message);
            });
        }
    }, [idProp]);
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////-BLOQUE DE CODIGO PARA REALIZAR PETICION A LA CONSULTA
    // const autorizarCompra = () => {
    //     if (idProp) {
    //         axios.get(`http://10.0.2.2:3000/api/autorizar/${idProp}`)
    //         .then(response => {
    //             console.log('Compra autorizada exitosamente');
    //             // Actualizar el estatus localmente después de la autorización
    //             //setCompras(prevCompras => prevCompras.map(compra => compra.id === idProp ? { ...compra, estatus: 3 } : compra));
    //             setCompras(prevCompras => prevCompras.map(compra => compra.id_compra === idProp ? { ...compra, c72_estatus: '3' } : compra));

    //         })
    //         .catch(error => {
    //             console.error('Error al autorizar la compra:', error.message);
    //         });
    //     }
    // };
    const autorizarCompra = () => {
        if (idProp) {
            axios.get(`http://10.0.2.2:3000/api/autorizar/${idProp}`)
            .then(response => {
                console.log('Compra autorizada exitosamente');
    
                // Mostrar mensaje de éxito si el correo se envió correctamente
                if (response.data.emailSent) {
                    console.log('Compra autorizada y correo enviado exitosamente.');
                } else {
                    console.log('Compra autorizada, pero no se pudo enviar el correo.');
                }
    
                // Actualizar el estatus localmente después de la autorización
                setCompras(prevCompras => prevCompras.map(compra => compra.id_compra === idProp ? { ...compra, c72_estatus: '3' } : compra));
            })
            .catch(error => {
                console.error('Error al autorizar la compra:', error.message);
                console.log('Ocurrió un error al autorizar la compra.');
            });
        }
    };
    
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////-BLOQUE DE CODIGO PARA REALIZAR PETICION A LA CONSULTA
    const autorizarCompraGerentes = () => {
        if (idProp) {
            axios.get(`http://10.0.2.2:3000/api/autorizar/gerentes/${idProp}`)
            .then(response => {
                console.log('Compra autorizada exitosamente');
                // Actualizar el estatus localmente después de la autorización
                //setCompras(prevCompras => prevCompras.map(compra => compra.id === idProp ? { ...compra, estatus: 3 } : compra));
                setCompras(prevCompras => prevCompras.map(compra => compra.id_compra === idProp ? { ...compra, c72_estatus: '2' } : compra));

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
                //setCompras(prevCompras => prevCompras.map(compra => compra.id === idProp ? { ...compra, estatus: 2 } : compra));
                setCompras(prevCompras => prevCompras.map(compra => compra.id_compra === idProp ? { ...compra, c72_estatus: '2' } : compra));

            })
            .catch(error => {
                console.error('Error al revertir la autorizacion:', error.message);
            });
        }
    };
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////-BLOQUE DE CODIGO PARA REALIZAR PETICION A LA CONSULTA
    const revertirAutorizacionGerentes = () => {
        if (idProp) {
            axios.get(`http://10.0.2.2:3000/api/revertir/gerentes/${idProp}`)
            .then(response => {
                console.log('Autorizacion cancelada correctamente');
                // Actualizar el estatus localmente después de la autorización
                //setCompras(prevCompras => prevCompras.map(compra => compra.id === idProp ? { ...compra, estatus: 2 } : compra));
                setCompras(prevCompras => prevCompras.map(compra => compra.id_compra === idProp ? { ...compra, c72_estatus: '1' } : compra));

            })
            .catch(error => {
                console.error('Error al revertir la autorizacion:', error.message);
            });
        }
    };
    //////////////////////////////////////////////////////////////////////////////
    // Buscar la compra específica por idProp
    const compra = compras.length > 0 ? compras[0] : null;
    
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
                            {/* <View style={stylesDetalle.rowDetalle}>
                                <Text style={stylesDetalle.textDetalle}>Id: <Text style={stylesDetalle.textDetalleValue}>{compra.id}</Text></Text>
                            </View> */}
                            <View style={stylesDetalle.rowDetalle}>
                                <Text style={stylesDetalle.textDetalle}>Comprador: <Text style={stylesDetalle.textDetalleValue}>{compra.c67_comprador}</Text></Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                {/* <Text style={stylesDetalle.textDetalle}>Tipo: <Text style={stylesDetalle.textDetalleValue}>{compra.tipo}</Text></Text> */}
                                <Text style={stylesDetalle.textDetalle}>Tipo: 
                                    <Text style={stylesDetalle.textDetalleValue}>
                                        {compra.c31_tipo === 'Sol' ? ' Solicitud de gastos' : compra.c31_tipo}
                                    </Text>
                                </Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                {/* <Text style={stylesDetalle.textDetalle}>Folio: <Text style={stylesDetalle.textDetalleValue}>{compra.folio}</Text></Text> */}
                                <Text style={stylesDetalle.textDetalle}>Folio: <Text style={stylesDetalle.textDetalleValue}>{compra.c6_folio}</Text></Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text style={stylesDetalle.textDetalle}>Moneda: <Text style={stylesDetalle.textDetalleValue}>{compra.c7_moneda}</Text></Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>    
                                {/* <Text style={stylesDetalle.textDetalle}>Fecha: <Text style={stylesDetalle.textDetalleValue}>{dayjs(compra.fecha).format('YYYY-MM-DD')}</Text></Text> */}
                                <Text style={stylesDetalle.textDetalle}>Fecha: <Text style={stylesDetalle.textDetalleValue}>{dayjs(compra.c9_fecha).format('DD-MM-YYYY')}</Text></Text>

                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text style={stylesDetalle.textDetalle}>Proveedor: <Text style={stylesDetalle.textDetalleValue}>{compra.c32_provedor}</Text></Text>
                            </View>
                            {/* <View style={stylesDetalle.rowDetalle}>
                                <Text style={stylesDetalle.textDetalle}>Comprador: <Text style={stylesDetalle.textDetalleValue}>{compra.nombre}</Text></Text>
                            </View> */}
                            {/* <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 15 }}>
                                <Text style={stylesDetalle.textDetalle}>Concepto: </Text>
                                <Text style={stylesDetalle.textConceptoValue}>{compra.concepto}</Text>
                            </View> */}
                            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 15 }}>
                                <Text style={stylesDetalle.textDetalle}>Concepto: </Text>
                                <Text style={stylesDetalle.textConceptoValue}>{compra.c24_concepto1}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 15 }}>
                                <Text style={stylesDetalle.textDetalle}>Concepto 2: </Text>
                                <Text style={stylesDetalle.textConceptoValue}>{compra.c25_concepto2}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 15 }}>
                                <Text style={stylesDetalle.textDetalle}>Concepto 3: </Text>
                                <Text style={stylesDetalle.textConceptoValue}>{compra.c26_concepto3}</Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text style={stylesDetalle.textDetalle}>Autoriza: <Text style={stylesDetalle.textDetalleValue}>{compra.c30_autoriza}</Text></Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text style={stylesDetalle.textDetalle}>Solicita: <Text style={stylesDetalle.textDetalleValue}>{compra.c48_solicita}</Text></Text>
                            </View>
                            {/* <View style={stylesDetalle.rowDetalle}>
                                <Text style={stylesDetalle.textDetalle}>Estatus actual: <Text style={stylesDetalle.textDetalleValue}>{compra?.estatus}</Text></Text>
                            </View> */}
                            <View style={stylesDetalle.rowDetalle}>
                                {/* <Text style={stylesDetalle.textDetalle}>Total: $<Text style={stylesDetalle.textDetalleValue}>{compra.total}</Text></Text> */}
                                <Text style={stylesDetalle.textDetalle}>Total: $<Text style={stylesDetalle.textDetalleValue}>{compra.c16_total}</Text></Text>

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
                {(compra?.c72_estatus == '1' && tipoUsuarioDetalles == "gerente") ? (
                    <TouchableOpacity style={stylesDetalle.btnGuardar} onPress={autorizarCompraGerentes}>
                        <Text style={stylesDetalle.textGuardar}>Autorizar</Text>
                    </TouchableOpacity>
                ) : (compra?.c72_estatus == '2' && tipoUsuarioDetalles == "gerente") ? (
                    <TouchableOpacity style={stylesDetalle.btnRojo} onPress={revertirAutorizacionGerentes}>
                        <Text style={stylesDetalle.textGuardar}>Revertir autorización</Text>
                    </TouchableOpacity>
                ) : null}

                {(compra?.c72_estatus == '2' && tipoUsuarioDetalles == "director") ? (
                    <TouchableOpacity style={stylesDetalle.btnGuardar} onPress={autorizarCompra}>
                        <Text style={stylesDetalle.textGuardar}>Autorizar</Text>
                    </TouchableOpacity>
                ) : (compra?.c72_estatus == '3' && tipoUsuarioDetalles == "director") ? (
                    <TouchableOpacity style={stylesDetalle.btnRojo} onPress={revertirAutorizacion}>
                        <Text style={stylesDetalle.textGuardar}>Revertir autorización</Text>
                    </TouchableOpacity>
                ) : null}


            </ScrollView>
        </SafeAreaView>
    );
}

export default Detalles;
