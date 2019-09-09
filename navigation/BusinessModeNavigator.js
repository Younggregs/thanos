import { createStackNavigator, } from 'react-navigation';

import BusinessModeScreen from '../screens/BusinessModeScreen'
import ProductValuationScreen from '../screens/ProductValuationScreen'
import TopSearchScreen from '../screens/TopSearchScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import TopSoldScreen from '../screens/TopSoldScreen'
import LeastSoldScreen from '../screens/LeastSoldScreen'
import TopForSellScreen from '../screens/TopForSellScreen'
import LeastForSellScreen from '../screens/LeastForSellScreen'



const BusinessModeStack = createStackNavigator({
    BusinessMode: BusinessModeScreen,
});

const ProductValuationStack = createStackNavigator({
  ProductValuation: ProductValuationScreen,
});

const TopSearchStack = createStackNavigator({
  TopSearch: TopSearchScreen,
});

const NotFoundStack = createStackNavigator({
  NotFound: NotFoundScreen,
});

const TopSoldStack = createStackNavigator({
  TopSold: TopSoldScreen,
});

const LeastSoldStack = createStackNavigator({
  LeastSold: LeastSoldScreen,
});

const TopForSellStack = createStackNavigator({
  TopForSell: TopForSellScreen,
});

const LeastForSellStack = createStackNavigator({
  LeastForSell: LeastForSellScreen,
});


export default createStackNavigator({
  BusinessModeStack,
  ProductValuationStack,
  TopSearchStack,
  NotFoundStack,
  TopSoldStack,
  LeastSoldStack,
  TopForSellStack,
  LeastForSellStack
},
{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
});
