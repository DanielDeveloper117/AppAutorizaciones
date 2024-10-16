import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import stylesDetalle from './stylesDetalle'; 
import axios from 'axios';
import dayjs from 'dayjs';
import RNFS from 'react-native-fs'; // Importamos react-native-fs
import FileViewer from 'react-native-file-viewer'; // Importamos el file viewer
import { Alert } from 'react-native';


interface Compra {
    id_compra: number;
    c72_estatus: string;
    c67_comprador: string;
    c31_tipo: string;
    c6_folio: string;
    c7_moneda: string;
    forma_pago: string;
    c9_fecha: string;
    c32_provedor: string;
    c16_total: number;
    c24_concepto1: string;
    c25_concepto2: string;
    c26_concepto3: string;
    c30_autoriza: string;
    c48_solicita: string;
    fecha_insercion: string;
    pdf_coti: string
    pdf_fac: string;
    requisicion: string;
    caso: string;
}

export function Detalles({ idProp, onBack, tipoUsuarioDetalles }: { idProp?: number; onBack: (forceUpdate?: boolean) => void; tipoUsuarioDetalles?: string; }) {
    //--------------------------BLOQUE DE CODIGO PARA REALIZAR PETICION A LA CONSULTA
    const [compras, setCompras] = useState<Compra[]>([]);
    console.log('tipo de usuario es: ', tipoUsuarioDetalles);

    //////////// CONSULTA QUE LA INFORMACION DE LA COMPRA CON LA ID
    useEffect(() => {
        if (idProp) {
            axios.get(`http://192.168.1.220:3000/api/compra/${idProp}`)
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
    /////////////////////////////DIRECTOR AUTORIZA UNA COMPRA
    const autorizarCompra = () => {
        if (idProp) {
            axios.get(`http://192.168.1.220:3000/api/autorizar/${idProp}`)
            .then(response => {
                console.log('Compra autorizada exitosamente');
                //Alert.alert('Autorizacion exitosa', 'La solicitud se ha autorizado correctamente.');

                // Mostrar mensaje de éxito si el correo se envió correctamente
                if (response.data.emailSent) {
                    if(compra?.caso === 'pp'){
                        Alert.alert('Autorizacion exitosa', 'Solicitud autorizada correctamente, compras procedera con la facturación.');
                        
                    }else{
                        Alert.alert('Autorizacion exitosa', 'Solicitud autorizada correctamente, correo enviado a finanzas.');

                    }
                    console.log('Compra autorizada y correo enviado exitosamente.');
                } else {
                    Alert.alert('Error', 'No fue posible enviar la autorizacion.');
                    console.log('Compra autorizada, pero no se pudo enviar el correo.');
                }
    
                // Actualizar el estatus localmente después de la autorización
                setCompras(prevCompras => prevCompras.map(compra => compra.id_compra === idProp ? { ...compra, c72_estatus: '4' } : compra));
                //onBack(true); // si quieres que automaticamente redirija despues de autorizar
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
            axios.get(`http://192.168.1.220:3000/api/autorizar/gerentes/${idProp}`)
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
            axios.get(`http://192.168.1.220:3000/api/revertir/${idProp}`)
            .then(response => {
                Alert.alert('Proceso exitoso', 'Autorizacion cancelada correctamente.');
                console.log('Autorizacion cancelada correctamente');
                // Actualizar el estatus localmente después de la autorización
                //setCompras(prevCompras => prevCompras.map(compra => compra.id === idProp ? { ...compra, estatus: 2 } : compra));
                setCompras(prevCompras => prevCompras.map(compra => compra.id_compra === idProp ? { ...compra, c72_estatus: '3' } : compra));

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
            axios.get(`http://192.168.1.220:3000/api/revertir/gerentes/${idProp}`)
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
    console.log('pdf cotizacion: ', compra?.pdf_coti);
    console.log('pdf factura: ', compra?.pdf_fac);
    console.log('requisicion: ', compra?.requisicion);
    
    ////////////////////// PETICION PARA DESCARGAR COTIZACION
    const downloadCoti = async () => {
        if (idProp) {
            try {
                const url = `http://192.168.1.220:3000/api/documento/${idProp}`;
                const localFile = `${RNFS.DownloadDirectoryPath}/${compra?.pdf_coti}`;
    
                console.log('Iniciando descarga de pdf cotizacion...');
                console.log('URL de descarga:', url);
                console.log('Ruta local del archivo:', localFile);
    
                const downloadOptions = {
                    fromUrl: url,
                    toFile: localFile,
                };
    
                const result = await RNFS.downloadFile(downloadOptions).promise;
    
                console.log('Resultado de la descarga:', result);
                console.log('Código de estado:', result.statusCode);
                
                if (result.statusCode === 200) {
                    const fileStat = await RNFS.stat(localFile);
                    // Verifica si el archivo se guardó correctamente
                    console.log('Estadísticas del archivo: ', fileStat);
                    // Notifica al usuario que la descarga fue exitosa
                    Alert.alert('Descarga exitosa', 'Documento de cotizacion descargado correctamente.');
                } else {
                    console.error('Status code no es 200 ok.');
                    Alert.alert('Descarga no exitosa', 'El documento no existe.');
                }
            } catch (error) {
                console.error('Error al descargar el PDF Cotizacion', error);
                Alert.alert('Descarga no exitosa', 'Error al intentar buscar el documento.');
            }
        } else {
            Alert.alert('Error', 'ID de documento no proporcionado.');
        }
    };
    ///// PETICION PARA VER UN PDF
    // const verPdf = (tipo: string) => {
    //     if (idProp && compra?.pdf_coti) {
    //         const pdfUrl = `http://192.168.1.220:3000/api/verpdf/${idProp}/${encodeURIComponent(compra.pdf_coti)}`;
            
    //         console.log('URL para visualizar el PDF:', pdfUrl);
    
    //         Linking.openURL(pdfUrl)
    //             .catch(err => {
    //                 console.error('Error al abrir el PDF:', err);
    //                 Alert.alert('Error', 'No se pudo abrir el documento.');
    //             });
    //     } else {
    //         Alert.alert('Error', 'ID de documento o nombre de archivo no proporcionado.');
    //     }
    // };

    const verPdf = (tipo: string) => {
        let pdfUrl = '';
    
        // Verifica si idProp es válido
        if (!idProp) {
            Alert.alert('Error', 'ID de documento no proporcionado.');
            return;
        }
    
        // Determina la URL según el tipo de documento
        switch (tipo) {
            case 'coti':
                if (compra?.pdf_coti) {
                    pdfUrl = `http://192.168.1.220:3000/api/vercoti/${idProp}/${encodeURIComponent(compra.pdf_coti)}`;
                } else {
                    Alert.alert('Error', 'No se encontró el documento de cotización.');
                    return;
                }
                break;
    
            case 'fac':
                if (compra?.pdf_fac) {
                    pdfUrl = `http://192.168.1.220:3000/api/verfac/${idProp}/${encodeURIComponent(compra.pdf_fac)}`;
                } else {
                    Alert.alert('Error', 'No se encontró el documento de factura.');
                    return;
                }
                break;
    
            case 'requ':
                if (compra?.requisicion) {
                    pdfUrl = `http://192.168.1.220:3000/api/verrequ/${idProp}/${encodeURIComponent(compra.requisicion)}`;
                } else {
                    Alert.alert('Error', 'No se encontró el documento de requisición.');
                    return;
                }
                break;
    
            default:
                Alert.alert('Error', 'Error en el tipo de documento.');
                return;
        }
    
        console.log('URL para visualizar el PDF:', pdfUrl);
    
        Linking.openURL(pdfUrl)
            .catch(err => {
                console.error('Error al abrir el PDF:', err);
                Alert.alert('Error', 'No se pudo abrir el documento.');
            });
    };
    

    ////////////////////// PETICION PARA DESCARGAR FACTURA
    const downloadPdf = async () => {
        if (idProp) {
            try {
                const url = `http://192.168.1.220:3000/api/documento/${idProp}`;
                const localFile = `${RNFS.DownloadDirectoryPath}/${compra?.pdf_fac}`;
    
                console.log('Iniciando descarga de pdf factura...');
                console.log('URL de descarga:', url);
                console.log('Ruta local del archivo:', localFile);
    
                const downloadOptions = {
                    fromUrl: url,
                    toFile: localFile,
                };
    
                const result = await RNFS.downloadFile(downloadOptions).promise;
    
                console.log('Resultado de la descarga:', result);
                console.log('Código de estado:', result.statusCode);
                
                if (result.statusCode === 200) {
                    const fileStat = await RNFS.stat(localFile);
                    // Verifica si el archivo se guardó correctamente
                    console.log('Estadísticas del archivo: ', fileStat);
                    // Notifica al usuario que la descarga fue exitosa
                    Alert.alert('Descarga exitosa', 'Documento de factura descargado correctamente.');
                } else {
                    console.error('Status code no es 200 ok.');
                    Alert.alert('Descarga no exitosa', 'El documento no existe.');
                }
            } catch (error) {
                console.error('Error al descargar el PDF Factura:', error);
                Alert.alert('Descarga no exitosa', 'Error al intentar buscar el documento.');
            }
        } else {
            Alert.alert('Error', 'ID de documento no proporcionado.');
        }
    };
    
    const downloadReq = async () => {
        if (idProp) {
            try {
                const url = `http://192.168.1.220:3000/api/documento/${idProp}`;
                const localFile = `${RNFS.DownloadDirectoryPath}/${compra?.requisicion}`;
    
                console.log('Iniciando descarga de requisicion...');
                console.log('URL de descarga:', url);
                console.log('Ruta local del archivo:', localFile);
    
                const downloadOptions = {
                    fromUrl: url,
                    toFile: localFile,
                };
    
                const result = await RNFS.downloadFile(downloadOptions).promise;
    
                console.log('Resultado de la descarga:', result);
                console.log('Código de estado:', result.statusCode);
    
                if (result.statusCode === 200) {
                    // Verifica si el archivo se guardó correctamente
                    const fileStat = await RNFS.stat(localFile);
                    console.log('Estadísticas del archivo: ', fileStat);
    
                    // Notifica al usuario que la descarga fue exitosa
                    Alert.alert('Descarga exitosa', 'Documento de requisición descargado correctamente.');
                } else {
                    console.error('Status code no es 200 ok.');
                    Alert.alert('Descarga no exitosa', 'El documento no existe.');
                }
            } catch (error) {
                console.error('Error al descargar requisicion:', error);
                Alert.alert('Descarga no exitosa', 'Error al intentar buscar el documento.');
            }
        } else {
            Alert.alert('Error', 'ID de documento no proporcionado.');
        }
    };

    return (
        <SafeAreaView style={{ height: '100%' }}>
            <ScrollView>
                <TouchableOpacity style={stylesDetalle.backButton} onPress={() => onBack(true)}>
                    <Icon name="arrow-back" size={50} color="#00bcd4db" />
                    <Text allowFontScaling={false} style={stylesDetalle.backButtonText}>Regresar</Text>
                </TouchableOpacity>
    
                <View style={stylesDetalle.title}>
                    <Icon name="article" size={50} color="#797676" />
                    <Text allowFontScaling={false} style={stylesDetalle.titleText}>Detalles</Text>
                </View>
    
                <View style={stylesDetalle.sectionDetalles}>
                    {compra ? (
                        <>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text allowFontScaling={false} style={stylesDetalle.textDetalle}>Comprador: <Text allowFontScaling={false} style={stylesDetalle.textDetalleValue}>{compra.c67_comprador}</Text></Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                {/* <Text allowFontScaling={false} style={stylesDetalle.textDetalle}>Tipo: <Text allowFontScaling={false} style={stylesDetalle.textDetalleValue}>{compra.tipo}</Text></Text> */}
                                <Text allowFontScaling={false} style={stylesDetalle.textDetalle}>Tipo: 
                                    <Text allowFontScaling={false} style={stylesDetalle.textDetalleValue}>
                                        {compra.c31_tipo === 'Sol' ? ' Solicitud de gastos' : compra.c31_tipo}
                                    </Text>
                                </Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                {/* <Text allowFontScaling={false} style={stylesDetalle.textDetalle}>Folio: <Text allowFontScaling={false} style={stylesDetalle.textDetalleValue}>{compra.folio}</Text></Text> */}
                                <Text allowFontScaling={false} style={stylesDetalle.textDetalle}>Folio: <Text allowFontScaling={false} style={stylesDetalle.textDetalleValue}>{compra.c6_folio}</Text></Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text allowFontScaling={false} style={stylesDetalle.textDetalle}>Moneda: <Text allowFontScaling={false} style={stylesDetalle.textDetalleValue}>{compra.c7_moneda}</Text></Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text allowFontScaling={false} style={stylesDetalle.textDetalle}>Forma de pago: <Text allowFontScaling={false} style={stylesDetalle.textDetalleValue}>{compra.forma_pago}</Text></Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>    
                                {/* <Text allowFontScaling={false} style={stylesDetalle.textDetalle}>Fecha: <Text allowFontScaling={false} style={stylesDetalle.textDetalleValue}>{dayjs(compra.fecha).format('YYYY-MM-DD')}</Text></Text> */}
                                <Text allowFontScaling={false} style={stylesDetalle.textDetalle}>Fecha: <Text allowFontScaling={false} style={stylesDetalle.textDetalleValue}>{dayjs(compra.c9_fecha).format('DD-MM-YYYY')}</Text></Text>

                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text allowFontScaling={false} style={stylesDetalle.textDetalle}>Proveedor: <Text allowFontScaling={false} style={stylesDetalle.textDetalleValue}>{compra.c32_provedor}</Text></Text>
                            </View>

                            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 15 }}>
                                <Text allowFontScaling={false} style={stylesDetalle.textDetalle}>Concepto: </Text>
                                <Text allowFontScaling={false} style={stylesDetalle.textConceptoValue}>{compra.c24_concepto1}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 15 }}>
                                <Text allowFontScaling={false} style={stylesDetalle.textDetalle}>Concepto 2: </Text>
                                <Text allowFontScaling={false} style={stylesDetalle.textConceptoValue}>{compra.c25_concepto2}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 15 }}>
                                <Text allowFontScaling={false} style={stylesDetalle.textDetalle}>Concepto 3: </Text>
                                <Text allowFontScaling={false} style={stylesDetalle.textConceptoValue}>{compra.c26_concepto3}</Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text allowFontScaling={false} style={stylesDetalle.textDetalle}>Autoriza: <Text allowFontScaling={false} style={stylesDetalle.textDetalleValue}>{compra.c30_autoriza}</Text></Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text allowFontScaling={false} style={stylesDetalle.textDetalle}>Solicita: <Text allowFontScaling={false} style={stylesDetalle.textDetalleValue}>{compra.c48_solicita}</Text></Text>
                            </View>

                            <View style={stylesDetalle.rowDetalle}>
                                <Text allowFontScaling={false} style={stylesDetalle.textDetalle}>Total: $<Text allowFontScaling={false} style={stylesDetalle.textDetalleValue}>{compra.c16_total}</Text></Text>

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
                <View style={stylesDetalle.containerBtn}>
                    <TouchableOpacity style={stylesDetalle.btnPdf} onPress={downloadCoti}>
                        <Text allowFontScaling={false} style={stylesDetalle.textPdf}>Descargar cotización</Text>
                        <Icon name="download" size={30} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={stylesDetalle.btnPdf} onPress={()=>verPdf("coti")}>
                        <Text allowFontScaling={false} style={stylesDetalle.textPdf}>Ver cotización</Text>
                    </TouchableOpacity>
                </View>
                {compra?.caso === 'pp' ? (
                    null // No se muestra nada
                ) : (
                    <View style={stylesDetalle.containerBtn}>
                        <TouchableOpacity style={stylesDetalle.btnPdf} onPress={downloadPdf}>
                            <Text allowFontScaling={false} style={stylesDetalle.textPdf}>Descargar factura</Text>
                            <Icon name="download" size={30} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={stylesDetalle.btnPdf} onPress={()=>verPdf("fac")}>
                            <Text allowFontScaling={false} style={stylesDetalle.textPdf}>Ver factura</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={stylesDetalle.containerBtn}>
                    <TouchableOpacity style={stylesDetalle.btnPdf} onPress={downloadReq}>
                        <Text allowFontScaling={false} style={stylesDetalle.textPdf}>Descargar requisición</Text>
                        <Icon name="download" size={30} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={stylesDetalle.btnPdf} onPress={()=>verPdf("requ")}>
                        <Text allowFontScaling={false} style={stylesDetalle.textPdf}>Ver requisicion</Text>
                    </TouchableOpacity>
                </View>

                {(compra?.c72_estatus == '1' && tipoUsuarioDetalles == "gerente") ? (
                    <TouchableOpacity style={stylesDetalle.btnGuardar} onPress={autorizarCompraGerentes}>
                        <Text allowFontScaling={false} style={stylesDetalle.textGuardar}>Autorizar</Text>
                    </TouchableOpacity>
                ) : (compra?.c72_estatus == '2' && tipoUsuarioDetalles == "gerente") ? (
                    <TouchableOpacity style={stylesDetalle.btnRojo} onPress={revertirAutorizacionGerentes}>
                        <Text allowFontScaling={false} style={stylesDetalle.textGuardar}>Revertir autorización</Text>
                    </TouchableOpacity>
                ) : null}

                {(compra?.c72_estatus == '3' && tipoUsuarioDetalles == "director") ? (
                    <TouchableOpacity style={stylesDetalle.btnGuardar} onPress={autorizarCompra}>
                        <Text allowFontScaling={false} style={stylesDetalle.textGuardar}>Autorizar</Text>
                    </TouchableOpacity>
                ) : (compra?.c72_estatus == '4' && tipoUsuarioDetalles == "director") ? (
                    <TouchableOpacity style={stylesDetalle.btnRojo} onPress={revertirAutorizacion}>
                        <Text allowFontScaling={false} style={stylesDetalle.textGuardar}>Revertir autorización</Text>
                    </TouchableOpacity>
                ) : null}


            </ScrollView>
        </SafeAreaView>
    );
}

export default Detalles;
