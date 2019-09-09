import * as React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'


export default class Shelf extends React.Component {


    _product_name(name){
         if(name.toString().length >= 12 ){
            return name.toString().slice(0, 12) + '...'
         }
         return name
      }

render(){
    return(
        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('ProductDisplay', {product_id: this.props.product_id})} style={styles.productView}>
            <View style={styles.item}>
                
                <Image
                    source={{ uri: 'https://www.iwansell.com' + this.props.product_image,
                              cache: 'forced-cache',
                    }}
                    resizeMethod="resize"
                    style={{ resizeMode:'cover', width: 100, height: 100, borderRadius: 20 }}/>
            </View>
            <View style={styles.productName}>
                <Text style={styles.productText}>{this._product_name(this.props.product_name)}</Text>
            </View>
            <View style={styles.priceView}>
                <Text style={styles.priceText}>{this.props.starting_price}</Text>
            </View>
        </TouchableOpacity>

    )}
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productView: {
        height: 200,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    item: {
        height: 100,
        width: 100,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        margin: 10,
    },
    headerStyle: {
        flex: 1,
        flexDirection: 'row',
        padding: 10
    },
    header: {
        flex: 3,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    view: {
        flex: 1,
    },
    viewText: {
        color: '#01579b',
        fontWeight: 'bold',
        fontSize: 11,
    },
    productName: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    productText: {
        textAlign: 'center',
        fontSize: 12,
    },
    priceView: {
        height: 40,
        width: 80,
        padding: 10,
        borderRadius: 15,
        backgroundColor: 'whitesmoke',
        alignItems: 'center',
        justifyContent: 'center',
    },
    priceText: {
        color: '#01579b',
        fontSize: 12,
        fontWeight: 'bold',
    },
    loading: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
