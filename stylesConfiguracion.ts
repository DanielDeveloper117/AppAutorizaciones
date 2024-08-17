import { StyleSheet, Dimensions } from 'react-native';

const stylesConfig = StyleSheet.create({

    title:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 40,

      },
      titleText: {
        color: '#000',
        fontSize: 32,
        marginLeft: 8,
      },
      sectionForm:{
        padding:20,
        width: '100%',
        //height: '100%',
      },
      inputContainer: {
        width: '100%',
        paddingBottom: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      label: {
        color: '#000',
        fontSize: 22,
        marginBottom: 15,
      },
      input: {
        width: '100%',
        backgroundColor: '#fff',
        fontSize: 19,
        borderRadius: 3,
        padding: 14,
        elevation: 2,
      },
      btnGuardar: {
        width: '100%',
        height: 60,
        backgroundColor: '#3ae641',
        borderRadius: 3,
        padding: 14,
        marginTop: 20,
        elevation: 2,

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