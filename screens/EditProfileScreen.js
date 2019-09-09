import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View} from 'react-native';
import { _retrieveData } from './components/async_data/Async'
import UpdateDp from './components/UpdateDP'
import UpdateEmail from './components/UpdateEmail'
import UpdatePassword from './components/UpdatePassword'
import About from './components/About'
import { Container, Header, Body, Icon, Left, Right } from 'native-base';
import { HeaderText } from '../components/StyledText'



export default class EditProfileScreen extends React.Component {

  static navigationOptions = {
    header: null
  };ßßß


  render() {
    return (
      <Container>
        <Header style={styles.headerStyle}>
        <Left>
        <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => this.props.navigation.goBack(null)}>
          <Icon 
            name="arrow-back"
            style={{ color: 'black' }}
            />
          </TouchableOpacity>
          </Left>
          <Body>
              <HeaderText style={{ textAlign: 'left'}}>Edit-Update Profile</HeaderText>
          </Body>
          <Right>
          <TouchableOpacity
             style={styles.iconStyle}
             onPress={() => this.props.navigation.navigate('Search')}>
                <Icon name='search'/>
            </TouchableOpacity>
          </Right>
        </Header>

     <ScrollView style={styles.container}>
         <UpdateDp navigation={this.props.navigation}/>
         <UpdateEmail navigation={this.props.navigation}/>
         <UpdatePassword navigation={this.props.navigation}/>
         <About/>
     </ScrollView>
    
    </Container>
    )
  }
}




const styles = StyleSheet.create({
    headerStyle: {
      paddingTop: 20,
      height: 65,
      width: '100%',
      backgroundColor: 'white',
    },
    iconStyle: {
      marginLeft: 40,
      width: 50,
      paddingTop: 5,
    },
  })
