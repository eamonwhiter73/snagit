import React from 'react';
import { StyleSheet, Text, View, Alert, Permissions, Linking, TouchableOpacity, Platform, ImageStore, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import RentScreenNavigator from './RentScreenNavigator';
import RentScreen from '../pages/RentScreen';
import CameraScreen from '../pages/CameraScreen';

export default CameraNavigator = createStackNavigator(
  {
    Rent: {
      screen: CameraScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
    RentDetails: {
      screen: RentScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      }),
    },
  },
  {
    initialRouteName: 'Rent',
  },
);