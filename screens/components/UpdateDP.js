import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import { ImagePicker } from 'expo'
import { _retrieveData } from './async_data/Async'

export default class UpdateDP extends React.Component {;

  state = {
    isLoading: false,
    message : [],
    image: null
  }

  async update(){

    this.setState({ isLoading: true})
    const auth = await _retrieveData('auth_code')

   
    var formData = new FormData()
    let filename = this.state.image.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
  
  
    formData.append('display_pic', {uri: this.state.image, name: filename, type});
  


    try {
      const res = await fetch('https://www.iwansell.com/api/reset_dp/', {

       body : formData,
       method: 'POST',
       credentials: 'same-origin',
       mode: 'cors',
       headers : {
         'Authorization' : 'Token ' + auth,
         'content-type': 'multipart/form-data'
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

}


  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 5],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };









  render() {

    let { image } = this.state;

    return (
      <View style={styles.bigContainer}>
         
        
          <View style={styles.container}>
            <Text style={{ color: '#01579b', fontWeight: 'bold',fontSize: 15}}>Set / Update display picture</Text>

            <View style={styles.btnView}>

              <TouchableOpacity 
                  onPress={this._pickImage}
                  style={styles.mediaContainer}
                  >
                <Text style={styles.textStyle}>Click to add</Text>
              </TouchableOpacity>

              {image &&
                <Image source={{ uri: image }} style={{ width: 100, height: 80 }} />}
              
            </View>

            <View style={styles.btnView}>

              <TouchableOpacity 
                  style={styles.amountContainer}
                  onPress={() => this.update()}>
                <Text style={styles.textStyleB}>Update Dp</Text>
              </TouchableOpacity>
            
            </View>

            {this.state.isLoading && (
              <View style={styles.loadingView}>
              <View style={styles.loading}>
                <LottieView source={require('../animation/Plane.json')} autoPlay loop/>
              </View>
            </View>
            )}


            {this.state.message.error_message && (
                <Text style={styles.error_message}>{this.state.message.error_message}</Text>
            )}

            {this.state.message.code && (
              <Text style={styles.textStyleB}>Success !</Text>
            )}
            

           

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
    height: 70,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
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