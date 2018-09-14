import React from 'react';
import { StyleSheet, Text, View, Alert, Permissions, Linking, TouchableOpacity, Platform, ImageStore, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import RentScreen from '../pages/RentScreen';
import CameraScreen from '../pages/CameraScreen';
import RentableScreen from '../pages/RentableScreen';

export default CameraNavigator = createStackNavigator(
  {
    OpenCamera: {
      key: 'opencamera',
      screen: CameraScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
    RentDetails: {
      key: 'rentdetails',
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
    }
  },
  {
    initialRouteName: 'OpenCamera',
  },
);