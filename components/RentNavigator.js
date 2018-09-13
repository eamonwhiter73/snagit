import React from 'react';
import { StyleSheet, Text, View, Alert, Permissions, Linking, TouchableOpacity, Platform, ImageStore, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import RentScreen from '../pages/RentScreen';
import CameraScreen from '../pages/CameraScreen';

export default RentNavigator = createStackNavigator(
  {
    RentDetails: {
      screen: RentScreen,

      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
    Rent: {
      screen: CameraScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
  },
  {
    initialRouteName: 'RentDetails',
  },
);