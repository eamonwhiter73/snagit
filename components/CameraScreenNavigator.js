import React from 'react';
import { StyleSheet, Text, View, Alert, Permissions, Linking, TouchableOpacity, Platform, ImageStore, Dimensions } from 'react-native';
import { createStackNavigator, NavigationActions, StackActions } from 'react-navigation';

import CameraNavigator from './CameraNavigator';

export default class CameraScreenNavigator extends React.Component {
  constructor(props) {
    super(props)

    this._sub = this.props.navigation.addListener(
      'didFocus',
      () => {
        if(this.props.navigation.getParam('param', '') === 'RentTab') {
          this.navigator && this.navigator.dispatch(
            NavigationActions.navigate({
              routeName: 'Rentable',
            })
          );

          this.props.navigation.state.params = null;
        }
        else if(this.props.navigation.getParam('param', '') === 'CameraTab') {
          console.log('I HEARD YOU TOO');

          this.navigator && this.navigator.dispatch(
            NavigationActions.navigate({
              routeName: 'Home',
            })
          );

          this.props.navigation.state.params = null;
        }
      }
    );
  }

  componentDidMount() {

  }

  componentWillMount() {

  }

  componentWillUnmount() {
    this._sub.remove();
    //this.authSubscription();
  }
  
  render() {
    return (
      <CameraNavigator 
        screenProps={{ rootNavigation: this.props.navigation }} 
        ref={nav => { this.navigator = nav; }}
      />
    )
  }
};