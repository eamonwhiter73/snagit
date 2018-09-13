import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import { YellowBox } from 'react-native';

import HomeScreen from './pages/HomeScreen';
import ProfileScreen from './pages/ProfileScreen';
//import CameraScreen from './pages/CameraScreen';
import CameraScreenNavigator from './components/CameraScreenNavigator';
//import RentScreenNavigator from './components/RentScreenNavigator';

YellowBox.ignoreWarnings(['Class RCTCxxModule']);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['You should only render one navigator explicitly in your app, and other navigators should by rendered by including them in that navigator.']);

const AppNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
    Rent: CameraScreenNavigator,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Profile') {
          iconName = 'user';
        } else if (routeName === 'Rent') {
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
  },
);

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator/>
    )
  }
}