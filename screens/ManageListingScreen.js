import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { _retrieveData } from './components/async_data/Async'
import LottieView from 'lottie-react-native';
import About from './components/About'
import { Container, Header, Body, Icon, Left, Right } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';



export default class ManageListingScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  state = {
    productList : [],
    isLoading: false,
  }


  async componentWillMount() {

    this.setState({ isLoading: true })

    const auth = await _retrieveData('auth_code')

      try {
        const res = await fetch('https://www.iwansell.com/api/listing_product/', {
          headers : {
            'Authorization' : 'Token ' + auth,
          },
        });
        const productList = await res.json();
        this.setState({
          productList
        });
      } catch (e) {
        console.log(e);
      }

      this.setState({ isLoading: false })
  }


  emptyResult(){

    var empty_set = false

    if(this.state.productList.length <= 0 ){
      empty_set = true
    }

    return empty_set


  }


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

         {this.state.isLoading ? (
          <View style={styles.loadingView}>
          <View style={styles.loading}>
                <LottieView source={require('./animation/Plane.json')} autoPlay loop/>
          </View>
          </View>
        ) : (
          <View>
            {this.emptyResult() ? (
              <Text>Its empty here, what you waiting for? start uploading!</Text>
            ) : (
              <View>
                {this.state.productList.map(item => (
                  <Text>{item.title}</Text>
                ))}
            <About/>
            </View>
            
          )}

        </View>
        )}
         
         
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
      marginTop: 25,
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
