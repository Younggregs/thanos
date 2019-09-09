import * as React from 'react';
import { View, Text, Animated, FlatList, StyleSheet } from 'react-native';
import CampusName from './CampusName'
import Featured1 from './Featured1'
import Featured2 from './Featured2'
import Featured3 from './Featured3'
import Featured4 from './Featured4'
import Featured5 from './Featured5'
import Featured6 from './Featured6'
import Category from './Category'
import Board from './Board'
import About from './About'



const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const CONTACTS = [
  { key: 1, item: CampusName , code: 0 },
  { key: 2,item: Featured1, code: 0 },
  { key: 3,item: Featured2, code: 0 },
  { key: 4,item: Featured3, code: 0 },
  { key: 5,item: Board, code: 1 },
  { key: 6,item: Featured4, code: 0 },
  { key: 7,item: Category, code: 0 },
  { key: 8,item: Board, code: 2 },
  { key: 9,item: Board, code: 3 },
  { key: 10,item: Featured5, code: 0 },
  { key: 11,item: Board, code: 4 },
  { key: 12,item: Board, code: 5 },
  { key: 13,item: Featured6, code: 0 },
  { key: 14,item: Board, code: 6 },
  { key: 15,item: About, code: 0 },

];

export default class MarketRows extends React.Component {
  _renderItem = ({ item }) => (
    <item.item code={item.code} navigation = {this.props.navigation}/>
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
