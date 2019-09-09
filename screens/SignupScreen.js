import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Picker } from 'react-native';
import LottieView from 'lottie-react-native';
import { TextInput } from 'react-native-gesture-handler';
import { ActionSheet } from 'native-base'
import { HeaderTextL } from '../components/StyledText'
import { login } from './components/async_data/Auth'



export default class SignupScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    show: true,
    switchView: true,
    clicked: null,
    isLoading: false,
    isLoading2: false,
    statement: [], 
    firstname: null,
    lastname: null,
    campus: 1,
    campus_id: 1,
    phone: null,
    password: null,
    campuslist: []
  }

  async componentWillMount() {

    this.setState({ isLoading2: true})
   
    try {
      const res = await fetch('https://www.iwansell.com/api/campus/');
      const campuslist = await res.json();
      this.setState({
        campuslist
      });
      
    } catch (e) {
      console.log(e)
  }
  this.setState({ isLoading2: false })

}



  updateFirstname(firstname){
    this.setState({ firstname: firstname })
  }

  updateLastname(lastname){
    this.setState({ lastname: lastname })
  }

  updateCampus(campus){
    this.setState({ campus: campus.id, switchView: false })
  }

  updatePhone(phone){
    this.setState({ phone: phone })
  }

  updatePassword(password){
    this.setState({ password: password })
  }

  





  switch(){
    if(this.state.switchView){
      this.setState({ switchView: false})
    }else{
      this.setState({ switchView: true})
    }
    
  }




  async submitForm(){

    this.setState({ isLoading: true})

    if(this.state.firstname && this.state.lastname && this.state.phone && this.state.password){
        if(!isNaN(this.state.phone)){

    var formData = new FormData()
    formData.append('firstname', this.state.firstname)
    formData.append('lastname', this.state.lastname)
    formData.append('campus', this.state.campus)
    formData.append('phone', this.state.phone)
    formData.append('password', this.state.password)


    try {
      const res = await fetch('https://www.iwansell.com/api/accounts/', {

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

    login(this.state.phone, this.state.password)
          
    }
  }

    this.setState({ isLoading: false})

    


  }



  render() {
    return (
      <KeyboardAvoidingView 
      style={styles.bigContainer} 
      behavior="padding" 
      keyboardVerticalOffset={-50}
      enabled>
          <LottieView source={require('./animation/bg.json')} autoPlay loop/>

          {this.state.switchView ? (
            <View style={styles.container}>
            <View style={styles.btnView}>

          <View style={styles.campusView}>
          <TouchableOpacity>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#01579b'}}>Select Campus</Text>
           {this.state.isLoading2 ? (
              <View style={styles.loadingView}>
              <View style={styles.loading}>
                <LottieView source={require('./animation/Plane.json')} autoPlay loop/>
              </View>
            </View>
          ) : (
          <Picker
              selectedValue={this.state.campus}
              prompt="Select Campus"
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) => this.setState({campus: itemValue})}>
              {this.state.campuslist.map(item => 
                  <Picker.Item label={item.campus_code} value={item.id} />
              )}
          </Picker>
          )}
          </TouchableOpacity>
          </View>


          <TouchableOpacity 
              style={styles.amountContainerB}
              onPress={() => this.switch()}>
              <Text style={styles.textStyleB}>Continue</Text>
          </TouchableOpacity>
    
            
      
           

            </View>

            <View style={styles.signatureView}>
                  <Text style={styles.signature}>A Gregs Production</Text>
            </View>
            
          </View>
          ) : (

            <View style={styles.container}>
            <HeaderTextL style={{ color: 'white'}}>Iwansell</HeaderTextL>

                <View>
                    <View style={styles.amountContainer}>
                      <TextInput 
                        placeholder="First name"
                        placeholderTextColor='rgba(60,90,153, 0.5)'
                        returnKeyType="next"
                        style={styles.inputStyle}
                        onChangeText={(firstname) => this.updateFirstname(firstname)}/>
                    </View>
                    <View style={styles.amountContainer}>
                      <TextInput 
                        placeholder="Last name"
                        placeholderTextColor='rgba(60,90,153, 0.5)'
                        returnKeyType="next"
                        style={styles.inputStyle}
                        onChangeText={(lastname) => this.updateLastname(lastname)}/>
                    </View>
                    <View style={styles.amountContainer}>
                      <TextInput 
                        placeholder="Phone"
                        placeholderTextColor='rgba(60,90,153, 0.5)'
                        keyboardType="numeric"
                        returnKeyType="next"
                        style={styles.inputStyle}
                        onChangeText={(phone) => this.updatePhone(phone)}/>
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
                    <Text style={styles.textStyleB}>Sign Up</Text>
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

                    <TouchableOpacity style={styles.footer} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.options}>Have an account already? SignIn</Text>
                    </TouchableOpacity>
                    
                  </View>
                  
                

            <View style={styles.signatureView}>
                  <Text style={styles.signature}>A Gregs Production</Text>
            </View>
            

          </View>

          )}
        
          

       

        

      </KeyboardAvoidingView>
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
    marginTop: 40
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
  },
  campusView: {
    backgroundColor: 'white',
    marginBottom: 5,
    padding: 5,
    borderColor: '#01579b',
    borderWidth: 2,
    borderStyle:'solid',
  }
})