import * as React from 'react';
import { View, Text, Animated, FlatList, StyleSheet, Image } from 'react-native';
import Featured1 from './Featured1'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const CONTACTS = [
  { name: 'Campus Name', number: 1 },
  { name: 'Featured1', number: 2 },
  { name: 'Featured2', number: 3 },
  { name: 'Featured3', number: 4 },
  { name: 'Board1', number: 5 },
  { name: 'Featured4', number: 6 },
  { name: 'Categories', number: 7 },
  { name: 'Board4', number: 8 },
  { name: 'Board2', number: 9 },
  { name: 'Board3', number: 10 },
  { name: 'Board4', number: 11 },
  { name: 'Featured5', number: 12 },
  { name: 'Board5', number: 13 },
  { name: 'Board6', number: 14 },
  { name: 'Featured6', number: 15 },
  { name: 'Board7', number: 16 },
  { name: 'Board8', number: 17 },
  { name: 'Footer', number: 18 },
];

export default class Contacts extends React.Component {
  _renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.imageItem}>
            <Image
                source={
                __DEV__
                ? require('./images/galaxy2.jpg')
                : require('./images/galaxy2.jpg')
                }
            style={{ resizeMode:'cover', width: 100, height: 100, borderRadius: 20 }}/>
        </View>
      <View style={styles.avatar}>
        <Text style={styles.letter}>{item.name.slice(0, 1).toUpperCase()}</Text>
      </View>

      <View style={styles.infoView}>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={styles.priceView}>
        <Text style={styles.price}>{item.number}</Text>
      </View>
      </View>
        
      
    </View>
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
  details: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
  },
  price: {
    fontSize: 12,
    color: '#01579b',
    fontWeight: 'bold',
  },
  priceView: {
    flex: 1,
    height: 30,
    width: 80,
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0, 0, 0, .08)',
  },
  imageItem: {
    height: 100,
        width: 100,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        margin: 10,
  }
});
