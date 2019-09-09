import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import ChannelHome from './components/ChannelHome'
import ChannelTrending from './components/ChannelTrending'
import { Container, Header, Body, Right, Icon, ActionSheet } from 'native-base';
import { HeaderText } from '../components/StyledText'

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const HEADER_HEIGHT = 240;
const SCROLLABLE_HEIGHT = HEADER_HEIGHT - Constants.statusBarHeight + 15;

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




export default class TVScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Home' },
        { key: 'second', title: 'Trending' },
      ],
      scroll: new Animated.Value(0),
      auth: false,
      has_channel: false
    };
  }

  async componentWillMount(){
    const auth = await _retrieveData('auth_code')

    if(auth.toString().length >= 10){
      this.setState({ auth: true})
    }else{
      this.setState({ auth: false})
    }

    try {
      const res = await fetch('https://www.iwansell.com/api/has_channel/', {
       headers : {
         'Authorization' : 'Token ' + auth
       }

      })
      const has_channel = await res.json();
        this.setState({
          has_channel
        });

    } catch (e) {
      console.log(e);
    }
   
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
          source={
            __DEV__
              ? require('../assets/images/tv1.jpg')
              : require('../assets/images/tv1.jpg')
          }
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
      <View style={{ flex: 1}}>
        <ChannelHome
          scrollEventThrottle={1}
          onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scroll } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT + 50 }}
        navigation = {this.props.navigation}
      />
      </View>
    );
  };

  _renderScene2 = () => {
    return (
          <ChannelTrending
          scrollEventThrottle={1}
          onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scroll } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT + 50 }}
        navigation = {this.props.navigation}
      />
    );
  };

  render() {
    const { navigation } = this.props;

    function redirect(screen){
      navigation.navigate(screen.route)
    }

    return (
      <Container>
        <Header style={styles.headerStyle}>
          <Body>
            <View style={styles.brandStyle}>

           <View style={styles.inputViewStyle}>
              <HeaderText>Iwansell TV</HeaderText>
            </View>

            <TouchableOpacity
             style={styles.iconStyle}
             onPress={() => this.props.navigation.navigate('Search')}>
                <Icon name='search'/>
            </TouchableOpacity>
            
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

          
          {this.state.has_channel ? (
            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('NewThread')}
            style={styles.FABStyle}>
              <Icon name="add" style={{ padding: 10, textAlign: 'center', justifyContent: 'center', color: 'white', fontWeight:'bold', fontSize: 40}}/>
          </TouchableOpacity>
          ) : (
            <View/>
          )}
      
        
        <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={SceneMap({
          first: this._renderScene,
          second: this._renderScene2,
        })}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    
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
  }
});
