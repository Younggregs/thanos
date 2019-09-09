import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import { _retrieveData } from './async_data/Async'
import Shelf from './Shelf'


export default class Featured2 extends React.Component {

    state = {
        trendList: [],
        media: null,
        category_id: 0,
        campus_id: 1,
        url: 'clothes',
        isLoading: false
      }

    async componentWillMount() {

        this.setState({ isLoading: true})
        const campus = await _retrieveData('campus')
    
    
        try {
          const res = await fetch('https://www.iwansell.com/api/trending/' + campus + '/' + this.state.url + '/');
          const trendList = await res.json();
          this.setState({
            trendList
          });
        } catch (e) {
          console.log(e);
        }

        this.setState({ isLoading: false})

    }




  render() {
    return (
        <View style={styles.container}>

        <View style={styles.headerStyle}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Clothes</Text>
            </View>
            <View style={styles.view}>
                <Text style={styles.viewText}>View All</Text>
            </View>
        </View>
        
        {this.state.isLoading ? (
        <View style={styles.loading}>
            <LottieView source={require('../animation/Plane.json')} autoPlay loop/>
        </View>
        ) : (

        <ScrollView horizontal={true}>
        {this.state.trendList.map( item => 
            <Shelf
                navigation = {this.props.navigation}
                product_id = {item.id}
                product_name = {item.product_name}
                starting_price = {item.starting_price}
                product_image = {item.product_image}
            />
        )}
            
        </ScrollView>

        )} 
        
        
        </View>
    )
  }
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
        height: 30,
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