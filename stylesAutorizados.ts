import { StyleSheet, Dimensions } from 'react-native';

const stylesAutorizados = StyleSheet.create({

  title:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 40,

  },
  titleText: {
    color: '#000',
    fontSize: 24,
    marginLeft: 8,
  },
  cardSection:{
    padding:10,
    width: '100%',
    marginBottom: 55,

  },
  cardContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 25,
    padding: 10,
    zIndex: 0,
    elevation: 5, // Sombra en Android
  
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',

  },
  cardSec1: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textFecha: {
    color: '#0000009c',
    fontSize: 14,
  },
  textTipo: {
    color: '#000',
    fontSize: 20,
  },
  textFolio: {
    color: '#0000009c',
    fontWeight: '600',
    fontSize: 14,
  },
  cardSec2: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textConcepto: {
    width: '82%',
    color: '#0000009c',
    fontSize: 14,
  },
  cardSec3: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingRight: 10,
  },
  textTotal: {
    color: '#0000009c',
    fontSize: 18,
    fontWeight: '500',
  },
  textTotalNumber: {
    fontWeight: '400',
  },
  viewAutorizado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  autorizadoText: {
    color: '#4caf50',
    fontSize: 18,
    fontWeight: '500',
  }

});

export default stylesAutorizados;