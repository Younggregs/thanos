import * as React from 'react';
import { View, Text, Animated, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { _retrieveData } from './async_data/Async'


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class New extends React.Component {

  constructor({Props}){
    super()
    this.state = {
      Props,
      isLoading: false,
      campus_id: 1, 
      new_productlist: [],
      media: null
    }
  }

  async componentDidMount() {
      this.setState({ isLoading: true})
      const campus = await _retrieveData('campus')
    
      try {
        const res = await fetch('https://www.iwansell.com/api/category_product/' + campus + '/99' + '/0');
        const new_productlist = await res.json();
        this.setState({
            new_productlist
        });
      } catch (e) {
        console.log(e);
      }

    this.setState({ isLoading: false })
  }


      setMedia(media_name){
        this.state.media = 'https://www.iwansell.com' + media_name
      }


      emptyResult(){

        var empty_set = false
    
        if(this.state.new_productlist.length <= 0 ){
          empty_set = true
        }
    
        return empty_set
    
    
      }




      _renderItem = ({ item }) => (
        <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('ProductDisplay', {product_id: item.id})} style={styles.productView} style={styles.item}>
          <View style={styles.imageItem}>
                {this.setMedia(item.product_image)}
                <Image
                    source={{ uri: this.state.media, cache: 'forced-cache',}}
                    resizeMethod="resize"
                    style={{ resizeMode:'cover', width: 100, height: 100, borderRadius: 20 }}/>
                </View>
          <View style={styles.avatar}>
            <Text style={styles.letter}>{item.product_name.slice(0, 1).toUpperCase()}</Text>
          </View>
    
          <View style={styles.infoView}>
          <View style={styles.details}>
            <Text style={styles.name}>{item.product_name}</Text>
          </View>
          <View style={styles.priceView}>
            <Text style={styles.price}>{item.starting_price}</Text>
          </View>
          </View>
            
          
        </TouchableOpacity>
      );



  _ItemSeparator = () => <View style={styles.separator} />;

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

        {this.emptyResult() ? (
            <Text style={styles.error}>No result found</Text>
        ) : (
      <AnimatedFlatList
        data={this.state.new_productlist}
        keyExtractor={(item, i) => String(i)}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._ItemSeparator}
        {...this.props}
      />
      )}

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
  item: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 8,
    flexDirection: 'row'
  },
  infoView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#e91e63',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    color: 'white',
    fontWeight: 'bold',
  },
  details: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
  },
  price: {
    fontSize: 12,
    color: '#01579b',
    fontWeight: 'bold',
  },
  priceView: {
    flex: 1,
    height: 30,
    width: 80,
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0, 0, 0, .08)',
  },
  imageItem: {
    height: 100,
        width: 100,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        margin: 10,
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 10,
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