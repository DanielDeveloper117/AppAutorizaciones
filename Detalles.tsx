import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Pendientes from './Pendientes';
import stylesDetalle from './stylesDetalle'; 

let esCompra="Orden de compra";
let esSolicitud="Solicitud de gastos";

export function Detalles({ idProp, propTipo, onBack }: { idProp?: number, propTipo?: string; onBack: () => void }) {
    return (
        <SafeAreaView style={{height: '100%'}}>
                <ScrollView>
                        {/* Botón de regresar */}
                        <TouchableOpacity style={stylesDetalle.backButton} onPress={onBack}>
                            <Icon name="arrow-back" size={50} color="#00bcd4db" />
                            <Text style={stylesDetalle.backButtonText}>Regresar</Text>
                        </TouchableOpacity>
                        <View style={stylesDetalle.title}>
                            <Icon name="article" size={60} color="#797676" />
                            <Text style={stylesDetalle.titleText}>Detalles</Text>
                        </View>
                        <View style={stylesDetalle.sectionDetalles}>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text style={stylesDetalle.textDetalle}>Id: <Text style={stylesDetalle.textDetalleValue}>{idProp}</Text></Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text style={stylesDetalle.textDetalle}>Folio: <Text style={stylesDetalle.textDetalleValue}>12345-abc</Text></Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text style={stylesDetalle.textDetalle}>Fecha de creacion: <Text style={stylesDetalle.textDetalleValue}>15/08/2024</Text></Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text style={stylesDetalle.textDetalle}>Tipo: <Text style={stylesDetalle.textDetalleValue}>{propTipo}</Text></Text>
                            </View>
                            <View style={{    flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 15,}}>
                                <Text style={stylesDetalle.textDetalle}>Concepto: </Text>
                                <Text  style={stylesDetalle.textConceptoValue}>5 Unidades de material de plastico modelo SJDR23 - marca Acme</Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text style={stylesDetalle.textDetalle}>Fecha de plazo: <Text style={stylesDetalle.textDetalleValue}>30/08/2024</Text></Text>
                            </View>
                            <View style={stylesDetalle.rowDetalle}>
                                <Text style={stylesDetalle.textDetalle}>Total: $<Text style={stylesDetalle.textDetalleValue}>5,245.67</Text></Text>
                            </View>
                        </View>

                        <TouchableOpacity style={stylesDetalle.btnGuardar}>
                            <Text style={stylesDetalle.textGuardar}>Autorizar</Text>
                        </TouchableOpacity>
                </ScrollView>
        </SafeAreaView>
    );
}

export default Detalles;