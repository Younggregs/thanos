import * as React from 'react';
import { View, Text, Animated, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { Container, Header, Body, Right, Icon, ActionSheet, Button } from 'native-base';


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HEADER_HEIGHT = 240;

export default class ListingProduct extends React.Component {

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
        formData.append('listing', this.props.search_phrase)
    
        this.setState({ isLoading: true })
    
    
        try {
          const res = await fetch('https://www.iwansell.com/api/listings/' + this.props.campus_id + '/',{
    
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
        formData.append('listing', this.props.search_phrase)
        this.setState({ isLoading: true })
    
    
        try {
          const res = await fetch('https://www.iwansell.com/api/listings/' + this.props.campus_id + '/',{
    
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
        <View>
            <View><Text style={styles.headerText}> I NEED: {item.product_name}</Text></View>
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
            <Text style={styles.name}>
                LIKE SO: {item.product_description}
            </Text>
          </View>
          <View style={styles.priceView}>
            <Text style={styles.price}>BUDGET: {item.budget}</Text>
          </View>
          </View>
    
          </View>
          <View style={{ flexDirection: 'row' }}>
           <Button vertical style={styles.contact} onPress={() => Linking.openURL(`tel:${item.phone}`)}>
                    <Icon name="call" style={{ color: 'white' }}/>
                  <Text style={styles.btnText}>Phone</Text>
            </Button>
            <Button vertical style={styles.contact} onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=+234' + item.phone)}>
                    <Icon name="logo-whatsapp" style={{ color: 'white' }}/>
                  <Text style={styles.btnText}>Whatsapp</Text>
            </Button>
        </View>
        </View>
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
      flex: 1,
      marginBottom: 100,
  },
  contact: {
      padding: 10,
      borderColor: 'white',
      borderStyle: 'solid',
      borderRadius: 50,
      borderWidth: 1,
      flex: 2,
      marginBottom: 20,
  },
  btnText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 15,
      fontWeight: 'bold',
      fontFamily: 'baloo-bhai'
  },
  FABStyle: {
      width: 60,  
      height: 60,   
      borderRadius: 30,            
      backgroundColor: '#01579b',                                    
      position: 'absolute',                                          
      bottom: 20,   
      zIndex: 1,  
      elevation: 11,                                               
      right: 20, 
    },
    overlay: {
      flex: 1,
  },
  cover: {
      flex: 1,
      height: HEADER_HEIGHT,
      width: 400,
  },
  header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      backgroundColor: 'white',
    },
    categoryView: {
      flexDirection: 'row',
      backgroundColor: 'white',
      height: 50,
    },
    category: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabbar: {
      backgroundColor: 'white',
      color: 'black',
      elevation: 0,
      shadowOpacity: 0,
      borderRadius: 25
    },
    headerStyle: {
      paddingTop: 20,
      height: 65,
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
      fontSize: 25,
      fontWeight: 'bold',
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
     marginLeft: 0,
     paddingLeft: 10,
     width: 200,
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
item: {
  backgroundColor: 'white',
  alignItems: 'center',
  padding: 8,
  flexDirection: 'row'
},
headerText: {
  fontWeight: 'bold',
  fontSize: 20,
  textAlign: 'center',
  padding: 10,
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
  width: 150,
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
