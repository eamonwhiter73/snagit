import React from 'react';
import { Animated, StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Alert, Platform, Image, Picker, Keyboard, Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import NavigationService from '../services/NavigationService.js';

export default class RentableScreen extends React.Component {

  constructor() {
    super();
    //this.ref = firebase.firestore().collection('items');
    //this.authSubscription = null;
  }

  static navigatorStyle = { navBarHidden: true };

  state = {
    //condition: 'poor',
    //items: [{value: 'Poor', key: 'poor', label: 'Poor'}, {value: 'Fair', key: 'fair', label: 'Fair'}, {value: 'Good', key: 'good', label: 'Good'}, {value: 'New', key: 'new', label: 'New'}]
  };

  componentDidMount() {
    // The user is an Object, so they're logged in
    /*if (!this.state.user) {
      const { navigate } = this.props.navigation;

      navigate('LogIn');
    }*/

    /*this._sub = this.props.navigation.addListener(
      'didFocus',
      () => {
        if(this.props.navigation.state.params.mode == 'fromEditItem') {
          this.removeInitialItem = true;
        }
        else if(this.props.navigation.state.params.mode == 'fromPrice') {
          Animated.timing(this.state.fadeAnim, {
            toValue: 0.2,
            duration: 1,
          }).start(() => {
            Animated.timing(this.state.fadeAnim, {
              toValue: 1,
              duration: 500,
            }).start();
          });
        }
        else if(this.props.navigation.state.params.mode == 'fromPriceManualSale') {
          Animated.timing(this.state.fadeAnim, {
            toValue: 0.2,
            duration: 1,
          }).start();
        }
      }
    );*/
  }

  componentWillMount() {
    /*this.authSubscription = firebase.auth().onAuthStateChanged((user) => {

      if(user) {
        this.setState({
          loading: false,
          user,
        });
      }
    });*/
  }

  componentWillUnmount() {
    //this.authSubscription();
  }

  render() {
    var base64Image = '';

    if(Platform.OS === 'ios') {
      base64Image = `data:image/png;base64,${this.props.navigation.getParam('base64orURI', '')}`
    }
    else {
      base64Image = this.props.navigation.getParam('base64orURI', '');
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{backgroundColor: '#e6fffe', position: 'absolute', right: Platform.OS === 'ios' ? 15 : 10, top: Platform.OS === 'ios' ? 25 : 10, justifyContent: 'center', alignItems: 'flex-end', zIndex: 5}}>
            <SimpleLineIcons
              name='close'
              color='#6de3dc'
              size={40}
              onPress={() => {
                this.props.navigation.dispatch(StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'Rentable' })],
                }));
              }}
            />
          </View>
          <View style={{width: Dimensions.get('window').width, backgroundColor: '#e6fffe', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 10, borderBottomColor: '#6de3dc', borderBottomWidth: 1}}>
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 0.5}}>
              <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                <Image
                  source={require('../assets/billythekid.jpg')}
                  style={{height: 90, width: 90, marginTop: Platform.OS === 'ios' ? 30 : 10, borderColor: '#6de3dc', borderWidth: 2, borderRadius: 45}}
                />
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
                  <Ionicons
                    name='ios-star'
                    color='#eec400'
                    size={16}
                  />
                  <Ionicons
                    name='ios-star'
                    color='#eec400'
                    size={16}
                  />
                  <Ionicons
                    name='ios-star'
                    color='#eec400'
                    size={16}
                  />
                  <Ionicons
                    name='ios-star'
                    color='#eec400'
                    size={16}
                  />
                  <Ionicons
                    name='ios-star'
                    color='#eec400'
                    size={16}
                  />
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'column', backgroundColor: '#e6fffe', marginTop: Platform.OS === 'ios' ? 30 : 10, flex: 0.55}}>
              <View style={{flexDirection: 'row', flex: 0.5}}>
                <View style={{flex: 0}}>
                  <Text style={{fontSize: 16, fontWeight: '700'}}>
                    eamon.white
                  </Text>
                  <TouchableOpacity
                    style = {styles.submitTouchHeader}
                    onPress={() => {}}
                  >
                    <Text style = {styles.submitText}>CONTACT</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={{backgroundColor: 'white'}, styles.bio_container}>
            <View style={styles.small_container_description}>
              <Text style={{marginBottom: 5, marginLeft: 10, marginTop: 10, textDecorationLine: 'underline'}}>Bio:</Text>
              <Text style={{marginBottom: 10, marginLeft: 10}}>Hi, I like to rent things to make money, hit me up for stuff!.</Text>
            </View>
          </View>
          <View style={{/*width: Dimensions.get('window').width,*/flex: 0.53, flexDirection: 'row', backgroundColor: '#e6fffe'}}>
            <View style={styles.small_container_description}>
              <Text style={{marginBottom: 5, marginLeft: 10, marginTop: 10, textDecorationLine: 'underline'}}>Renting:</Text>
            </View>
          </View>
          <View style={{backgroundColor: 'white'}, styles.description_container}>
            <View style={styles.small_container_description}>
              <Text style={{marginBottom: 5, marginLeft: 10, marginTop: 10, textDecorationLine: 'underline'}}>Past Rentals:</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create ({
   container: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      flex: 1,
   },
   small_container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      width: Dimensions.get('window').width * 0.5
   },
   small_container_header: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      flexDirection: 'row',
      flex: 0.75,
      backgroundColor: 'orange'
   },
   small_container_description: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: 'white',
      flex: 1
   },
   condition_container: {
      flexDirection: 'row',
      /*flex: 1,*/
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
   },
   description_container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: 'white',
      width: Dimensions.get('window').width,
      borderWidth: 1,
      borderColor: '#6de3dc',
      flex: 0.5
   },
   bio_container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: 'white',
      width: Dimensions.get('window').width,
      borderWidth: 1,
      borderColor: '#6de3dc',
      flex: 0.25
   },
   submitText: {
    textAlign: 'center',
    backgroundColor: '#6de3dc',
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
    //paddingHorizontal: 5,
    borderRadius: 4,
    borderWidth: 0,
   },
   submitTouch: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: '#6de3dc'
   },
   submitTouchHeader: {
    flex:1,
    borderRadius: 4,
    borderWidth: 0,
    backgroundColor: '#6de3dc',
    justifyContent: 'center',
    alignItems: 'center'
   }

})
