import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native';
import { Container, Header, Content} from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';


export default class EShopSearchScreen extends React.Component {

  static navigationOptions = {
    header: null
  };


  state = {
    search_result: [],
    search_phrase:"",
    eshop_id: null,
    isLoading: false,
    placeholder: "",
    is_search: false
  };


  componentWillMount(){

  const { navigation } = this.props;
  const eshop_id = navigation.getParam('eshop_id', 1)
  const eshop_name = navigation.getParam('eshop_name', 'search eshop')
  
  const placeholder = 'Search in ' + eshop_name
  this.setState({ eshop_id: eshop_id, placeholder: placeholder})

  }

  async searchResult() {

    this.setState({ isLoading: true, is_search: true })
   
    var formData = new FormData()
    formData.append("search_phrase", this.state.search_phrase)

    try {
      const res = await fetch('https://www.iwansell.com/api/eshop_search/' + this.state.eshop_id + '/',{

      body : formData,
      method : 'POST'

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


  updateSearchPhrase(search_phrase){
    this.setState({ search_phrase})
  }






  emptyResult(){

    var empty_set = false

    if(this.state.search_result.length <= 0 ){
      empty_set = true
    }

    return empty_set


  }



  
  render() {

    return (
      <Container>
         <Header style={styles.headerStyle}> 
           <View style={styles.inputViewStyle}>
               <TextInput 
                    placeholder={this.state.placeholder}
                    placeholderTextColor='rgba(0,0,255, 0.5)'
                    returnKeyType="search"
                    style={styles.inputStyle}
                    onChangeText={(search_phrase) => this.updateSearchPhrase(search_phrase)}
                    onSubmitEditing={() => this.searchResult()}/>
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
         <View style={styles.item}>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerStyle: {
    paddingTop: 20,
    height: 80,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  inputStyle: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold'
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
