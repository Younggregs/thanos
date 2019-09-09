import React from 'react'
import { View, Text } from 'react-native'
import moment from 'moment'


export default class FormatDate extends React.Component {
  constructor() {
    super();

    this.state = {
        date: null
    };
  }

  formatDate(date){
    
    var magic_var = moment(date).startOf('hour').fromNow();
    var magic_list = magic_var.split(" ")

    var magic = magic_list[0]
    
    this.state.date = moment(date).startOf('hour').fromNow();

    if( magic >= 24){
      this.state.date = moment(date).startOf('day').fromNow();
    }
    
  }


  render() {
    return (
      <View>
          {this.formatDate(this.props.date)}
          <Text style={{ color: 'gray', fontStyle: 'italic'}}>{this.state.date}</Text>
      </View>
    );
  }
}