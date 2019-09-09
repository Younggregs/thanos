import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator,  createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MarketScreen from '../screens/MarketScreen';
import EShopScreen from '../screens/EShopScreen'
import TVScreen from '../screens/TVScreen'
import ListingScreen from '../screens/ListingScreen'
import MoreScreen from '../screens/MoreScreen'



const MarketStack = createStackNavigator({
  Market: MarketScreen,
});

MarketStack.navigationOptions = {
  tabBarLabel: 'Market',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-cart`
          : 'md-cart'
      }
    />
  ),
};

const EShopStack = createStackNavigator({
  EShop: EShopScreen
});

EShopStack.navigationOptions = {
  tabBarLabel: 'eShops',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
    />
  ),
};


const ListingStack = createStackNavigator({
  Listing: ListingScreen,
});

ListingStack.navigationOptions = {
  tabBarLabel: 'Listing',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-list`
          : 'md-list'
      }
    />
  ),
};



const TVStack = createStackNavigator({
  TV: TVScreen,
});

TVStack.navigationOptions = {
  tabBarLabel: 'TV',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-videocam`
          : 'md-videocam'
      }
    />
  ),
};



const MoreStack = createStackNavigator({
  More: MoreScreen,
});

MoreStack.navigationOptions = {
  tabBarLabel: 'More',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-more`
          : 'md-more'
      }
    />
  ),
};




export default createBottomTabNavigator({
  
  MarketStack,
  EShopStack,
  ListingStack,
  TVStack,
  MoreStack,
  
},
{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  },
  tabBarOptions: {
    activeTintColor: '#01579b',
  }
});
