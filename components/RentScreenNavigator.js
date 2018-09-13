import React from 'react';
import { StyleSheet, Text, View, Alert, Permissions, Linking, TouchableOpacity, Platform, ImageStore, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import RentNavigator from './RentNavigator';

export default class RentScreenNavigator extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RentNavigator/>
    )
  }
};