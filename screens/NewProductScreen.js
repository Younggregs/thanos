import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Picker} from 'react-native';
import { Icon } from 'native-base'
import LottieView from 'lottie-react-native';
import { TextInput } from 'react-native-gesture-handler';
import { HeaderText } from '../components/StyledText'
import { _retrieveData } from './components/async_data/Async'


export default class NewProductScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    have_eshop: false,
    account_id: null,
    categorylist: [],
    subcategorylist: [],
    category_id: null,
    subcategory_id: null,
    isLoading: false,
    isLoading2: false,
    product_name: null,
    description: null,
    starting_price: null
  }





  updateProductName(product_name){
    this.setState({ product_name: product_name })
  }

  updateDescription(description){
    this.setState({ description: description })
  }

  updateStartingPrice(starting_price){
    this.setState({ starting_price: starting_price })
  }




  async componentWillMount() {

    this.setState({ isLoading: true})
    
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




    try {
      const res = await fetch('https://www.iwansell.com/api/have_eshop/', {

        headers : {
          'Authorization' : 'Token ' + auth,

        },

      });
      const have_eshop = await res.json();
      this.setState({
        have_eshop
      });
    } catch (e) {
      console.log(e);
    }





    

    try {
      const res = await fetch('https://www.iwansell.com/api/category/');
      const categorylist = await res.json();
      this.setState({
        categorylist
      });
    } catch (e) {
      console.log(e);
    }
    this.setState({ isLoading: false})


  }




  setSubCategory(category_id){
    this.setState({category_id: category_id})
    this.getSubCategory(category_id)
  }



  async getSubCategory(category_id){

    this.setState({ isLoading2: true})
  
    try {
      const res = await fetch('https://www.iwansell.com/api/subcategory/' + category_id);
      const subcategorylist = await res.json();
      this.setState({
        subcategorylist
      });
    } catch (e) {
      console.log(e);
    }
  
    this.setState({ isLoading2: false})
  
  }


  evaluateControl(){
    this.props.navigation.navigate("MediaUpload",{
      account_id: this.state.account_id,
      status: 0,
      category_id: this.state.category_id,
      product_name: this.state.product_name,
      description: this.state.description,
      starting_price: this.state.starting_price
    })
    
  }


  evaluateControlEShop(){
    this.props.navigation.navigate("MediaUpload",{
      account_id: this.state.account_id,
      status: 1,
      category_id: this.state.category_id,
      subcategory_id: this.state.subcategory_id,
      product_name: this.state.product_name,
      description: this.state.description,
      starting_price: this.state.starting_price
    })
    
  }







  render() {
    return (
        <KeyboardAvoidingView 
        style={styles.bigContainer} 
        behavior="padding" 
        keyboardVerticalOffset={-50}
        enabled>
          <LottieView source={require('./animation/bg.json')} autoPlay loop/>
        
        {this.state.have_eshop ? (
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
            <HeaderText style={{ color: 'white', flex: 9 }}>Upload Product to eShop</HeaderText>
          </View>
           

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
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) => this.setSubCategory(itemValue)}>
              {this.state.categorylist.map(item => 
                  <Picker.Item label={item.name} value={item.id} />
              )}
          </Picker>
          )}
          </TouchableOpacity>


          <TouchableOpacity style={styles.category}>
            <Text style={styles.textStyleC}>Select Sub-Category</Text>
           {this.state.isLoading2 ? (
              <View style={styles.loadingView}>
              <View style={styles.loading}>
                <LottieView source={require('./animation/Plane.json')} autoPlay loop/>
              </View>
            </View>
          ) : (
          <Picker
              selectedValue={this.state.subcategory_id}
              style={{ height: 50, width: 200 }}
              prompt="Select Sub-Category"
              onValueChange={(itemValue, itemIndex) => this.setState({subcategory_id: itemValue})}>
              {this.state.subcategorylist.map(item => 
                  <Picker.Item label={item.name} value={item.id} />
              )}
          </Picker>
          )}
          </TouchableOpacity>
          </View>

          <View>
               <View style={styles.amountContainer}>
                 <TextInput 
                   placeholder="Product Name"
                   placeholderTextColor='rgba(60,90,153, 0.5)'
                   returnKeyType="next"
                   style={styles.inputStyle}
                   onChangeText={(product_name) => this.updateProductName(product_name)}/>
               </View>
               <View style={styles.amountContainerD}>
                 <TextInput 
                   placeholder="Description"
                   placeholderTextColor='rgba(60,90,153, 0.5)'
                   returnKeyType="next"
                   multiline={true}
                   style={styles.inputStyle}
                   onChangeText={(description) => this.updateDescription(description)}/>
               </View>
               <View style={styles.amountContainer}>
                 <TextInput 
                   placeholder="Starting Price"
                   placeholderTextColor='rgba(60,90,153, 0.5)'
                   keyboardType="numeric"
                   returnKeyType="done"
                   style={styles.inputStyle}
                   onChangeText={(starting_price) => this.updateStartingPrice(starting_price)}/>
               </View>
           </View>

           <View style={styles.btnView}>

             <TouchableOpacity 
                 style={styles.amountContainerB}
                 onPress={() => this.evaluateControlEShop()}>
               <Text style={styles.textStyleB}>Continue</Text>
             </TouchableOpacity>
             
           </View>

           <View style={styles.signatureView}>
                  <Text style={styles.signature}>A Gregs Production</Text>
            </View>

         </View>
        ) : (
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
            <HeaderText style={{ color: 'white', flex: 9 }}>Upload Product</HeaderText>
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
              style={{ height: 50, width: 200 }}
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
                    placeholder="Product Name"
                    placeholderTextColor='rgba(60,90,153, 0.5)'
                    returnKeyType="next"
                    style={styles.inputStyle}
                    onChangeText={(product_name) => this.updateProductName(product_name)}/>
                </View>
                <View style={styles.amountContainerD}>
                  <TextInput 
                    placeholder="Description"
                    placeholderTextColor='rgba(60,90,153, 0.5)'
                    returnKeyType="next"
                    numberOfLines={7}
                    multiline={true}
                    style={styles.inputStyle}
                    onChangeText={(description) => this.updateDescription(description)}/>
                </View>
                <View style={styles.amountContainer}>
                  <TextInput 
                    placeholder="Starting Price"
                    placeholderTextColor='rgba(60,90,153, 0.5)'
                    keyboardType="numeric"
                    returnKeyType="done"
                    style={styles.inputStyle}
                    onChangeText={(starting_price) => this.updateStartingPrice(starting_price)}/>
                </View>
            </View>
 
            <View style={styles.btnView}>
 
              <TouchableOpacity 
                  style={styles.amountContainerB}
                  onPress={() => this.evaluateControl()}>
                <Text style={styles.textStyleB}>Continue</Text>
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
}
})