import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native'
import { Icon, Container } from 'native-base'
import Dialog, { DialogContent, SlideAnimation } from 'react-native-popup-dialog'
import LottieView from 'lottie-react-native'
import { _retrieveData } from './async_data/Async'


export default class SendReply4 extends React.Component {

state ={
    visible: false,
    msg: null,
    reply: null,
    auth: false
}


async componentWillMount(){
  const auth = await _retrieveData('auth_code')

  if(auth.toString().length >= 10){
    this.setState({ auth: true})
  }else{
    this.setState({ auth: false})
  }
 
}

 updateReply(reply){
    this.setState({ reply })
  }

  getReply(reply){
    return reply.substring(0, 100) + '...'
  }


  async sendReply(){

            this.setState({ isLoading: true})
  
            var formData = new FormData()
            formData.append('reply', this.state.reply)
    
            try {
              const res = await fetch('https://www.iwansell.com/api/reply_4/' + this.props.reply_id + '/', {
    
               body : formData,
               method: 'POST',
               headers : {
                'Authorization' : 'Token ' + auth
              },
    
              })
              const message = await res.json();
                this.setState({
                  message, 
                });
                alert('sent')
    
    
            } catch (e) {
              console.log(e);
              alert('failed, retry please')
            }
    
            this.setState({ isLoading: false, visible: false})

}        




  render(){
      return(
        <View style={{flexDirection: 'row'}}>
        <Icon name='chatbubbles'
          onPress={() => {
          this.setState({ visible: true });
        }}/>
        <Dialog
          visible={this.state.visible}
          onTouchOutside={() => {
          this.setState({ visible: false });
          }}
          dialogAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
        >
        <DialogContent>
        {this.state.auth ? (
            <View>

              <Text>{this.getReply(this.props.reply)}</Text>
              <View style={{ flexDirection: 'row'}}>
      <View style={styles.amountContainerD}>
      <TextInput 
        placeholder="msg box"
        placeholderTextColor='rgba(60,90,153, 0.5)'
        returnKeyType="go"
        multiline={true}
        style={styles.inputStyle}
        onChangeText={(reply) => this.updateReply(reply)}/>
        </View>

        {this.state.isLoading ? (
          <View style={styles.loadingView}>
              <View style={styles.loading}>
                <LottieView source={require('../animation/Plane.json')} autoPlay loop/>
              </View>
          </View>
        ) : (
        <View style={styles.sendIcon}>
          <Icon 
            name='send'
            color='white' 
            onPress={() => this.sendReply()}
            style={{color: 'white'}}/>
        </View>
        )}

            </View>
              
            </View>
          ) : (
            <TouchableOpacity
                          onPress={() => this.props.navigation.navigate('Login')}>
                            <Text>Login to Reply, Click me to Login</Text>
                          </TouchableOpacity>
          )}
              
        </DialogContent>
      </Dialog>
        <Text style={{ fontWeight: 'bold', fontSize: 20}}>{this.props.count}</Text>
    </View>

      )
  }
}



const styles = StyleSheet.create({
    
    
    comment: {
        width: '100%',
        marginBottom: 20,
    },
    reply: {
        borderLeftColor: '#E1E8ED',
        borderLeftWidth: 4,
        borderStyle: 'solid',
        marginLeft: 10
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
    },
    amountContainerD: {
      backgroundColor: 'white',
      margin: 5,
      padding: 5,
      width: 250,
      borderBottomColor: '#01579b',
      borderBottomWidth: 2,
      borderStyle: 'solid',
    },
    sendIcon: {
      backgroundColor: '#01579b',
      height: 50,
      width: 50,
      borderRadius: 25,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
    }
})