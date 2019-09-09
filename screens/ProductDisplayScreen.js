import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView
} from 'react-native';
import { Constants } from 'expo';
import * as SMS from 'expo-sms';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import ProductDetailList from './components/ProductDetailList';
import { Container, Footer, FooterTab, Button, Header, Body, Right, Left, Icon, ActionSheet } from 'native-base';
import { HeaderText } from '../components/StyledText'
import LottieView from 'lottie-react-native';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const HEADER_HEIGHT = 240;
const SCROLLABLE_HEIGHT = HEADER_HEIGHT - Constants.statusBarHeight + 15;

export default class ProductDisplayScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: '2', title: '#1 place to buy and sell on campus' },
      ],
      scroll: new Animated.Value(0),
      phone: null,
      whatsapp: null,
      productDetail: [],
      media: 'https://www.iwansell.com/api/media/anon.png',
      dp: 'https://www.iwansell.com/api/media/anon.png',
      isfavorited: false,
      isLoading: false,
      product_id: null
    };
  }



  async sendMsg(phone, product){

    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const message = "Hi, I am interested in your product '" + product + " ' on Iwansell." 
      SMS.sendSMSAsync(phone, message)
    } else {
    alert("Sorry your device does not support this feature")
  }

}


 
   async componentWillMount() {

    const { navigation } = this.props;
    const product_id = navigation.getParam('product_id', 162)

    this.setState({ isLoading: true, product_id: product_id })

     try {
       const res = await fetch('https://www.iwansell.com/api/product/' + product_id);
       const productDetail = await res.json();
       this.setState({
         productDetail
       });
     } catch (e) {
       console.log(e);
     }

     this.setState({ 
      isLoading: false, 
      phone: this.state.productDetail.phone,
      whatsapp:  '+234' + this.state.productDetail.phone 
    })

      this.setMedia(this.state.productDetail.product_image)
   }



   setMedia(media_name){
    var media = 'https://www.iwansell.com/api/media/' + media_name
    this.state.media = media
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
            source={{ uri: this.state.media, cache: 'forced-cache', }}
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
      <ProductDetailList
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scroll } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT + 50 }}
        product_id = {this.state.product_id}
        profile_id = {this.state.productDetail.profile_id}
        display_pic = {this.state.productDetail.display_pic}
        firstname = {this.state.productDetail.firstname} 
        lastname = {this.state.productDetail.lastname} 
        product_name = {this.state.productDetail.product_name}
        description = {this.state.productDetail.product_description}
        starting_price = {this.state.productDetail.starting_price}
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
            <ScrollView horizontal={true}>
            <Button vertical style={styles.contact} onPress={() => Linking.openURL(`tel:${this.state.phone}`)}>
                <Icon name="call" style={{ color: 'white' }}/>
              <Text style={styles.btnText}>Phone</Text>
            </Button>
            <Button vertical style={styles.contact} onPress={() => this.sendMsg(this.state.phone, this.state.productDetail.product_name)}>
                <Icon name="chatboxes" style={{ color: 'white' }}/>
              <Text style={styles.btnText}>Inbox</Text>
            </Button>
            <Button vertical style={styles.contact} onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=' + this.state.whatsapp)}>
                <Icon name="logo-whatsapp" style={{ color: 'white' }}/>
              <Text style={styles.btnText}>Whatsapp</Text>
            </Button>
            </ScrollView>

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
    marginLeft: 10,
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
    padding: 15,
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    width: 150,
    backgroundColor: '#01579b'
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
