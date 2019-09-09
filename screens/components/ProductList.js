import * as React from 'react';
import { View, Text, Animated, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { Container } from 'native-base';


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class ProductList extends React.Component {

  constructor({Props}){
    super()
    this.state = {
      Props,
      isLoading: false,
      categorylist: [],
      search_result: [],
      category_id: 99,
      media: null,
      is_search: false,
    }
  }

  componentWillReceiveProps({Props}) {
    this.setState({...this.state,Props});
    this.newSearch()
  }

  async newSearch(){

    var formData = new FormData()
        formData.append('search_phrase', this.props.search_phrase)
    
        this.setState({ isLoading: true })
    
    
        try {
          const res = await fetch('https://www.iwansell.com/api/search/' + this.props.campus_id + '/' + this.state.category_id + '/',{
    
          body : formData,
          method: 'POST'
    
          });
          const search_result = await res.json();
          this.setState({
            search_result
          });
        } catch (e) {
          console.log(e);
        }
    
        this.setState({ isLoading: false })

  }
    
      async componentDidMount() {
    
        var formData = new FormData()
        formData.append('search_phrase', this.props.search_phrase)
    
        this.setState({ isLoading: true })
    
    
        try {
          const res = await fetch('https://www.iwansell.com/api/search/' + this.props.campus_id + '/' + this.state.category_id + '/',{
    
          body : formData,
          method: 'POST'
    
          });
          const search_result = await res.json();
          this.setState({
            search_result
          });
        } catch (e) {
          console.log(e);
        }
    
        this.setState({ isLoading: false })
      }


      setMedia(media_name){
        this.state.media = 'https://www.iwansell.com/api/media/' + media_name
      }


      emptyResult(){

        var empty_set = false
    
        if(this.state.search_result.length <= 0 ){
          empty_set = true
        }
    
        return empty_set
    
    
      }




  _renderItem = ({ item }) => (
    <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('ProductDisplay', {product_id: item.product_id})}  style={styles.item}>
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
      <Container style={styles.container}>
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
        data={this.state.search_result}
        keyExtractor={(item, i) => String(i)}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._ItemSeparator}
        {...this.props}
      />
      )}

      </View>
      )}
      </Container>
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
