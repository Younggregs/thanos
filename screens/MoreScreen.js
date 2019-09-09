import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import { Container, Header, Body, Right, Icon, ActionSheet, Left } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';
import { HeaderTextL } from '../components/StyledText'
import { login } from './components/async_data/Auth'
import { _retrieveData } from './components/async_data/Async'
import { HeaderText } from '../components/StyledText'


var BUTTONS = [
  { text: "Profile", icon: "contact", iconColor: "#25de5b", route: "Profile" },
  { text: "Upload Product", icon: "cart", iconColor: "#8c1ef4", route: "NewProduct" },
  { text: "Business Mode", icon: "analytics", iconColor: "#2c8ef4", route: "BusinessMode" },
  { text: "Rent eShop", icon: "home", iconColor: "#6c3ef4", route: "NewEShop"},
  { text: "About", icon: "bulb", iconColor: "#ea943b", route: "About" },
  { text: "Contact Us", icon: "chatboxes", iconColor: "#fa213b", route: "Contact" },
  { text: "Logout", icon: "contact", iconColor: "#25de5b", route: "Logout"},
  { text: "Cancel", icon: "close", iconColor: "#10de9b", route: ""}
];

var BUTTONS_NL = [
  { text: "Profile", icon: "contact", iconColor: "#25de5b", route: "Login" },
  { text: "Upload Product", icon: "cart", iconColor: "#8c1ef4", route: "Login" },
  { text: "Business Mode", icon: "analytics", iconColor: "#2c8ef4", route: "Login" },
  { text: "Rent eShop", icon: "home", iconColor: "#6c3ef4", route: "Login"},
  { text: "About", icon: "bulb", iconColor: "#ea943b", route: "About" },
  { text: "Contact Us", icon: "chatboxes", iconColor: "#fa213b", route: "Contact" },
  { text: "Logout", icon: "contact", iconColor: "#25de5b", route: "Logout"},
  { text: "Cancel", icon: "close", iconColor: "#10de9b", route: ""}
];

var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 7;


export default class MenuScreen extends React.Component {

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
    auth: false
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
    const auth = await _retrieveData('auth_code')

