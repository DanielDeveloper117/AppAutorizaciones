import { StyleSheet, Dimensions } from 'react-native';

const stylesConfig = StyleSheet.create({
    body: {
      width: '100%',
      height: '100%',
      backgroundColor: '#0b1979',
    },
    section: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    sectionForm:{
      backgroundColor: '#ffffff52',
      marginTop: 100,
      marginBottom: 100,
      padding:30,
      width: '90%',
      borderRadius: 10,
      
    },
    iconContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      },
      titleText: {
        color: '#000',
        fontSize: 32,
        marginLeft: 8,
      },
      inputContainer: {
        width: '100%',
        paddingBottom: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      label: {
        color: '#fff',
        fontSize: 22,
        marginBottom: 15,
      },
      input: {
        width: '100%',
        backgroundColor: '#fff',
        fontSize: 19,
        borderRadius: 3,
        padding: 14,
        //elevation: 2,
      },
      btnGuardar: {
        width: '100%',
        height: 60,
        backgroundColor: '#3ae641',
        borderRadius: 3,
        padding: 14,
        marginTop: 20,
        //elevation: 2,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      textGuardar: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '500',
      },
});

export default stylesConfig;