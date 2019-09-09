import * as React from 'react';
import { View, Text, Animated, FlatList, StyleSheet } from 'react-native';
import ProductDetail from './ProductDetail'


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const CONTACTS = [
  { item: ProductDetail, code: 1 },
];

export default class ProductDetailList extends React.Component {
  _renderItem = ({ item }) => (
    <item.item
        product_id = {this.props.product_id}
        profile_id = {this.props.profile_id}
        display_pic = {this.props.display_pic}
        firstname = {this.props.firstname} 
        lastname = {this.props.lastname} 
        product_name = {this.props.product_name}
        description = {this.props.description}
        starting_price = {this.props.starting_price}
        />
  );

  _ItemSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <AnimatedFlatList
        data={CONTACTS}
        keyExtractor={(item, i) => String(i)}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._ItemSeparator}
        {...this.props}
      />
    );
  }
}



const styles = StyleSheet.create({
    item: {
      backgroundColor: 'white',
      alignItems: 'center',
      padding: 8,
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
    details: {
      margin: 8,
    },
    name: {
      fontWeight: 'bold',
      fontSize: 14,
      color: 'black',
    },
    number: {
      fontSize: 12,
      color: '#999',
    },
    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: 'rgba(0, 0, 0, .08)',
    },
  });
  