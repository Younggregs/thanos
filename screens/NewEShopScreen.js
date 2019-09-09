import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Picker} from 'react-native';
import LottieView from 'lottie-react-native';
import { Icon } from 'native-base'
import { TextInput } from 'react-native-gesture-handler';
import { HeaderText } from '../components/StyledText'


export default class NewEShopScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    show: false,
    message: {},
    categorylist: [],
    category_id: null,
    eshop_name: null,
    about: null,
    isLoading: false,
    isLoading2: false
  }


  async componentDidMount() {
    this.setState({ isLoading: true })
    try {
      const res = await fetch('https://www.iwansell.com/api/category/');
      const categorylist = await res.json();
      this.setState({
        categorylist
      });
    } catch (e) {
      console.log(e);
    }

    this.setState({ isLoading: false })

  }








  updateName(name){
    this.setState({ eshop_name: name })
  }

  updateAbout(about){
    this.setState({ about: about })
  }





  async newEShop(){

    this.setState({ isLoading2: true })
    var formData = new FormData()

    formData.append('category', this.state.category)
    formData.append('eshop_name', this.state.eshop_name)
    formData.append('about', this.state. about)


    const auth = await _retrieveData('auth_code')

    try {
      const res = await fetch('https://www.iwansell.com/api/new_eshop/', {

      body: formData,
      method: 'POST',
      headers : {
        'Authorization' : 'Token ' + auth,

      },

      });
      const statement = await res.json();
      this.setState({
        statement
      });
      console.log('console log :' + this.state.statement.code)

    } catch (e) {
      console.log(e);
    }

    this.setState({ isLoading2: false })

}





  render() {
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
            <HeaderText style={{ color: 'white', flex: 9 }}>Rent an eShop</HeaderText>
          </View>
            
 
            <View>
            <View style={styles.categoryView}>
          <TouchableOpacity style={styles.category}>
            <Text style={styles.textStyleC}>Select Category</Text>
           {this.state.isLoading ? (
              <View style={styles.loadingView}>
              <View style={styles.loading}>
                <LottieView source={require('./animation/Plane.json')} autoPlay loop/>
              </View>
            </View>
          ) : (
          <Picker
              selectedValue={this.state.category_id}
              prompt="Select Category"
              style={{ height: 50, width: 200, alignText:'center' }}
              onValueChange={(itemValue, itemIndex) => this.setState({category_id: itemValue})}>
              {this.state.categorylist.map(item => 
                  <Picker.Item label={item.name} value={item.id} />
              )}
          </Picker>
          )}
          </TouchableOpacity>
          </View>
 
 
                <View style={styles.amountContainer}>
                  <TextInput 
                    placeholder="eShop Name"
                    placeholderTextColor='rgba(60,90,153, 0.5)'
                    returnKeyType="next"
                    style={styles.inputStyle}
                    onChangeText={(name) => this.updateName(name)}/>
                </View>
                <View style={styles.amountContainerD}>
                  <TextInput 
                    placeholder="About"
                    placeholderTextColor='rgba(60,90,153, 0.5)'
                    returnKeyType="next"
                    numberOfLines={7}
                    multiline={true}
                    style={styles.inputStyle}
                    onChangeText={(about) => this.updateAbout(about)}/>
                </View>
            </View>
 
            <View style={styles.btnView}>
 
              <TouchableOpacity 
                  style={styles.amountContainerB}
                  onPress={() => this.newEShop()}
                  >
                <Text style={styles.textStyleB}>Submit</Text>
              </TouchableOpacity>
              
            </View>

            {this.state.isLoading2 && (
              <View style={styles.loadingView}>
              <View style={styles.loading}>
                <LottieView source={require('./animation/Plane.json')} autoPlay loop/>
              </View>
            </View>
            )}


            {this.state.message.error_message && (
                <Text style={styles.error_message}>{this.state.message.error_message}</Text>
            )}

            {this.state.message.code && (
              this.props.navigation.navigate('EShopDisplay', {eshop_id: this.state.message.code})
            )}
 
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
  amountContainerD: {
    backgroundColor: 'white',
    margin: 10,
    width: 200,
    height: 150,
    padding: 5,
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
textStyleB: {
  color: 'white',
  fontSize: 20,
  fontWeight: 'bold'
},
})