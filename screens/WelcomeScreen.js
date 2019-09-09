import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import { HeaderText } from '../components/StyledText'
import { RegularText } from '../components/StyledText'
//auth
import { _retrieveData } from '../screens/components/async_data/Async'


export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state= {
    click: false,
    next: false,
    show: true
  }

  handleClick(){
    this.setState({ click: true })
  }

  handleNext(){
    this.setState({ next: true })
  }

  async componentWillMount(){
    const auth = await _retrieveData('auth_code')

    if(auth.toString().length >= 10){
      this.props.navigation.navigate('HomeStack')
    }else{
      setTimeout( () => {
        this.setState({show: false});
      }, 3000)
    }
   
  }


  render() {
    return (
      <View style={styles.bigContainer}>
        <LottieView source={require('./animation/bg.json')} autoPlay loop />

        {this.state.click ? (

<View style={styles.container}>

  {this.state.next ? (

    <View style={styles.container}>

  <View style={styles.centerAnimation}>
      <LottieView source={require('./animation/car.json')} autoPlay loop />
  </View>

  

  <View style={styles.amountContainer}>
  
  <HeaderText style={{ color: '#01579b'}}>Speed! </HeaderText>
  <RegularText style={{ color: '#01579b' }}>Lightening Fast Transactions </RegularText>

</View>

<TouchableOpacity 
    style={styles.amountContainerB}
    onPress={() => this.props.navigation.navigate('Fence')}>
      <HeaderText style={{ color: 'white'}}>Done</HeaderText>
</TouchableOpacity>

  
</View>

  ) : (

  <View style={styles.container}>

  <View style={styles.centerAnimation}>
      <LottieView source={require('./animation/shop.json')} autoPlay loop />
  </View>

  

  <View style={styles.amountContainer}>
  
  <HeaderText style={{ color: '#01579b'}}>eShops! </HeaderText>
  <RegularText style={{ color: '#01579b' }}>Create online stores for your business!</RegularText>

</View>

<TouchableOpacity 
    style={styles.amountContainerB}
    onPress={this.handleNext.bind(this)}>
      <HeaderText style={{ color: 'white'}}>Continue</HeaderText>
</TouchableOpacity>

  
</View>

  )}

</View>


) : (

<View style={styles.container}>
{this.state.show ? (
  <View style={styles.welcomeAnimation}>
  <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/nicon.png')
                  : require('../assets/images/nicon.png')
              }
              style={styles.welcomeImage}
            />
  </View>
  <View style={styles.centerAnimationW}>
    <LottieView source={require('./animation/welcome.json')} autoPlay loop/>
  </View>
  </View>

) : (
  <View style={styles.container}>
    
  <View style={styles.centerAnimation}>
    <LottieView source={require('./animation/timeline.json')} autoPlay loop />
  </View>

  

  <View style={styles.amountContainer}>
  
    <HeaderText style={{ color: '#01579b' }}>Sell and Buy!</HeaderText>
    <RegularText style={{ color: '#01579b' }}>Sell anything you want!</RegularText>
    <RegularText style={{ color: '#01579b' }}>Buy anything you can find!</RegularText>

</View>

<TouchableOpacity 
    style={styles.amountContainerB}
    onPress={this.handleClick.bind(this)}>
    <HeaderText style={{ color: 'white'}}>Next</HeaderText>
</TouchableOpacity>
  
  </View>

)}




  
</View>

)}

      </View>
    )  
  }
}


const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  centerAnimation: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 250,
    backgroundColor: 'white',
    borderRadius: 150,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  centerAnimationW: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 300,
    backgroundColor: 'white',
    borderRadius: 150,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  welcomeAnimation: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:30,
  },
  welcomeContainer: {
    margin: 10,
  },
  welcomeImage: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  amountContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 25,
    borderRadius: 15,
    borderColor: '#01579b',
    borderWidth: 2,
    borderStyle:'dotted',
  },
  amountContainerB: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 15,
    backgroundColor: '#01579b',
    alignItems: 'center',
    margin: 25,
    width: 300,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 2,
    borderStyle:'dotted',
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  amountRow: {
    flexDirection: 'row',
  },
  btn: {
    padding: 10,
    margin: 10,
  },
  landingText: {
    color: '#01579b',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15
  },
  landingTextB: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'baloo-bhai',
    fontSize: 15,
  }
});