import React from 'react';
import { StyleSheet, Text, View, Alert, Permissions, Linking, TouchableOpacity, Platform, ImageStore, Dimensions } from 'react-native';
import { createStackNavigator, NavigationActions, StackActions } from 'react-navigation';

import LoginNavigator from './LoginNavigator';

export default class LoginScreenNavigator extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

    this._sub = this.props.navigation.addListener(
      'didFocus',
      () => {
        /*if(this.props.navigation.getParam('param', '') === 'RentTab') {
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
        else if(this.props.navigation.getParam('data', '') != '') {
          console.log('CameraNavigator picked didFocus up:', this.props.navigation.getParam('data', ''));

          /*this.navigator && this.navigator.dispatch(
            NavigationActions.navigate({
              routeName: 'Home',
            })
          );*/

          //this.props.navigation.state.params = null;
      }
    );

    this._sub2 = this.props.navigation.addListener(
      'didBlur',
      payload => {
        console.debug('didBlur', payload);
        /*if(payload.action.routeName != 'Home') {
          console.log("DID BLUR");*/
          /*this.navigator.dispatch(StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'OpenCamera'})]
          }));*/
        //}
      }
    );
  }

  componentWillUnmount() {
    this._sub.remove();
    this._sub2.remove();
    //this.authSubscription();
  }
  
  render() {
    return (
      <LoginNavigator 
        screenProps={{ rootNavigation: this.props.navigation }} 
        ref={nav => { this.navigator = nav; }}
      />
    )
  }
};