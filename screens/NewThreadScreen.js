import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Image, ScrollView} from 'react-native';
import { ImagePicker } from 'expo'
import { Icon } from 'native-base'
import LottieView from 'lottie-react-native';
import { TextInput } from 'react-native-gesture-handler';
import { HeaderText } from '../components/StyledText'
import { _retrieveData } from './components/async_data/Async'
import * as Permissions from 'expo-permissions';


export default class NewThreadScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    account_id: null,
    isLoading: false,
    title: null,
    post: null,
    image: null,
    message: {},
    buffer: [],
    title_err: false,
    post_err: false,
    channel: null,
    channel_: 'Iwansell Tv'
  }


  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      let image = result.uri
      let filename = image.split('/').pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      this.setState({ image: result.uri });
      var register = { uri: image, name: filename, type: type }

      this.state.buffer.push(register)
      this.forceUpdate()
    }
  };




  updateTitle(title){
    this.setState({ title })
  }

  updatePost(post){
    this.setState({ post })
  }




  async alertIfRemoteNotificationsDisabledAsync() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Hi! You have to enable access for camera and photos for iwansell to proceed.');
    }
  }


  async componentWillMount() {

    

    this.setState({ isLoading: true})
     this.alertIfRemoteNotificationsDisabledAsync()
    
    const auth = await _retrieveData('auth_code')

    try {
      const res = await fetch('https://www.iwansell.com/api/get_account/',{
       credentials: 'same-origin',
       mode: 'cors',
       headers : {
         'Authorization' : 'Token ' + auth
       },

      });
      const account_id = await res.json();
      this.setState({
        account_id
      });
      
    } catch (e) {
      
    }

    if(isNaN(this.state.account_id)){
      this.setState({ account_id: 2 })
    }

    this.setState({ isLoading: false})


  }


  evaluateControl(){
    this.props.navigation.navigate("NewListingMedia",{
      account_id: this.state.account_id,
      category_id: this.state.category_id,
      product_name: this.state.product_name,
      description: this.state.description,
      budget: this.state.budget
    })
    
  }




  async submit(){

       

    this.setState({ 
        title_err: false,
        post: false,
      })
  
        if(this.state.title){
  
          if(this.state.post){

            this.setState({ isLoading: true})
            const auth = await _retrieveData('auth_code')
  
            var formData = new FormData()
            formData.append('title', this.state.title)
            formData.append('post', this.state.post)
    
            for (var file of this.state.files) {
                formData.append('files', file);
                console.log(file + ' ' + file.name)
              }
    
            
    
    
            try {
              const res = await fetch('https://www.iwansell.com/api/thread/7/', {
    
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
    
            this.setState({ isLoading: false})

          }else{
            this.setState({post_err: true})
          }
  
        }else{
          this.setState({title_err: true})
        }

    

}

  



  render() {

    let { image } = this.state;

    return (
        <KeyboardAvoidingView 
        style={styles.bigContainer} 
        behavior="padding" 
        keyboardVerticalOffset={-50}
        enabled>
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
            <HeaderText style={{ color: 'white', flex: 9 }}>New Post[RaveTv]</HeaderText>
          </View>
            
 
                <View style={styles.amountContainer}>
                  <TextInput 
                    placeholder="Title"
                    placeholderTextColor='rgba(60,90,153, 0.5)'
                    returnKeyType="next"
                    style={styles.inputStyle}
                    onChangeText={(title) => this.updateTitle(title)}/>
                </View>
                <View style={styles.amountContainerD}>
                  <TextInput 
                    placeholder="Post"
                    placeholderTextColor='rgba(60,90,153, 0.5)'
                    returnKeyType="next"
                    numberOfLines={7}
                    multiline={true}
                    style={styles.inputStyle}
                    onChangeText={(post) => this.updatePost(post)}/>
                </View>
 
            <View style={styles.btnView}>
 
              <View style={styles.btnView}>

              <TouchableOpacity 
                  onPress={this._pickImage}
                  style={styles.mediaContainer}
                  >
                <Text style={styles.textStyle}>Click to add Media</Text>
              </TouchableOpacity>
            
            </View>

            <View style={{ height: 100, width:'100%', margin: 5 }}>
              {image &&
                <ScrollView horizontal={true}>
                {this.state.buffer.map(item => 
                  <Image source={{ uri: item.uri }} style={{ width: 100, height: 80, margin: 10 }} />
                  )}
                </ScrollView>
                  }
            </View>
            

            <View style={styles.btnView}>

              <TouchableOpacity 
                  style={styles.amountContainerB}
                  onPress={() => this.submit()}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Finish</Text>
              </TouchableOpacity>
            
            </View>

            {this.state.isLoading && (
              <View style={styles.loadingView}>
              <View style={styles.loading}>
                <LottieView source={require('./animation/Plane.json')} autoPlay loop/>
              </View>
            </View>
            )}


            {this.state.message.error_message && (
                <Text style={styles.error_message}>Control failed: {this.state.message.error_message}</Text>
            )}

            {this.state.message.code && (
              this.props.navigation.navigate('Thread', {thread_id: this.state.message.code})
            )}
            

            </View>
 
            <View style={styles.signatureView}>
                   <Text style={styles.signature}>A Gregs Production</Text>
             </View>
 
          </View>
 
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
  categoryView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 70,
  },
  category: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#01579b',
    borderWidth: 2,
    borderStyle:'solid',

  },
  amountContainer: {
    backgroundColor: 'white',
    margin: 5,
    alignItems: 'center',
    width: 200,
    height: 50,
    padding: 5,
    borderRadius: 25,
    borderColor: '#01579b',
    borderWidth: 2,
    borderStyle:'solid',
  },
  amountContainerD: {
    backgroundColor: 'white',
    margin: 5,
    width: 200,
    height: 150,
    padding: 5,
    borderRadius: 25,
    borderColor: '#01579b',
    borderWidth: 2,
    borderStyle:'solid',
  },
  amountContainerC: {
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
  amountContainerCC: {
    backgroundColor: 'white',
    margin: 5,
    width: 150,
    height: 50,
    padding: 5,
    alignItems: 'center',
    borderRadius: 25,
    borderColor: '#01579b',
    borderWidth: 2,
    borderStyle:'solid',
  },
  textStyle: {
    color: '#01579b',
    fontSize: 20,
    fontWeight: 'bold'
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center'
  },
  textStyleB: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  textStyleC: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold'
  },
  headerTextStyle: {
    color: 'white',
    fontSize: 35,
    fontWeight: '200'
  },
  inputStyle: {
    color: '#01579b',
    fontSize: 15,
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
  loadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
},
mediaContainer: {
    backgroundColor: 'white',
    margin: 10,
    width: 200,
    height: 70,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: '#01579b',
    borderWidth: 2,
    borderStyle:'dotted',
  },
  textStyle: {
    color: '#01579b',
    fontSize: 20,
    fontWeight: 'bold'
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
})