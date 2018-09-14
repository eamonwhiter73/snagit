import React from 'react';
import { StyleSheet, Text, View, Alert, Permissions, Linking, TouchableOpacity, Platform, ImageStore, Dimensions } from 'react-native';
import { createStackNavigator, NavigationActions, StackActions } from 'react-navigation';

import CameraNavigator from './CameraNavigator';

export default class CameraScreenNavigator extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    //this.authSubscription();
  }
  
  render() {
    return (
      <CameraNavigator/>
    )
  }
};