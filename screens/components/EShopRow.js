import * as React from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import EShopShelf from './EShopShelf'


export default class EShopRow extends React.Component {

    state = {
        eshop_store: [],
        media : null,
        isLoading: false,
      }
    
    
      async componentWillMount() {

        this.setState({ isLoading: true })
    
        try {
          const res = await fetch('https://www.iwansell.com/api/eshop_store/'+ this.props.eshop_id + '/' + this.props.id + '/');
          const eshop_store = await res.json();
          this.setState({
            eshop_store
          });
        } catch (e) {
          console.log(e);
        }

        this.setState({ isLoading: false })
    
      }
    
    
    setMedia(media_name){
        this.state.media = 'https://www.iwansell.com' + media_name
    }


    _product_name(name){
      if(name.toString().length >= 12 ){
         return name.toString().slice(0, 12) + '...'
      }
      return name
   }




  render() {
    return (
      <View style={styles.container}>

        {this.state.isLoading ? (
          <View style={styles.loadingView}>
          <View style={styles.loading}>
                <LottieView source={require('../animation/Plane.json')} autoPlay loop/>
          </View>
          </View>
        ) : (
       
       <View style={styles.shelf}>
           <View style={styles.headingView}>
                <Text style={styles.heading}>{this.props.name}</Text>
           </View>

        <ScrollView horizontal={true}>

        {this.state.eshop_store.map(item =>
            <EShopShelf
                navigation = {this.props.navigation}
                product_id = {item.id}
                product_name = {item.product_name}
                starting_price = {item.starting_price}
                product_image = {item.product_image}
              />

        )}

      </ScrollView>
      </View>
    )}

      </View>
    );
  }
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