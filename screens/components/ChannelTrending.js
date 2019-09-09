import * as React from 'react';
import { View, Text, Animated, FlatList, StyleSheet } from 'react-native';
import ChannelT from './ChannelT'



const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const CONTACTS = [
  { item: ChannelT, code: 1 }
];

export default class ChannelTrending extends React.Component {
  _renderItem = ({ item }) => (
    <item.item navigation = {this.props.navigation} firstname={this.props.firstname} lastname={this.props.lastname}/>
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
