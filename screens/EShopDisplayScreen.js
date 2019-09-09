import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';
import { Constants } from 'expo';
import { TabViewAnimated, TabBar } from 'react-native-tab-view'; 
import EShopDetailList from './components/EShopDetailList';
import { Container, Footer, FooterTab, Button, Header, Body, Right, Left, Icon, ActionSheet } from 'native-base';
import { HeaderText } from '../components/StyledText'
import LottieView from 'lottie-react-native';


const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const HEADER_HEIGHT = 240;
const SCROLLABLE_HEIGHT = HEADER_HEIGHT - Constants.statusBarHeight + 15;

var BUTTONS = [
  { text: "Upload Product", icon: "cart", iconColor: "#8c1ef4", route: "NewProduct" },
  { text: "Business Mode", icon: "analytics", iconColor: "#2c8ef4", route: "BusinessMode" },
  { text: "Rent eShop", icon: "home", iconColor: "#6c3ef4", route: "NewEShop"},
  { text: "About", icon: "bulb", iconColor: "#ea943b", route: "About" },
  { text: "Contact Us", icon: "chatboxes", iconColor: "#fa213b", route: "Contact" },
  { text: "Logout", icon: "contact", iconColor: "#25de5b", route: "Welcome"},
  { text: "Cancel", icon: "close", iconColor: "#10de9b", route: ""}
];

var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class EShopDisplayScreen extends React.Component {

  static navigationOptions = {
    header: null
  };


 

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: '1', title: "Welcome to the eShop" },
      ],
      scroll: new Animated.Value(0),
      phone: null,
      whatsapp: null,
      eshop_id:  null,
      isLoading: false,
      eshop : {},
      boss_info: {},
      my_eshop : true,
      media: 'https://www.iwansell.com/api/media/anon.png',
      eshop_rating: 0,
    };
  }

  async componentWillMount() {

    
    const { navigation } = this.props;
    const eshop_id = navigation.getParam('eshop_id', 1)

    this.setState({ isLoading: true, eshop_id: eshop_id })

    

  try {
    const res = await fetch('https://www.iwansell.com/api/eshop/' + eshop_id);
    const eshop = await res.json();
    this.setState({
      eshop
    });
  } catch (e) {
    console.log(e);
  }


  try {
    const res = await fetch('https://www.iwansell.com/api/about_eshop/' + eshop_id);
    const boss_info = await res.json();
      this.setState({
        boss_info
      });
  } catch (e) {
    console.log(e);
  }



  try {
    const res = await fetch('https://www.iwansell.com/api/rating/' + eshop_id);
    const eshop_rating = await res.json();
      this.setState({
        eshop_rating
      });
  } catch (e) {
    console.log(e);
  }



  
  this.setState({ 
        isLoading: false, 
        phone: this.state.boss_info.phone,
        whatsapp:  '+234' + this.state.boss_info.phone 
      })
  this.setMedia(this.state.eshop.catch_board)




}

_eshop_name(name){
  return name.toString().slice(0, 12) + '...'
}



setMedia(media_name){
  this.state.media = 'https://www.iwansell.com' + media_name
}





  _handleIndexChange = index => {
    this.setState({ index });
  };

  _renderHeader = props => {
    const translateY = this.state.scroll.interpolate({
      inputRange: [0, SCROLLABLE_HEIGHT],
      outputRange: [0, -SCROLLABLE_HEIGHT],
      extrapolate: 'clamp',
    });

    const imageOpacity = this.state.scroll.interpolate({
      inputRange: [0, SCROLLABLE_HEIGHT / 2, SCROLLABLE_HEIGHT],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    const imageTranslate = this.state.scroll.interpolate({
      inputRange: [0, SCROLLABLE_HEIGHT],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
        <Animated.Image
            resizeMethod="resize"
            source={{ uri: this.state.media, cache: 'forced-cache', }}
            style={[
            styles.cover,
            {opacity: imageOpacity, transform: [{translateY: imageTranslate}]},
          ]}>
          </Animated.Image>




          <View style={styles.overlay} />
          <TabBar 
          {...props} 
          indicatorStyle={{ backgroundColor: '#01579b' }} 
          activeColor="#01579b"
          bounces={true}
          labelStyle={{ color: 'black'}}
          style={styles.tabbar} />
        
      </Animated.View>
    );
  };

  _renderScene = () => {
    return (
      <EShopDetailList
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scroll } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT + 50 }}
        eshop_id = {this.state.eshop_id}
        eshop_name = {this.state.eshop.name}
        eshop_rating = {this.state.eshop_rating}
        boss = {this.state.boss_info.boss}
        boss_id = {this.state.boss_info.id}
        boss_dp = {this.state.boss_info.dp}
        about = {this.state.eshop.about}
        navigation = {this.props.navigation}
      />
    );
  };

  render() {
    return (
      <Container>
        {this.state.isLoading ? (
          <View style={styles.loadingView}>
          <View style={styles.loading}>
                <LottieView source={require('./animation/Plane.json')} autoPlay loop/>
          </View>
          </View>
        ) : (
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

          <Body>
            <View style={styles.brandStyle}>

           <View style={styles.inputViewStyle}>
              <HeaderText>{this._eshop_name(this.state.eshop.name)}</HeaderText>
            </View>
            
            </View>

          </Body>

          <Right>
          <TouchableOpacity
             style={styles.iconStyle}
             onPress={() => this.props.navigation.navigate('EShopSearch',
              {
                eshop_name: this.state.eshop.name,
                eshop_id: this.state.eshop_id
              })}>
                <Icon name='search'/>
            </TouchableOpacity>
          </Right>
          
        </Header>
        <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />

      <Footer>
          <FooterTab>
            <Button vertical style={styles.contact} onPress={() => Linking.openURL(`tel:${this.state.phone}`)}>
                <Icon name="call" style={{ color: 'white' }}/>
              <Text style={styles.btnText}>Phone</Text>
            </Button>
            <Button vertical style={styles.contact} onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=' + this.state.whatsapp)}>
                <Icon name="logo-whatsapp" style={{ color: 'white' }}/>
              <Text style={styles.btnText}>Whatsapp</Text>
            </Button>
          </FooterTab>
        </Footer>
          </Container>

        )}
       
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  contact: {
    backgroundColor: '#01579b',
    padding: 15,
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1
},
btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'baloo-bhai'
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
