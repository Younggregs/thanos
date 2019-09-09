import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import { TextInput } from 'react-native-gesture-handler';
import { HeaderTextL } from '../components/StyledText'


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
        
        {this.state.show ? (
           <View style={styles.container}>
           <HeaderTextL style={{ color: 'white' }}>Iwansell</HeaderTextL>

           <View>
               <View style={styles.amountContainer}>
                 <TextInput 
                   placeholder="Recovery Code"
                   placeholderTextColor='rgba(60,90,153, 0.5)'
                   keyboardType="numeric"
                   returnKeyType="next"
                   style={styles.inputStyle}/>
               </View>
               <View style={styles.amountContainer}>
                 <TextInput 
                   placeholder="New Password"
                   placeholderTextColor='rgba(60,90,153, 0.5)'
                   returnKeyType="next"
                   style={styles.inputStyle}/>
               </View>
               <View style={styles.amountContainer}>
                 <TextInput 
                   placeholder="New Password Again"
                   placeholderTextColor='rgba(60,90,153, 0.5)'
                   returnKeyType="go"
                   style={styles.inputStyle}/>
               </View>
           </View>

           <View style={styles.btnView}>

             <TouchableOpacity 
                 style={styles.amountContainerB}
                 onPress={() => this.props.navigation.navigate('Login')}>
               <Text style={styles.textStyleB}>Submit</Text>
             </TouchableOpacity>
             
           </View>

           <View style={styles.signatureView}>
                  <Text style={styles.signature}>A Gregs Production</Text>
            </View>

         </View>
        ) : (
          <View style={styles.container}>
            <HeaderTextL style={{ color: 'white'}}>iwansell</HeaderTextL>

            <View>
                <View style={styles.amountContainer}>
                  <TextInput 
                    placeholder="email (example@gmail.com)"
                    placeholderTextColor='rgba(60,90,153, 0.5)'
                    keyboardType="numeric"
                    returnKeyType="go"
                    style={styles.inputStyle}/>
                </View>
            </View>

            <View style={styles.btnView}>

              <TouchableOpacity 
                  style={styles.amountContainerB}
                  onPress={() => this.setState({ show: true})}>
                <Text style={styles.textStyleB}>Submit</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.signatureView}>
                  <Text style={styles.signature}>A Gregs Production</Text>
            </View>

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
  amountContainer: {
    backgroundColor: 'white',
    margin: 10,
    width: 250,
    height: 50,
    padding: 5,
    alignItems: 'center',
    borderRadius: 25,
    borderColor: '#01579b',
    borderWidth: 2,
    borderStyle:'solid',
  },
  amountContainerB: {
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
    color: '#01579b',
    fontSize: 20,
    fontWeight: 'bold'
  },
  textStyleB: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  headerTextStyle: {
    color: 'white',
    fontSize: 35,
    fontWeight: '200'
  },
  btnView: {
    marginTop: 60
  },
  inputStyle: {
    color: '#01579b',
    fontSize: 18,
    fontWeight: 'bold'
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