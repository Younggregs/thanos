import * as React from 'react';
import { ScrollView, View, Text, Animated, FlatList, StyleSheet, Picker, Image, TouchableOpacity, Linking } from 'react-native';
import LottieView from 'lottie-react-native';
import * as SMS from 'expo-sms';
import { Container, Header, Body, Right, Icon, ActionSheet, Button } from 'native-base';
import { HeaderText } from '../components/StyledText'
import { _retrieveData, _storeCampus } from './components/async_data/Async'


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HEADER_HEIGHT = 240;

var BUTTONS = [
    { text: "Profile", icon: "contact", iconColor: "#25de5b", route: "Profile" },
    { text: "Upload Product", icon: "cart", iconColor: "#8c1ef4", route: "NewProduct" },
    { text: "Business Mode", icon: "analytics", iconColor: "#2c8ef4", route: "BusinessMode" },
    { text: "Rent eShop", icon: "home", iconColor: "#6c3ef4", route: "NewEShop"},
    { text: "About", icon: "bulb", iconColor: "#ea943b", route: "About" },
    { text: "Contact Us", icon: "chatboxes", iconColor: "#fa213b", route: "Contact" },
    { text: "Logout", icon: "contact", iconColor: "#25de5b", route: "Logout"},
    { text: "Cancel", icon: "close", iconColor: "#10de9b", route: ""}
  ];


  var BUTTONS_NL = [
    { text: "Profile", icon: "contact", iconColor: "#25de5b", route: "Login" },
    { text: "Upload Product", icon: "cart", iconColor: "#8c1ef4", route: "Login" },
    { text: "Business Mode", icon: "analytics", iconColor: "#2c8ef4", route: "Login" },
    { text: "Rent eShop", icon: "home", iconColor: "#6c3ef4", route: "Login"},
    { text: "About", icon: "bulb", iconColor: "#ea943b", route: "About" },
    { text: "Contact Us", icon: "chatboxes", iconColor: "#fa213b", route: "Contact" },
    { text: "Logout", icon: "contact", iconColor: "#25de5b", route: "Logout"},
    { text: "Cancel", icon: "close", iconColor: "#10de9b", route: ""}
  ];
  
  var DESTRUCTIVE_INDEX = 3;
  var CANCEL_INDEX = 7;

export default class ListingScreen extends React.Component {

    static navigationOptions = {
        header: null
      };

  constructor({Props}){
    super()
    this.state = {
      Props,
      isLoading: false,
      listings: [],
      category_id: 99,
      categorylist: [],
      media: null,
      is_search: false,
      campus_id: 1,
      category_name: null,
      auth: false
    }
  }



  async sendMsg(phone, product){

    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const message = "Hi, I have a product to satisfy your request on the listing '" + product + " ' on Iwansell." 
      SMS.sendSMSAsync(phone, message)
    } else {
    alert("Sorry your device does not support this feature")
  }

  
     
}


  async sortByCategory(category_id){
    this.setState({ isLoading: true, category_id })

    const campus = await _retrieveData('campus')

        try {
            const res = await fetch('https://www.iwansell.com/api/listing_category/' + campus + '/' + category_id + '/');
            const listings = await res.json();
            this.setState({
              listings
            });
          } catch (e) {
            console.log(e);
          }

    this.setState({ isLoading: false })

}


  
      async componentDidMount() {

        this.setState({ isLoading: true })

        const campus = await _retrieveData('campus')

        
          const auth = await _retrieveData('auth_code')
      
          if(auth.toString().length >= 10){
            this.setState({ auth: true})
          }else{
            this.setState({ auth: false})
          }
         
     
        try {
            const res = await fetch('https://www.iwansell.com/api/listings/' + campus);
            const listings = await res.json();
            this.setState({
              listings
            });
          } catch (e) {
            console.log(e);
          }

          try {
            const res = await fetch('https://www.iwansell.com/api/category/');
            const categorylist = await res.json();
            this.setState({
              categorylist
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
    
        if(this.state.listings.length <= 0 ){
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

      <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
        <Button vertical style={styles.contact} onPress={() => Linking.openURL(`tel:${item.phone}`)}>
                <Icon name="call" style={{ color: 'white' }}/>
              <Text style={styles.btnText}>Phone</Text>
        </Button>
        <Button vertical style={styles.contact} onPress={() => this.sendMsg(item.phone, item.product_name)}>
                <Icon name="chatboxes" style={{ color: 'white' }}/>
              <Text style={styles.btnText}>Inbox</Text>
        </Button>
        <Button vertical style={styles.contact} onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=+234' + item.phone)}>
                <Icon name="logo-whatsapp" style={{ color: 'white' }}/>
              <Text style={styles.btnText}>Whatsapp</Text>
        </Button>
    </ScrollView>

    </View>
  );
  

  _ItemSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.headerStyle}>
          <Body>
            <View style={styles.brandStyle}>

           <View style={styles.inputViewStyle}>
              <HeaderText>Iwansell</HeaderText>
            </View>

            

            {this.state.auth ? (
            <TouchableOpacity
            style={styles.iconStyle}
            onPress={() => this.props.navigation.navigate('SearchListing')}>
               <Icon name='search'/>
           </TouchableOpacity>
          ) : (
            <View/>
          )}
            
            </View>

          </Body>
          <Right>
            <TouchableOpacity
              onPress={() =>
              ActionSheet.show(
                {
                  options: this.state.auth ? BUTTONS : BUTTONS_NL,
                  cancelButtonIndex: CANCEL_INDEX,
                  destructiveButtonIndex: DESTRUCTIVE_INDEX,
                  title: "More [Scroll Down]"
                },
                buttonIndex => {
                  redirect(this.state.auth ? BUTTONS[buttonIndex] : BUTTONS_NL[buttonIndex])
                }
              )}>
              <Icon name='more' style={{ marginRight: 15 }}/>
            </TouchableOpacity>
          </Right>
        </Header>




        <View style={styles.categoryView}>
          <View><Text style={styles.headerText}>Sort</Text></View>
          <TouchableOpacity style={styles.category}>
           {this.state.isLoading ? (
              <View style={styles.loadingView}>
              <View style={styles.loading}>
                <LottieView source={require('./animation/Plane.json')} autoPlay loop/>
              </View>
            </View>
          ) : (
          <Picker
              selectedValue={this.state.category_id}
              prompt="Select Category"
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) => this.sortByCategory(itemValue)}>
              <Picker.Item label="All Categories" value={99} />
              {this.state.categorylist.map(item => 
                  <Picker.Item label={item.name} value={item.id} />
              )}
          </Picker>
          )}
          </TouchableOpacity>
          </View>

        <TouchableOpacity 
              onPress={() => this.props.navigation.navigate('NewListing')}
              style={styles.FABStyle}>
                <Icon name="add" style={{ padding: 10, textAlign: 'center', justifyContent: 'center', color: 'white', fontWeight:'bold', fontSize: 40}}/>
          </TouchableOpacity>





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
      <AnimatedFlatList
        data={this.state.listings}
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
        padding: 5,
        borderColor: 'white',
        borderStyle: 'solid',
        borderWidth: 1,
        flex: 2,
        width: 150,
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
