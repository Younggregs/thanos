import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state= {
    click: false,
    next: false
  }

  handleClick(){
    this.setState({ click: true })
  }

  handleNext(){
    this.setState({ next: true })
  }


  render() {
    return (
      <View style={styles.bigContainer}>
        <LottieView source={require('./animation/bg.json')} autoPlay loop />
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:30,
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 200,
    marginBottom: 5,
    paddingVertical: 20,
    paddingHorizontal: 20,
    margin: 20,
  },
  welcomeImage: {
    width: '100%',
    height: 150,
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
    borderColor: 'orange',
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
    color: 'orange',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15
  }
});