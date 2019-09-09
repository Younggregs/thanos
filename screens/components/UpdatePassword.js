import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { TextInput } from 'react-native-gesture-handler';
import { _retrieveData } from './async_data/Async'



export default class UpdatePassword extends React.Component {

    state = {
        isLoading: false,
        message : [],
        old_password: null,
        new_password: null,
        confirm_password: null
      }
    
      async update(){
    
        this.setState({ isLoading: true })
        const auth = await _retrieveData('auth_code')
    
    
        var formData = new FormData()
        formData.append('old_password', this.state.old_password)
        formData.append('new_password', this.state.new_password)
        formData.append('confirm_password', this.state.confirm_password)
    
        try {
          const res = await fetch('https://www.iwansell.com/api/update_password/', {
    
    
           body : formData,
           method: 'POST',
           credentials: 'same-origin',
           mode: 'cors',
           headers : {
             'Authorization' : 'Token ' + auth
           }
    
          })
          const message = await res.json();
            this.setState({
              message
            });
    
        } catch (e) {
          console.log(e);
        }
    
        this.setState({ isLoading: false })
    
    }
  

  updateOldPassword(old_password){
    this.setState({ old_password: old_password })
  }

  updateNewPassword(new_password){
    this.setState({ new_password: new_password })
  }

  updateConfirmPassword(confirm_password){
    this.setState({ confirm_password: confirm_password })
  }


 

  render() {
    return (
      <View style={styles.bigContainer}>
         
          <View style={styles.container}>
            <Text style={{ color: '#01579b', fontWeight: 'bold',fontSize: 15}}>Update / Reset Password</Text>
            <View>
                <View style={styles.amountContainer}>
                  <TextInput 
                    placeholder="Old Password"
                    placeholderTextColor='rgba(0,0,255, 0.5)'
                    returnKeyType="next"
                    secureTextEntry={true}
                    style={styles.inputStyle}
                    onChangeText={(old_password) => this.updateOldPassword(old_password)}/>
                </View>
                <View style={styles.amountContainer}>
                  <TextInput 
                  placeholder="New Password"
                  placeholderTextColor='rgba(0,0,255, 0.5)'
                  secureTextEntry={true}
                  returnKeyType="next"
                  style={styles.inputStyle}
                  onChangeText={(new_password) => this.updateNewPassword(new_password)}/>
                </View>
                <View style={styles.amountContainer}>
                  <TextInput 
                  placeholder="Confirm Password"
                  placeholderTextColor='rgba(0,0,255, 0.5)'
                  secureTextEntry={true}
                  returnKeyType="done"
                  style={styles.inputStyle}
                  onChangeText={(confirm_password) => this.updateConfirmPassword(confirm_password)}/>
                </View>
            </View>

            <View style={styles.btnView}>

              <TouchableOpacity 
                  style={styles.amountContainerB}
                  onPress={() => this.update()}>
                <Text style={styles.textStyleB}>Update Password</Text>
              </TouchableOpacity>

            </View>

            <View style={styles.optionsView}>

              {this.state.isLoading && (
                <View style={styles.loading}>
                  <LottieView source={require('../animation/Plane.json')} autoPlay loop/>
                </View>
                )}
              

              <View>
                  {this.state.message.error_message && (
                    <Text style={styles.error}>{this.state.statement.error_message}</Text>
                  )}

                  {this.state.message.code && (
                      <HeaderText>Success</HeaderText>
                )}
              </View>         
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
    width: 200,
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
    marginTop: 30,
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
    backgroundColor: 'rgba(0,0,255, 0.32)', 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  signature: {
      alignItems: 'center',
      color: 'white',
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
  }
})