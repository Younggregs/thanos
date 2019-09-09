import React from 'react';
import { createStackNavigator, } from 'react-navigation';

import WelcomeScreen from '../screens/WelcomeScreen'

import HomeStack from './HomeNavigator';
import BusinessModeStack from './BusinessModeNavigator'

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen'
import SettingsScreen from '../screens/SettingsScreen';
import PasswordRecoveryScreen from '../screens/PasswordRecoveryScreen';
import AboutScreen from '../screens/AboutScreen'

import ProfileScreen from '../screens/ProfileScreen'
import SearchScreen from '../screens/SearchScreen'
import EShopSearchScreen from '../screens/EShopSearchScreen'
import NewProductScreen from '../screens/NewProductScreen'
import MediaUploadScreen from '../screens/MediaUploadScreen'
import NewEShopScreen from '../screens/NewEShopScreen'
import ProductDisplayScreen from '../screens/ProductDisplayScreen'
import EShopDisplayScreen from '../screens/EShopDisplayScreen'
import CategoryProductScreen from '../screens/CategoryProductScreen'
import RateReviewScreen from '../screens/RateReviewScreen'
import EditProfileScreen from '../screens/EditProfileScreen'
import ContactScreen from '../screens/ContactScreen'
import NewListingScreen from '../screens/NewListingScreen'
import NewListingMediaScreen from '../screens/NewListingMediaScreen'
import ManageListingScreen from '../screens/ManageListingScreen'
import SearchListingScreen from '../screens/SearchListingScreen'
import ThreadScreen from '../screens/ThreadScreen'
import NewThreadScreen from '../screens/NewThreadScreen'
import FenceScreen from '../screens/FenceScreen'
import LogoutScreen from '../screens/LogoutScreen'





const WelcomeStack = createStackNavigator({
  Welcome: WelcomeScreen,
});


const LoginStack = createStackNavigator({
  Login: LoginScreen,
}); 

const SignupStack = createStackNavigator({
  Signup: SignupScreen,
});


const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

const SearchStack = createStackNavigator({
  Search: SearchScreen,
});

const EShopSearchStack = createStackNavigator({
  EShopSearch: EShopSearchScreen,
});

const PasswordRecoveryStack = createStackNavigator({
  PasswordRecovery: PasswordRecoveryScreen,
});

const NewProductStack = createStackNavigator({
  NewProduct: NewProductScreen,
});

const MediaUploadStack = createStackNavigator({
  MediaUpload: MediaUploadScreen,
});

const NewEShopStack = createStackNavigator({
  NewEShop: NewEShopScreen,
});

const ProductDisplayStack = createStackNavigator({
  ProductDisplay: ProductDisplayScreen,
});

const EShopDisplayStack = createStackNavigator({
  EShopDisplay: EShopDisplayScreen,
});

const AboutStack = createStackNavigator({
  About: AboutScreen,
});


const CategoryProductStack = createStackNavigator({
  CategoryProduct: CategoryProductScreen,
});

const RateReviewStack = createStackNavigator({
  RateReview: RateReviewScreen,
});

const EditProfileStack = createStackNavigator({
  EditProfile: EditProfileScreen,
});

const ContactStack = createStackNavigator({
  Contact: ContactScreen,
});

const NewListingStack = createStackNavigator({
  NewListing: NewListingScreen,
});

const NewListingMediaStack = createStackNavigator({
  NewListingMedia: NewListingMediaScreen,
});

const ManageListingStack = createStackNavigator({
  ManageListing: ManageListingScreen,
});

const SearchListingStack = createStackNavigator({
  SearchListing: SearchListingScreen,
});

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

const ThreadStack = createStackNavigator({
  Thread: ThreadScreen
})

const NewThreadStack = createStackNavigator({
  NewThread: NewThreadScreen
})

const FenceStack = createStackNavigator({
  Fence: FenceScreen
})

const LogoutStack = createStackNavigator({
  Logout: LogoutScreen,
});



export default createStackNavigator({
  
  
  WelcomeStack,
  HomeStack,
  NewThreadStack,
  ThreadStack,
  NewListingStack,
  ManageListingStack,
  SearchListingStack,
  SearchStack,
  ProfileStack,
  FenceStack,
  NewListingMediaStack,
  LoginStack,
  BusinessModeStack,
  SignupStack,
  NewProductStack,
  MediaUploadStack,
  EditProfileStack,
  EShopDisplayStack,
  ProductDisplayStack,
  NewEShopStack,
  
  AboutStack,
  EShopSearchStack,
  CategoryProductStack,
  SettingsStack,
  RateReviewStack,
  ContactStack,
  PasswordRecoveryStack,
  LogoutStack,
 
},
{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
});