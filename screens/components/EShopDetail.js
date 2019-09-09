import * as React from 'react';
import { View, Text, TouchableOpacity , Image,  StyleSheet, ScrollView } from 'react-native';
import EShopCategory from './EShopCategory'
import About from './About'
import { AirbnbRating } from 'react-native-ratings';



export default class EShopDetail extends React.Component {

    

  render() {
    return (
        <View style={styles.container}>

          <View style={styles.block}>
             <Text style={styles.eshopTitle}>
                {this.props.eshop_name}
             </Text>
          </View>



           <View style={styles.block}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('RateReview', {eshop_id: this.props.eshop_id})}>
                <AirbnbRating defaultRating={this.props.eshop_rating} isDisabled={true} size={20}/>
                <Text style={styles.link}>Ratings and Reviews</Text>
              </TouchableOpacity>
            </View>
        
        <View style={styles.block}>
            <Text style={styles.heading}>The Boss</Text>
            <View style={styles.profileBlock}>
            <View style={styles.imageItem}>
            
            <Image
                    source={{ uri: 'https://www.iwansell.com/api/media/' + this.props.boss_dp,
                              cache: 'forced-cache',
                    }}
                    resizeMethod="resize"
                    style={{ resizeMode:'cover', width: 50, height: 50, borderRadius: 10 }}/>
            </View>
                <Text style={styles.heading}>{this.props.boss}</Text>
            </View>
        </View>

            <View style={styles.block}>
                <Text style={styles.heading}>About</Text>
                <Text style={styles.description}>{this.props.about}</Text>
            </View>
            
                <EShopCategory eshop_id={this.props.eshop_id} navigation = {this.props.navigation}/>
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
  eshopTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#ff0000',
    textAlign: 'center'
    
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
  },
  link: {
      color: '#01579b',
      fontSize: 15,
      textAlign: 'center'
  }
});