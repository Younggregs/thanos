import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';
import { TabViewAnimated, TabBar } from 'react-native-tab-view'; 
import ProfileView from './components/ProfileView';
import { Container, Header, Body, Right, Icon, ActionSheet, Left } from 'native-base';
import { HeaderText } from '../components/StyledText'
import LottieView from 'lottie-react-native';
import { _retrieveData } from './components/async_data/Async'


const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const HEADER_HEIGHT = 240;
const SCROLLABLE_HEIGHT = HEADER_HEIGHT - Constants.statusBarHeight + 15;

export default class ProfileScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: '2', title: 'Hey Dear' },
      ],
      scroll: new Animated.Value(0),
      isLoading: false,
      profileDetail: [],
      account_id: null,
      display_pic: null
    };
  }







  async componentDidMount(){

    this.setState({ isLoading: true })
    const auth = await _retrieveData('auth_code')

    try {
      const res = await fetch('https://www.iwansell.com/api/get_account/',{
       credentials: 'same-origin',
       mode: 'cors',
       headers : {
         'Authorization' : 'Token ' + auth
       },

      });
      const account_id = await res.json();
      this.setState({
        account_id
      });
      
    } catch (e) {
      
    }

   if(isNaN(this.state.account_id)){
     this.setState({ account_id: 2 })
   }

    
  



    try {
        const res = await fetch('https://www.iwansell.com/api/accounts/' + this.state.account_id);
        const profileDetail = await res.json();
        this.setState({
          profileDetail
        });
      } catch (e) {
        console.log(e);
    }

    

    this.setState({ isLoading: false })


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
            source={{ uri: 'https://www.iwansell.com' + this.state.profileDetail.display_pic, cache: 'forced-cache', }}
            resizeMethod="resize"
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
      <ProfileView
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scroll } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT + 50 }}
        account_id = {this.state.account_id}
        firstname ={this.state.profileDetail.firstname}
        lastname = {this.state.profileDetail.lastname}
        navigation = {this.props.navigation}
      />
    );
  };

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
          <Body>
            <View style={styles.brandStyle}>

           <View style={styles.inputViewStyle}>
              <HeaderText>Iwansell</HeaderText>
            </View>
            
            </View>

          </Body>
          <Right>
          <TouchableOpacity
             style={styles.iconStyle}
             onPress={() => this.props.navigation.navigate('Search')}>
                <Icon name='search'/>
            </TouchableOpacity>
          </Right>
        </Header>

        {this.state.isLoading ? (
          <View style={styles.loadingView}>
          <View style={styles.loading}>
                <LottieView source={require('./animation/Plane.json')} autoPlay loop/>
          </View>
          </View>
        ) : (
        <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
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
