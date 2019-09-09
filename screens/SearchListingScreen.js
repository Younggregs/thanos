import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import ListingProduct from './components/ListingProduct'
import { Container, Header, Left, Tab, Tabs, Icon } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';


export default class SearchListingScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  state = {
    search_phrase: 'phone',
    renderScreen: false,
  }

  updateSearchPhrase(search_phrase){
    this.setState({ search_phrase: search_phrase })
  }
  

  
  render() {
    return (
      <Container>
        <Header style={styles.headerStyle} hasTabs> 
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
           <View style={styles.inputViewStyle}>
               <TextInput 
                    placeholder="Search Listing"
                    placeholderTextColor='rgba(0,0,255, 0.5)'
                    returnKeyType="search"
                    style={styles.inputStyle}
                    onChangeText={(search_phrase) => this.updateSearchPhrase(search_phrase)}
                    onSubmitEditing={() => this.setState({ renderScreen: true})}/>
            </View>
        </Header>

      {this.state.renderScreen && (
            <ListingProduct
            navigation = {this.props.navigation}
            search_phrase={this.state.search_phrase} campus_id = {1}/>
      )}
        
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerStyle: {
    paddingTop: 20,
    height: 80,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  inputStyle: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold'
  },
  inputViewStyle: {
    backgroundColor: 'white',
    margin: 10,
    width: 300,
    height: 40,
    padding: 5,
    alignItems: 'center',
    borderRadius: 25,
    borderColor: '#01579b',
    borderWidth: 2,
    borderStyle:'solid',
  }
});
