import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { TextInput } from 'react-native-gesture-handler';
import { HeaderTextL } from '../components/StyledText'
import { login } from './components/async_data/Auth'
import { _retrieveData } from './components/async_data/Async'


export default class LoginScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };


  state = {
    isLoading: false,
    auth_code: null,
    show: true,
    statement: [],
    username: null,
    password: null,
  }

  

  updateUsername(username){
    this.setState({ username: username })
  }

  updatePassword(password){
    this.setState({ password: password })
  }


 async submitForm(){

    this.setState({ isLoading: true})

    var formData = new FormData()
    formData.append('username', this.state.username)
    formData.append('password', this.state.password)


    try {
      const res = await fetch('https://www.iwansell.com/api/signin/', {

       body :formData,
       method: 'POST',
       credentials: 'same-origin',
       mode: 'cors',

      });
      const statement = await res.json();
      this.setState({
        statement
      });

    } catch (e) {
      console.log(e);
    }

    login(this.state.username, this.state.password)

    this.setState({ isLoading: false})


  }


  async componentWillMount(){
   // _retrieveData('auth_code');
    setTimeout( () => {
      this.setState({show: false});
    }, 8000)
  
  }

  render() {
    return (
      <View style={styles.bigContainer}>
          <LottieView source={require('./animation/bg.json')} autoPlay loop/>
      
          <View style={styles.container}>
            <HeaderTextL style={{ color: 'white'}}>Iwansell</HeaderTextL>
            <View>
                <View style={styles.amountContainer}>
                  <TextInput 
                    placeholder="Phone"
                    placeholderTextColor='rgba(60,90,153, 0.5)'
                    keyboardType="numeric"
                    returnKeyType="next"
                    style={styles.inputStyle}
                    onChangeText={(username) => this.updateUsername(username)}/>
                </View>
                <View style={styles.amountContainer}>
                  <TextInput 
                  placeholder="Password"
                  placeholderTextColor='rgba(60,90,153, 0.5)'
                  secureTextEntry={true}
                  returnKeyType="done"
                  style={styles.inputStyle}
                  onChangeText={(password) => this.updatePassword(password)}/>
                </View>
            </View>

            <View style={styles.btnView}>

              <TouchableOpacity 
                  style={styles.amountContainerB}
                  onPress={() => this.submitForm()}>
                <Text style={styles.textStyleB}>Sign In</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.optionsView}>

              {this.state.isLoading && (
                <View style={styles.loading}>
                  <LottieView source={require('./animation/Plane.json')} autoPlay loop/>
                </View>
                )}
              

              <View>
                  {this.state.statement.error_message && (
                    <Text style={styles.error}>{this.state.statement.error_message}</Text>
                  )}

                  {this.state.statement.code && (
                  this.props.navigation.navigate('HomeStack')
                )}
              </View>

              <View>
                <TouchableOpacity style={styles.footer} onPress={() => this.props.navigation.navigate('Signup')}>
                    <Text style={styles.options}>Dont have an account yet? SignUp</Text>
                </TouchableOpacity>
                  
                <TouchableOpacity style={styles.footer} onPress={() => this.props.navigation.navigate('PasswordRecovery')}>
                    <Text style={styles.options}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            
            </View>
              
            

            <View style={styles.signatureView}>
                  <Text style={styles.signature}>A Gregs Production</Text>
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
    marginTop: 60,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  inputStyle: {
    color: '#01579b',
    fontSize: 20,
    fontWeight: 'bold'
  },
  signatureView:{
    width: '100%', 
    height: 50, 
    backgroundColor: 'rgba(60,90,153, 0.32)', 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  signature: {
      alignItems: 'center',
      color: 'black',
  },
  loading: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 10,
  },
  options: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10
  },
  optionsView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer:{
    backgroundColor: '#01579b',
    marginBottom: 5,
    padding: 5,
    borderColor: 'white',
    borderWidth: 2,
    borderStyle:'solid',
    borderRadius: 5
  }
})