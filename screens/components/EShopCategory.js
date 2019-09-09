import * as React from 'react'; 
import { View, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import EShopRow from './EShopRow'


export default class EShopCategory extends React.Component {

    state = {
        subcategory: [],
        isLoading: false,
      }
    
    
    
      async componentWillMount() {

        this.setState({ isLoading: true })
        try {
          const res = await fetch('https://www.iwansell.com/api/eshop_subcategory/' + this.props.eshop_id);
          const subcategory = await res.json();
          this.setState({
            subcategory
          });
        } catch (e) {
          console.log(e);
        }

        this.setState({ isLoading: false })
    
    
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
        <View>
        {this.state.subcategory.map(item =>

                <EShopRow 
                    name= {item.name} id={item.id} 
                    eshop_id={this.props.eshop_id}
                    navigation = {this.props.navigation}
                  />
        )}
        </View>

        )}
      </View>
)}
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageItem: {
    height: 200,
    width: 220,
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