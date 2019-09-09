import * as React from 'react';
import { View, Text, Animated, FlatList, StyleSheet, Image, TextInput } from 'react-native';
import LottieView from 'lottie-react-native';
import { Container, Content,  Header, Left, Icon } from 'native-base';
import { _retrieveData } from  './components/async_data/Async'


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class ProductValuation extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(){
    super()
    this.state = {
      isLoading: false,
      product_review: {},
      product: {},
      media: null,
      is_search: false,
      product: null
    }
  }

  
  updateSearchPhrase(product){
    this.setState({ product })
  }










  async newSearch(){


    this.setState({ isLoading: true, is_search: true })
    //const auth = await _retrieveData('auth_code')

    var formData = new FormData()
    formData.append("product", this.state.product)

    try {
        const res = await fetch('https://www.iwansell.com/api/product_valuation/', {
         body: formData,
         method: 'POST',
        });
        const product_review = await res.json();
        this.setState({
            product_review
        });
      } catch (e) {
        console.log(e);
      }
    
        this.setState({ isLoading: false })
  }








  emptyResult(){

    var empty_set = false
    
    if(this.state.product_review.length <= 0 ){
        empty_set = true
    }
    
    return empty_set
    
  }




  render() {
    return (
      <Container>
      <Header style={styles.headerStyle}> 
      <Left>
        <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => this.props.navigation.goBack(null)}>
          <Icon 
            name="arrow-back"
            style={{ color: 'black' }}
            />
          </TouchableOpacity>
          </Left>
        <View style={styles.inputViewStyle}>
            <TextInput 
                 placeholder="Product name"
                 placeholderTextColor='rgba(0,0,255, 0.5)'
                 returnKeyType="search"
                 style={styles.inputStyle}
                 onChangeText={(product) => this.updateSearchPhrase(product)}
                 onSubmitEditing={() => this.newSearch()}/>
         </View>
     </Header>

   {this.state.is_search && ( 
      <Content>
      {this.state.isLoading ? (
      <View style={styles.loadingView}>
      <View style={styles.loading}>
            <LottieView source={require('./animation/Plane.json')} autoPlay loop/>
      </View>
      </View>
      ) : (
      <View>

      {this.emptyResult() ? (
          <Text style={styles.error}>No result found</Text>
      ) : (
      <View>
      <View style={styles.item}>
        <Text style={styles.headerTextStyle}>Product Review for product {this.state.product}</Text>
      </View>

      <View style={styles.item}>
        <View style={{ flex: 2}}>
          <Text style={styles.textStyle}>Times {this.state.product} was searched for</Text>
        </View>
        <View style={{ flex: 2}}>
          <Text style={styles.textStyle}>{this.state.product_review.searched_frequency}</Text>
        </View>
      </View>

     <View style={styles.item}>
        <View style={{ flex: 2}}>
          <Text style={styles.textStyle}>Times {this.state.product} was searched for and not found</Text>
        </View>
        <View style={{ flex: 2}}>
          <Text style={styles.textStyle}>{this.state.product_review.notFound_frequency}</Text>
        </View>
      </View>

      <View style={styles.item}>
        <View style={{ flex: 2}}>
          <Text style={styles.textStyle}>Number of {this.state.product} up for sell</Text>
        </View>
        <View style={{ flex: 2}}>
          <Text style={styles.textStyle}>{this.state.product_review.forSell_frequency}</Text>
        </View>
      </View>


      <View style={styles.item}>
        <View style={{ flex: 2}}>
          <Text style={styles.textStyle}>Number of {this.state.product} sold</Text>
        </View>
        <View style={{ flex: 2}}>
          <Text style={styles.textStyle}>{this.state.product_review.sold_frequency}</Text>
        </View>
      </View>
      
    
  </View>
      )}
      </View>
      )}

      </Content>
       
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
    flex: 1,
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
  },
  headerStyle: {
    paddingTop: 20,
    height: 80,
    width: '100%',
    backgroundColor: 'white',
  },
  brandStyle: {
    padding: 5,
    marginLeft: 20,
    width: 200,
    flexDirection: 'row',
  },
  headerTextStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  inputStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  iconStyle: {
    marginLeft: 40,
    width: 50,
    paddingTop: 5,
  },
  inputViewStyle: {
    backgroundColor: 'white',
    margin: 10,
    width: 300,
    height: 40,
    padding: 5,
    alignItems: 'center',
    borderRadius: 25,
    borderColor: '#01579b',
    borderWidth: 2,
    borderStyle:'solid',
  },
});
