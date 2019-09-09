import * as React from 'react';
import { View, Text, Animated, FlatList, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { Container } from 'native-base';
import { _retrieveData } from  './components/async_data/Async'
import { AirbnbRating } from 'react-native-ratings';
import { HeaderText } from '../components/StyledText'
import { ScrollView } from 'react-native-gesture-handler';
import About from './components/About'


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class RateReviewScreen extends React.Component {

  static navigationOptions = {
    title: 'Ratings and Reviews'
  };

  state = {
    isLoading: false,
    rrList : [],
    status_code: '1',
    eshop_id: null,
    review: 3,
    rating: 3
  }

  ratingCompleted(rating) {
    this.state.rating = rating
  }


  updateReview(review){
      this.setState({ review })
  }



  async componentWillMount(){


    const { navigation } = this.props;
    const eshop_id = navigation.getParam('eshop_id', 1)

    this.setState({ isLoading: true, eshop_id: eshop_id })
    const auth = await _retrieveData('auth_code')



    try {
        const res = await fetch('https://www.iwansell.com/api/rate_review/' + this.state.status_code + '/' + eshop_id  + '/', {
         headers : {
           'Authorization' : 'Token ' + auth
         }
  
        })
        const rrList = await res.json();
          this.setState({
            rrList
          });
      } catch (e) {
        console.log(e);
      }
    
        this.setState({ isLoading: false })

  }



  emptyResult(){

    var empty_set = false
    
        if(this.state.rrList.length <= 0 ){
          empty_set = true
        }
    
        return empty_set
    
    
  }




      async submitForm(){

        this.setState({ isLoading2: true })
    
        var formData = new FormData()
    
        formData.append('review', this.state.review)
        formData.append('rating', this.state.rating)
   
        
        const auth = await _retrieveData('auth_code')
    
        try {
          const res = await fetch('https://www.iwansell.com/api/rate_review/' + this.state.status_code + '/' + this.state.eshop_id  + '/', {
    
           body : formData,
           method: 'POST',
           headers : {
             'Authorization' : 'Token ' + auth
           }
    
          })
          const message = await res.json();
            this.setState({
              message
            });
        } catch (e) {
          console.log(e);
        }
    
        this.setState({ isLoading2: false })
        this.updateList()
    
    
    }




   async updateList(){

      
  
      this.setState({ isLoading: true })
      const auth = await _retrieveData('auth_code')
  
  
  
      try {
          const res = await fetch('https://www.iwansell.com/api/rate_review/' + this.state.status_code + '/' + this.state.eshop_id  + '/', {
           headers : {
             'Authorization' : 'Token ' + auth
           }
    
          })
          const rrList = await res.json();
            this.setState({
              rrList
            });
        } catch (e) {
          console.log(e);
        }
      
          this.setState({ isLoading: false })


    }





  _renderItem = ({ item }) => (
      <View style={styles.item}>

      <View style={styles.imageItem}>
            
            <Image
                source={{ uri: 'https://www.iwansell.com/api/media/' + item.client_image, cache: 'forced-cache',}}
                resizeMethod="resize"
                style={{ resizeMode:'cover', width: 100, height: 100, borderRadius: 20 }}/>
            </View>
      <View style={styles.avatar}>
        <Text style={styles.letter}>{item.client_name.slice(0, 2).toUpperCase()}</Text>
      </View>

      <View style={styles.infoView}>
      <View style={styles.details}>
      <Text style={styles.details}>{item.review}</Text>
      <AirbnbRating                                                                                                                                   Rating 
            type='custom'
            ratingColor='orange'
            defaultRating = {item.rating}
            isDisabled={true}
            size={10}
          />
      </View>
      <View style={styles.priceView}>
        <Text style={styles.price}>-{item.client_name}</Text>
      </View>
      </View>
        
      
    </View>
  );
  

  _ItemSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <Container style={styles.container}>
        <ScrollView>

          <View style={{ alignItems: 'center', justifyContent: 'center'}}>

          <AirbnbRating                                                                                                                                   Rating 
            type='custom'
            ratingColor='orange'
            onFinishRating={(rating) => this.setState({rating})}
            defaultRating={0}
            size={20}
          />

          <View style={styles.amountContainer}>
                  <TextInput 
                    placeholder="Review here"
                    placeholderTextColor='rgba(0,0,0,0.6)'
                    returnKeyType="go"
                    numberOfLines={5}
                    multiline={true}
                    style={styles.inputStyle}
                    onChangeText={(review) => this.updateReview(review)}
                    onSubmitEditing={() => this.submitForm()}/>
            </View>

             <View style={styles.btnView}>
    
                  <TouchableOpacity 
                      style={styles.amountContainerB}
                      onPress={() => this.submitForm()}>
                    <Text style={styles.textStyleB}>Submit</Text>
                  </TouchableOpacity>
                
            </View>

            {this.state.isLoading2 && (
                <View style={styles.loadingView}>
                    <View style={styles.loading}>
                        <LottieView source={require('./animation/Plane.json')} autoPlay loop/>
                    </View>
                </View>
            )}
        </View>

        <View style={styles.rating_review}>
        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
            <HeaderText>What others think</HeaderText>
        </View>
        
      {this.state.isLoading ? (
        <View style={styles.loadingView}>
        <View style={styles.loading}>
              <LottieView source={require('./animation/Plane.json')} autoPlay loop/>
        </View>
        </View>
        ) : (
        <View>

     {this.emptyResult() ? (
            <Text style={styles.error}>No ratings yet be the first!</Text>
        ) : (
      <AnimatedFlatList
        data={this.state.rrList}
        keyExtractor={(item, i) => String(i)}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._ItemSeparator}
        {...this.props}
      />
      )}

      </View>
      )}
      </View>

        <About/>
      </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontStyle: 'italic',
    textAlign: 'center'
  },
  price: {
    textAlign: 'right',
    padding: 10,
    fontWeight: 'bold'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
  },
  rating_review: {
    borderTopColor: 'rgba(0, 0, 0, .08)',
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'dashed',
    marginTop: 20
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
  amountContainer: {
    backgroundColor: 'white',
    margin: 10,
    width: 200,
    height: 150,
    padding: 5,
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 2,
    borderStyle:'solid',
  },
  inputStyle: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold'
  },
  amountContainerB: {
    backgroundColor: '#01579b',
    margin: 10,
    width: 200,
    height: 50,
    padding: 5,
    alignItems: 'center',
    borderRadius: 25,
    borderColor: 'orange',
    borderWidth: 2,
    borderStyle:'solid',
  },
  textStyle: {
    color: '#01579b',
    fontSize: 20,
    fontWeight: 'bold'
  },
  textStyleB: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
});
