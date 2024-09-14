import { StyleSheet, Dimensions } from 'react-native';

const stylesDetalle = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 23,
    fontWeight: '400',
    color: '#797676',
  },
  title:{ // container
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,

  },
  titleText: {
    color: '#000',
    fontSize: 32,
    marginLeft: 8,
  },
  cardSection:{
    padding:10,
    width: '100%',
    //height: '100%',
  },
  cardContainer: {
    width: '100%',
    height: 130,
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
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textFecha: {
    color: '#ffeb3b',
    fontSize: 18,
  },
  textTipo: {
    color: '#000',
    fontSize: 20,
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  sectionDetalles:{
    flexDirection: 'column',
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderWidth: 2,         
    borderColor: "#dee2e6",    
    borderRadius: 10,       
    padding: 20,
    fontWeight: '100',

  },
  rowDetalle:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
  },
  textDetalle:{
    color: '#0000009c',
    fontSize: 20,
    fontWeight: '500',
    paddingRight: 30,
    
  },
  textDetalleValue:{
    fontWeight: '400',
    fontSize: 18,

    marginLeft: 20, 
  },
  textConceptoValue:{
    color: '#0000009c',
    fontSize: 18,
    fontWeight: '400',
    marginRight: 10,
    
  },
  textTotal: {
    color: '#0000009c',
    fontSize: 18,
    fontWeight: '500',
  },
  textTotalNumber: {
    fontWeight: '400',
    marginLeft: 20, 
  },
  btnGuardar: {
    width: '100%',
    height: 60,
    backgroundColor: '#3ae641',
    borderRadius: 3,
    padding: 14,
    marginTop: 30,
    elevation: 2,
    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 300,

  },
  btnRojo: {
    width: '100%',
    height: 60,
    backgroundColor: '#c9281cf5',
    borderRadius: 3,
    padding: 14,
    marginTop: 30,
    elevation: 2,
    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 300,

  },
  btnPdf: {
    width: '100%',
    height: 60,
    backgroundColor: '#860102',
    borderRadius: 3,
    padding: 14,
    marginTop: 10,
    elevation: 2,
    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,

  },
  textPdf: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
    paddingRight: 10,
  },
  textGuardar: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
  },
});

export default stylesDetalle;