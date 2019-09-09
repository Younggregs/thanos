import React from 'react';
import { StyleSheet, View, Text, Linking, TouchableOpacity } from 'react-native'


export default class About extends React.Component {

  render() {
    return (
        <View style={styles.container}>
           <View style={styles.linkView}>
               <TouchableOpacity onPress={() => Linking.openURL('https://www.privacypolicies.com/privacy/view/ed5771acb9e92ccf2bf6943f49a4a74b')}>
                    <Text style={styles.linkStyle}>Terms and Privacy Policy</Text>
               </TouchableOpacity>
               
               <TouchableOpacity onPress={() => Linking.openURL('https://app.termly.io/document/disclaimer/a1057814-725b-41eb-b3b2-ac1a2bb66d8e')}>
                    <Text style={styles.linkStyle}>Disclaimer</Text>
               </TouchableOpacity>
               
           </View>

           <View>
               <Text style={styles.textStyle}>Copyright @ 2019 Iwansell LLC.</Text>
           </View>

           <View style={styles.signature}>
               <Text style={styles.textStyle}>A Gregs Production</Text>
            </View>
           
        </View>
    )
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    textStyle: {
        fontSize: 12,
    },
    linkView: {
        flexDirection: 'row'
    },
    linkStyle: {
        fontSize: 13,
        color: '#01579b',
        margin: 10,
    },
    signature: {
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
})