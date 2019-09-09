import React from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { _retrieveData } from './async_data/Async'



export default class CampusName extends React.Component {

  state = {
      market: []
  }

  async componentWillMount(){

    const campus = await _retrieveData('market')
    const market = campus.split("")

    this.setState({ market: market })
    this.forceUpdate()

  }


  render() {
    return (
        <View style={styles.container}>
   
            {this.state.market.map(item =>(
            <View style={styles.item}>
                <Text style={styles.textStyle}>{item}</Text>
            </View>
            ))}
        </View>
    )
  }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 15
    },
    item: {
        height: 36,
        width: 36,
        borderRadius: 18,
        backgroundColor: '#01579b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        color: 'white', 
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})