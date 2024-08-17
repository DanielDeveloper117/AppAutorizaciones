import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Detalles from './Detalles';
import stylesPendientes from './stylesPendientes'; 

let tipoDeDetalle="Orden";

export function Pendientes({ queryProp, propState}: { queryProp?: string; propState?: boolean; }) {
    const [idDetalle, setIdDetalle] = useState<number | null>(null); // Para almacenar el id del detalle seleccionado
    const [verDetalle, setVerDetalle] = useState(propState); // Estado inicial siempre a false
    const [tipoDetalle, setTipoDetalle] = useState(tipoDeDetalle); // Estado inicial siempre a false



    console.log('ahora ver detalle es: ', verDetalle, tipoDeDetalle); 

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

    const PendientesComponent = () => {
        return (
            <SafeAreaView style={{height: '100%'}}>

                <ScrollView>
                    <View style={stylesPendientes.title}>
                        <Icon name="notifications-none" size={60} color="#797676" />
                        <Text style={stylesPendientes.titleText}>Pendientes</Text>
                    </View>

                    <View style={stylesPendientes.cardSection}>

                        <TouchableOpacity style={stylesPendientes.cardContainer} onPress={() =>{    
                                // el 1 es el id del detalle
                                handleCardPress(1, tipoDetalle);
                            }}>
                            <View style={stylesPendientes.cardSec1}>
                                <Text style={stylesPendientes.textFecha}>Hoy</Text>
                                <Text style={stylesPendientes.textTipo}>Orden de compra</Text>
                            </View>
                            <View style={stylesPendientes.cardSec2}>
                                <Text style={stylesPendientes.textConcepto}>Concepto de orden de compra, previsualizacion de orden de compra, ejemplo del concepto de orden de compra, ejemplo ...</Text>
                                <Icon name="keyboard-double-arrow-right" size={60} color="#00bcd4db" />
                            </View>
                            <View style={stylesPendientes.cardSec3}>
                                <Text style={stylesPendientes.textTotal}>Total: $ <Text style={stylesPendientes.textTotalNumber}>12,345.99</Text></Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={stylesPendientes.cardContainer}  onPress={() =>{    
                                // el 1 es el id del detalle
                                handleCardPress(2,"");
                            }}>
                            <View style={stylesPendientes.cardSec1}>
                                <Text style={stylesPendientes.textFecha}>Ayer</Text>
                                <Text style={stylesPendientes.textTipo}>Orden de compra</Text>
                            </View>
                            <View style={stylesPendientes.cardSec2}>
                                <Text style={stylesPendientes.textConcepto}>Concepto de orden de compra, previsualizacion de orden de compra, ejemplo del concepto de orden de compra, ejemplo ...</Text>
                                <Icon name="keyboard-double-arrow-right" size={60} color="#00bcd4db" />
                            </View>
                            <View style={stylesPendientes.cardSec3}>
                                <Text style={stylesPendientes.textTotal}>Total: $ <Text style={stylesPendientes.textTotalNumber}>12,345.99</Text></Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={stylesPendientes.cardContainer}  onPress={() =>{    
                                // el 1 es el id del detalle
                                handleCardPress(3, "");
                            }}>
                            <View style={stylesPendientes.cardSec1}>
                                <Text style={stylesPendientes.textFecha}>08/08/2024</Text>
                                <Text style={stylesPendientes.textTipo}>Solicitud de gastos</Text>
                            </View>
                            <View style={stylesPendientes.cardSec2}>
                                <Text style={stylesPendientes.textConcepto}>Concepto de orden de compra, previsualizacion de orden de compra, ejemplo del concepto de orden de compra, ejemplo ...</Text>
                                <Icon name="keyboard-double-arrow-right" size={60} color="#00bcd4db" />
                            </View>
                            <View style={stylesPendientes.cardSec3}>
                                <Text style={stylesPendientes.textTotal}>Total: $ <Text style={stylesPendientes.textTotalNumber}>12,345.99</Text></Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    };
 
    return (
        <SafeAreaView>
            {verDetalle ? <Detalles idProp={idDetalle!} onBack={handleBack}/> : <PendientesComponent />}
        </SafeAreaView>
    );

}

export default Pendientes;