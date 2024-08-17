import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Detalles from './Detalles'; // Importa tu componente de detalles
import stylesAutorizados from './stylesAutorizados'; 

export function Autorizados({ queryProp, propState }: { queryProp?: string; propState?: boolean }) {
    const [idDetalle, setIdDetalle] = useState<number | null>(null); // Estado para almacenar el id del detalle seleccionado
    const [verDetalle, setVerDetalle] = useState(propState); // Estado para mostrar detalles, inicialmente es false

    const handleBack = () => {
        setVerDetalle(false);
    };
    // Función para manejar la selección de un card
    const handleCardPress = (id: number) => {
        setIdDetalle(id);
        setVerDetalle(true);
    };

    // Componente para renderizar la lista de autorizados
    const AutorizadosComponent = () => (
        <ScrollView>
            <View style={stylesAutorizados.title}>
                <Icon name="check-circle-outline" size={60} color="#797676" />
                <Text style={stylesAutorizados.titleText}>Autorizados</Text>
            </View>

            <View style={stylesAutorizados.cardSection}>
                <TouchableOpacity style={stylesAutorizados.cardContainer} onPress={() => handleCardPress(1)}>
                    <View style={stylesAutorizados.cardSec1}>
                        <Text style={stylesAutorizados.textFecha}>Hoy</Text>
                        <Text style={stylesAutorizados.textTipo}>Orden de compra</Text>
                    </View>
                    <View style={stylesAutorizados.cardSec2}>
                        <Text style={stylesAutorizados.textConcepto}>
                            Concepto de orden de compra, previsualizacion de orden de compra, ejemplo del concepto de orden de compra, ejemplo ...
                        </Text>
                        <Icon name="keyboard-double-arrow-right" size={60} color="#00bcd4db" />
                    </View>
                    <View style={stylesAutorizados.cardSec3}>
                        <Text style={stylesAutorizados.textTotal}>Total: $ <Text style={stylesAutorizados.textTotalNumber}>12,345.99</Text></Text>
                        <View style={stylesAutorizados.viewAutorizado}>
                            <Icon name="check-circle-outline" size={20} color="#4caf50" />
                            <Text style={stylesAutorizados.autorizadoText}>Autorizado</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={stylesAutorizados.cardContainer} onPress={() => handleCardPress(2)}>
                    <View style={stylesAutorizados.cardSec1}>
                        <Text style={stylesAutorizados.textFecha}>Ayer</Text>
                        <Text style={stylesAutorizados.textTipo}>Orden de compra</Text>
                    </View>
                    <View style={stylesAutorizados.cardSec2}>
                        <Text style={stylesAutorizados.textConcepto}>
                            Concepto de orden de compra, previsualizacion de orden de compra, ejemplo del concepto de orden de compra, ejemplo ...
                        </Text>
                        <Icon name="keyboard-double-arrow-right" size={60} color="#00bcd4db" />
                    </View>
                    <View style={stylesAutorizados.cardSec3}>
                        <Text style={stylesAutorizados.textTotal}>Total: $ <Text style={stylesAutorizados.textTotalNumber}>12,345.99</Text></Text>
                        <View style={stylesAutorizados.viewAutorizado}>
                            <Icon name="check-circle-outline" size={20} color="#4caf50" />
                            <Text style={stylesAutorizados.autorizadoText}>Autorizado</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={stylesAutorizados.cardContainer} onPress={() => handleCardPress(3)}>
                    <View style={stylesAutorizados.cardSec1}>
                        <Text style={stylesAutorizados.textFecha}>Ayer</Text>
                        <Text style={stylesAutorizados.textTipo}>Solicitud de gastos</Text>
                    </View>
                    <View style={stylesAutorizados.cardSec2}>
                        <Text style={stylesAutorizados.textConcepto}>
                            Concepto de orden de compra, previsualizacion de orden de compra, ejemplo del concepto de orden de compra, ejemplo ...
                        </Text>
                        <Icon name="keyboard-double-arrow-right" size={60} color="#00bcd4db" />
                    </View>
                    <View style={stylesAutorizados.cardSec3}>
                        <Text style={stylesAutorizados.textTotal}>Total: $ <Text style={stylesAutorizados.textTotalNumber}>12,345.99</Text></Text>
                        <View style={stylesAutorizados.viewAutorizado}>
                            <Icon name="check-circle-outline" size={20} color="#4caf50" />
                            <Text style={stylesAutorizados.autorizadoText}>Autorizado</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

    return (
        <SafeAreaView>
            {verDetalle ? <Detalles idProp={idDetalle!} onBack={handleBack}/> : <AutorizadosComponent />}
        </SafeAreaView>
    );
}

export default Autorizados;