    if(auth.toString().length >= 10){
      this.setState({ auth: true})
    }else{
      this.setState({ auth: false})
    }
   
  }

  render() {
    return (
      <Container>
      <LottieView source={require('./animation/bg.json')} autoPlay loop/>
      <Header style={styles.headerStyle}>
          <Body>
            <View style={styles.brandStyle}>

           <View style={styles.inputViewStyle}>
              <HeaderText>Iwansell</HeaderText>
            </View>

            <TouchableOpacity
             style={styles.iconStyle}
             onPress={() => this.props.navigation.navigate('Search')}>
                <Icon name='search'/>
            </TouchableOpacity>
            
            </View>

          </Body>
          <Right>
            <TouchableOpacity
              onPress={() =>
              ActionSheet.show(
                {
                  options: this.state.auth ? BUTTONS : BUTTONS_NL,
                  cancelButtonIndex: CANCEL_INDEX,
                  destructiveButtonIndex: DESTRUCTIVE_INDEX,
                  title: "More [Scroll Down]"
                },
                buttonIndex => {
                  redirect(this.state.auth ? BUTTONS[buttonIndex] : BUTTONS_NL[buttonIndex])
                }
              )}>
              <Icon name='more' style={{ marginRight: 15 }}/>
            </TouchableOpacity>
          </Right>
        </Header>

      <ScrollView>

          
          <HeaderText style={{ color: 'white', margin: 20}}>More</HeaderText>

          {this.state.auth ? (
            <View>
              <TouchableOpacity
            style={styles.listStyle}
             onPress={() => this.props.navigation.navigate('Profile')}>
              
            <Left>
              <Icon name='person' color='white' style={{ color: 'brown'}}/>
            </Left>

            <Text style={styles.listText}>Account Profile</Text>
           
            <Right>
              <Icon name='arrow-forward' color='white' style={styles.listIcon}/>
            </Right>

            </TouchableOpacity>




          <TouchableOpacity
            style={styles.listStyle}
             onPress={() => this.props.navigation.navigate('NewProduct')}>
              
            <Left>
              <Icon name='cart' color='white' style={{ color: 'cyan'}}/>
            </Left>

            <Text style={styles.listText}>Upload Product</Text>
           
            <Right>
              <Icon name='arrow-forward' color='white' style={styles.listIcon}/>
            </Right>

            </TouchableOpacity>


        
          <TouchableOpacity
            style={styles.listStyle}
             onPress={() => this.props.navigation.navigate('BusinessMode')}>
              
            <Left>
              <Icon name='pulse' color='white' style={{ color: 'blue'}}/>
            </Left>

            <Text style={styles.listText}>Business Mode</Text>
           
            <Right>
              <Icon name='arrow-forward' color='white' style={styles.listIcon}/>
            </Right>

            </TouchableOpacity>

         
          <TouchableOpacity
            style={styles.listStyle}
             onPress={() => this.props.navigation.navigate('NewEShop')}>
              
            <Left>
              <Icon name='home' color='white' style={{ color: 'purple'}}/>
            </Left>

            <Text style={styles.listText}>Rent eShop</Text>
           
            <Right>
              <Icon name='arrow-forward' color='white' style={styles.listIcon}/>
            </Right>

            </TouchableOpacity>
            </View>

          ) : (

            <View>
              <TouchableOpacity
            style={styles.listStyle}
             onPress={() => this.props.navigation.navigate('Profile')}>
              
            <Left>
              <Icon name='person' color='white' style={{ color: 'brown'}}/>
            </Left>

            <Text style={styles.listText}>Log In</Text>
           
            <Right>
              <Icon name='arrow-forward' color='white' style={styles.listIcon}/>
            </Right>

            </TouchableOpacity>




          <TouchableOpacity
            style={styles.listStyle}
             onPress={() => this.props.navigation.navigate('NewProduct')}>
              
            <Left>
              <Icon name='contact' color='white' style={{ color: 'cyan'}}/>
            </Left>

            <Text style={styles.listText}>Create Account</Text>
           
            <Right>
              <Icon name='arrow-forward' color='white' style={styles.listIcon}/>
            </Right>

            </TouchableOpacity>


        
     
            </View>

          )}

          



         

          <TouchableOpacity
            style={styles.listStyle}
             onPress={() => this.props.navigation.navigate('About')}>
              
            <Left>
              <Icon name='bulb' color='white' style={{ color: 'orange'}}/>
            </Left>

            <Text style={styles.listText}>About</Text>
           
            <Right>
              <Icon name='arrow-forward' color='white' style={styles.listIcon}/>
            </Right>

            </TouchableOpacity>



          <TouchableOpacity
            style={styles.listStyle}
             onPress={() => this.props.navigation.navigate('Contact')}>
              
            <Left>
              <Icon name='chatboxes' color='white' style={{ color: 'green'}}/>
            </Left>

            <Text style={styles.listText}>Contact</Text>
           
            <Right>
              <Icon name='arrow-forward' color='white' style={styles.listIcon}/>
            </Right>

            </TouchableOpacity>


          
          <TouchableOpacity
            style={styles.listStyle}
             onPress={() => this.props.navigation.navigate('Logout')}>
              
            <Left>
              <Icon name='close' color='white' style={{ color: 'red'}}/>
            </Left>

            <Text style={styles.listText}>Log out</Text>
           
            <Right>
              <Icon name='arrow-forward' color='white' style={styles.listIcon}/>
            </Right>

            </TouchableOpacity>
         

      </ScrollView>
      </Container>
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
  headerStyle: {
    paddingTop: 20,
    height: 65,
    width: '100%',
    backgroundColor: 'white',
  },
  brandStyle: {
    padding: 5,
    marginLeft: 20,
    width: 200,
    flexDirection: 'row',
  },
  inputStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  iconStyle: {
    marginLeft: 40,
    width: 50,
    paddingTop: 5,
  },
  inputViewStyle: {
   marginLeft: 0,
   paddingLeft: 10,
   width: 200,
  }, 
  listStyle: {
    backgroundColor: 'rgba(60,90,153, 0.32)', 
    height: 70,
    padding: 20,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 9,
    textAlign: 'center',
  },
  listIcon: {
    color: 'white',
    flex: 3
  }
})