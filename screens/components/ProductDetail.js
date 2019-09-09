import * as React from 'react';
import { View, Text, TouchableOpacity , Image,  StyleSheet, ScrollView } from 'react-native';
import Media from './Media'
import About from './About'



export default class ProductDetail extends React.Component {

  state = {
    dp: 'https://www.iwansell.com/api/media/anon.png'
  }

  componentDidMount(){
    var display_pic = 'https://www.iwansell.com/api/media/' + this.props.display_pic
    this.setState({ dp: display_pic })
  }
    

  render() {
    return (
        <View style={styles.container}>
        
        <View style={styles.block}>
            <Text style={styles.heading}>Seller</Text>
            <View style={styles.profileBlock}>
            <View style={styles.imageItem}>
            
            <Image
               source={{ uri: this.state.dp, cache: 'forced-cache', }}
               resizeMethod="resize"
               style={{ resizeMode:'cover', width: 50, height: 50, borderRadius: 10 }}/>
            </View>
                <Text style={styles.heading}>{this.props.firstname} {this.props.lastname} </Text>
            </View>
        </View>


            <View style={styles.block}>
                <Text style={styles.heading}>Product</Text>
                <Text style={styles.description}>{this.props.product_name}</Text>
            </View>
            <View style={styles.block}>
                <Text style={styles.heading}>Description</Text>
                <Text style={styles.description}>{this.props.description}</Text>
            </View>
            <View style={styles.block}>
                <Text style={styles.heading}>Starting Price</Text>
                <Text style={styles.description}>{this.props.starting_price}</Text>
            </View>
                <Media product_id = {this.props.product_id}/>
            <View style={{ marginTop: 10, marginBottom: 10}}>
                <About/>
            </View>
            
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contactView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contact: {
      backgroundColor: 'green',
      padding: 15,
      borderColor: 'white',
      borderStyle: 'solid',
      borderWidth: 1
  },
  btnText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'baloo-bhai'
  },
  block: {
      backgroundColor: 'whitesmoke',
      borderColor: 'white',
      borderStyle: 'solid',
      borderWidth: 1, 
      padding: 10,
      margin: 10,
  },
  profileBlock: {
    backgroundColor: 'whitesmoke',
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1, 
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 15,
    fontStyle: 'italic',
  },
  description: {
    textAlign: 'center',
    fontSize: 13,
  },
  item: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 8,
    flexDirection: 'row'
  },
  infoView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: '#e91e63',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    color: 'white',
    fontWeight: 'bold',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0, 0, 0, .08)',
  },
  imageItem: {
    height: 50,
        width: 50,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        margin: 10,
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 10,
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
});