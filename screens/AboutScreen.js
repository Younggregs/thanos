import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base'
import LottieView from 'lottie-react-native';
import { HeaderText } from '../components/StyledText'


export default class AboutScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    show: false,
  }



  render() {
    return (
      <View style={styles.bigContainer}>
          <LottieView source={require('./animation/bg.json')} autoPlay loop/>
            
            <View style={styles.container}>
            <View style={{ flexDirection: 'row'}}>
          <TouchableOpacity
            style={{ marginLeft: 10, flex: 3 }}
            onPress={() => this.props.navigation.goBack(null)}>
          <Icon 
            name="arrow-back"
            style={{ color: 'white' }}
            />
          </TouchableOpacity>
            <HeaderText style={{ color: 'white', flex: 9}}>About</HeaderText>
          </View>
                
                <View style={styles.aboutContainer}>
                    <HeaderText style={{ color: 'black'}}>A Gregs Production</HeaderText>
                    <Text style={styles.textStyle}>Dedicated to Late Mrs Blessing Tarle.</Text>
                    <Text style={styles.textStyle}>Copyright @ 2019 Iwansell LLC.</Text>
                </View>

            
            </View>

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
  aboutContainer: {
    backgroundColor: 'white',
    margin: 10,
    width: 300,
    height: 300,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  textStyle: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold'
  },
})