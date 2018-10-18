import React from 'react';
import { StyleSheet, Text, View, Alert, Permissions, Linking, TouchableOpacity, Platform, ImageStore, Dimensions } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import RentScreen from '../pages/RentScreen';
import LoginScreen from '../pages/LoginScreen';
import RentableScreen from '../pages/RentableScreen';
import OtherUserProfileScreen from '../pages/OtherUserProfileScreen';

import HomeScreen from '../pages/HomeScreen';
import ProfileScreen from '../pages/ProfileScreen';
import LoginScreenNavigator from '../components/LoginScreenNavigator';
import CameraScreenNavigator from '../components/CameraScreenNavigator';

const AppMainNavigator = createBottomTabNavigator(
  {
    Home: { key: 'home', screen: HomeScreen },
    Settings: { key: 'profile', screen: ProfileScreen },
    Share: { key: 'renttab', screen: CameraScreenNavigator },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Settings') {
          iconName = 'settings';
        } else if (routeName === 'Share') {
          iconName = 'plus-square';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <Icon
            name={iconName}
            color={tintColor}
            type='feather'
          />
        )
      }
    }),
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#c9fffd',
      activeBackgroundColor: '#6de3dc',
      inactiveBackgroundColor: '#6de3dc'
    },
    initialRouteName: 'Home'
  },
);

export default LoginNavigator = createStackNavigator(
  {
    Login: {
      key: 'login',
      screen: LoginScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
    Main: {
      key: 'main',
      screen: AppMainNavigator,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    Rentable: {
      key: 'rentable',
      screen: RentableScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
    /*SignUp: {
      key: 'signup',
      screen: RentScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
    Rentable: {
      key: 'rentable',
      screen: RentableScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
    OtherUserProfile: {
      key: 'otheruserprofile',
      screen: OtherUserProfileScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    }*/
  },
  {
    initialRouteName: 'Login',
  },
);