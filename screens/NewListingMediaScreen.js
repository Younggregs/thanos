import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import { Icon } from 'native-base'
import { ImagePicker } from 'expo'
import { HeaderText } from '../components/StyledText'
import { _retrieveData } from './components/async_data/Async'
import { ScrollView } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';



export default class NewListingMediaScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
   image: null,
   isLoading: false,
   upload_to_shop: false,
   message: {},
   buffer: []
  }


  _product_name(name){
    return name.length
  }


  async alertIfRemoteNotificationsDisabledAsync() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Hi! You have to enable access for camera and photos for iwansell to proceed.');
    }
  }


async submit(){

  this.setState({ isLoading: true})
  this.alertIfRemoteNotificationsDisabledAsync()

    const { navigation } = this.props;
    const account_id = navigation.getParam('account_id', 2)
    const category = navigation.getParam('category_id', 2)
    const product_name = navigation.getParam('product_name', 'product name')
    const description = navigation.getParam('description','product description')
    const budget = navigation.getParam('budget', 'budget')
    
  var formData = new FormData()
  formData.append('category', category)
  formData.append('product_name', product_name)
  formData.append('description', description)
  formData.append('budget', budget)

  for (var file of this.state.buffer) {
    formData.append('files', {uri: file.uri, name: file.name, type: file.type});
  }

  

  try {
    const res = await fetch('https://www.iwansell.com/api/new_listing/' + account_id + '/', {
     body : formData,
     method: 'POST',
     header: {
      'content-type': 'multipart/form-data',
    },
    })
    const message = await res.json();
      this.setState({
        message
      });

  } catch (e) {
    console.log(e);
  }

  this.setState({ isLoading: false})

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









  render() {

    let { image } = this.state;

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
            <HeaderText style={{ color: 'white', flex: 9}}>Upload Product Images</HeaderText>
          </View>
            

            <View style={styles.btnView}>

              <TouchableOpacity 
                  onPress={this._pickImage}
                  style={styles.mediaContainer}
                  >
                <Text style={styles.textStyle}>Click to add</Text>
              </TouchableOpacity>
            
            </View>

            <View style={{ height: 120, width:'100%', margin: 5 }}>
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
                  style={styles.amountContainer}
                  onPress={() => this.submit()}>
                <Text style={styles.textStyleB}>Finish</Text>
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
              this.props.navigation.navigate('Listing', {product_id: this.state.message.code})
            )}
            

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
  mediaContainer: {
    backgroundColor: 'white',
    margin: 10,
    width: 200,
    height: 200,
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
    marginTop: 30
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
error_message: {
  textAlign: 'center',
  fontWeight: 'bold',
  color: 'red',
  fontSize: 15

}
})