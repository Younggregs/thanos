import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Picker } from 'react-native';
import LottieView from 'lottie-react-native';
import { HeaderTextL } from '../components/StyledText'
import { _storeCampus } from './components/async_data/Async'


export default class FenceScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };


  state = {
    isLoading: false,
    statement: [],
    campuslist: [],
    campus: 1, 
    nextScreen: false
  }


  async componentWillMount() {

    this.setState({ isLoading: true})
   
    try {
      const res = await fetch('https://www.iwansell.com/api/campus/');
      const campuslist = await res.json();
      this.setState({
        campuslist
      });
      
    } catch (e) {
      console.log(e)
  }
  this.setState({ isLoading: false })

}


async setCampus(){
    var market = await _storeCampus(this.state.campus)
    this.setState({ nextScreen: true })
    alert('Welcome to iwansell ' + market + ' campus marketplace')

}


  render() {
    return (
      <View style={styles.bigContainer}>
          <LottieView source={require('./animation/bg.json')} autoPlay loop/>
          {this.state.nextScreen && (
              this.props.navigation.navigate('HomeStack')
          )}
      
          <View style={styles.container1}>
            <HeaderTextL style={{ color: 'black'}}>Iwansell</HeaderTextL>
        
        <View style={styles.campusView}>
          <TouchableOpacity>
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#01579b'}}>Select Campus</Text>
           {this.state.isLoading ? (
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

            <View style={styles.btnView}>

              <TouchableOpacity 
                  style={styles.amountContainerB}
                  onPress={() => this.setCampus()}>
                <Text style={styles.textStyleB}>Continue</Text>
              </TouchableOpacity>

            </View>
        
        </View>
        <View style={styles.container}>
            <View style={styles.optionsView}>

              <View>
                <TouchableOpacity style={styles.footer} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.options}> Log In </Text>
                </TouchableOpacity>
                  
                <TouchableOpacity style={styles.footer} onPress={() => this.props.navigation.navigate('Signup')}>
                    <Text style={styles.options}> Create Account </Text>
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
  container1: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    backgroundColor: 'white'
  },
  container: {
    flex: 2,
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
    fontSize: 20,
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