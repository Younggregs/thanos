import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { Icon } from 'native-base'
import LottieView from 'lottie-react-native';
import { HeaderText } from '../components/StyledText'


export default class PasswordRecoveryScreen extends React.Component {

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
            
            <View style={styles.btnView}>

            <View style={{ flexDirection: 'row'}}>
          <TouchableOpacity
            style={{ marginTop: 30, marginLeft: 10, flex: 3 }}
            onPress={() => this.props.navigation.goBack(null)}>
          <Icon 
            name="arrow-back"
            style={{ color: 'white' }}
            />
          </TouchableOpacity>
            <HeaderText style={{ color: 'white', flex: 9, marginTop: 30, }}>Business Mode</HeaderText>
          </View>
            

              <TouchableOpacity 
                  style={styles.amountContainer}
                  onPress={() => this.props.navigation.navigate('ProductValuation')}>
                <Text style={styles.textStyle}>Product Valuation</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                  style={styles.amountContainer}
                  onPress={() => this.props.navigation.navigate('TopSearch')}>
                <Text style={styles.textStyle}>Top Searched</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                  style={styles.amountContainer}
                  onPress={() => this.props.navigation.navigate('NotFound')}>
                <Text style={styles.textStyle}>Top Not Found</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                  style={styles.amountContainer}
                  onPress={() => this.props.navigation.navigate('TopSold')}>
                <Text style={styles.textStyle}>Top Sold</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                  style={styles.amountContainer}
                  onPress={() => this.props.navigation.navigate('LeastSold')}>
                <Text style={styles.textStyle}>Least Sold</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                  style={styles.amountContainer}
                  onPress={() => this.props.navigation.navigate('TopForSell')}>
                <Text style={styles.textStyle}>Top For Sell</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                  style={styles.amountContainer}
                  onPress={() => this.props.navigation.navigate('LeastForSell')}>
                <Text style={styles.textStyle}>Least For Sell</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.signatureView}>
                  <Text style={styles.signature}>A Gregs Production</Text>
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
  amountContainer: {
    backgroundColor: '#01579b',
    margin: 10,
    width: 200,
    height: 50,
    padding: 5,
    alignItems: 'center',
    borderRadius: 25,
    borderColor: 'white',
    borderWidth: 2,
    borderStyle:'solid',
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  btnView: {
    marginTop: 60, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  signatureView:{
    width: '100%', 
    height: 50, 
    backgroundColor: 'rgba(0,0,255, 0.32)', 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  signature: {
      alignItems: 'center',
      color: 'white',
  }
})