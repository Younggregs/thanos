import * as React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'


export default class EShopShelf extends React.Component {

    _product_name(name){
         if(name.toString().length >= 12 ){
            return name.toString().slice(0, 12) + '...'
         }
         return name
      }

render(){
    return(
        <TouchableOpacity 
        onPress={() => this.props.navigation.navigate('ProductDisplay', {product_id: this.props.product_id})}
          style={styles.product}>
           
                <View style={styles.nameView}>
                    <Text style={styles.name}>{this._product_name(this.props.product_name)}</Text>
                </View>
            
            <View style={styles.imageItem}>
            <Image
                source={{ uri: 'https://www.iwansell.com' + this.props.product_image, cache: 'forced-cache', }}
                resizeMethod="resize"
                style={{ resizeMode:'cover', width: 220, height: 200, borderRadius: 20 }}/>
            </View>
                <View style={styles.priceView}>
                    <Text style={styles.price}>{this.props.starting_price}</Text>
                </View>
                  
        </TouchableOpacity>

    )}
}



const styles = StyleSheet.create({
    container: {
        flex: 1
      },
      imageItem: {
        height: 150,
        width: 200,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        margin: 10,
      },
      heading: {
          fontSize: 20,
          fontWeight: 'bold',
          fontStyle: 'italic'
      }, 
      shelf: {
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 15,
          borderTopColor: 'grey',
          borderTopWidth: 2,
          borderStyle: 'solid',
          borderBottomColor: 'grey',
          borderBottomWidth: 2,
          backgroundColor: 'whitesmoke'
    
      },
      headingView: {
          padding: 10,
      },
      nameView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: 50, 
        width: 150,
        borderRadius: 15,
        zIndex: 11,
      },
      name: {
        fontWeight: 'bold',
      },
      priceView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: 50, 
        width: 100,
        borderRadius: 15,
      }, 
      price: {
          color: '#01579b', 
          fontWeight: 'bold'
      }, 
      product: {
        alignItems: 'center', 
        justifyContent: 'center', 
        margin: 5,
        borderRightColor: 'grey',
        borderRightWidth: 2,
        borderStyle: 'solid',
      },
      loading: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
      loadingView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
      }
    });