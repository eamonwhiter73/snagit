import React from 'react';
import { Animated, StyleSheet, Text, TextInput, View, ScrollView, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, Alert, Platform, Image, Picker, Keyboard, Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import NavigationService from '../services/NavigationService.js';
import FitImage from 'react-native-fit-image';
import type { RemoteMessage } from 'react-native-firebase';
import InitiateRent from '../components/InitiateRent.js';
import RespondToInquiry from '../components/RespondToInquiry.js';

export default class RentableScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      opacity: 1,
      backgroundColor: '#6de3dc',
      rentButtonBackground: '#6de3dc',
      respondToInquiry: false
      //condition: 'poor',
      //items: [{value: 'Poor', key: 'poor', label: 'Poor'}, {value: 'Fair', key: 'fair', label: 'Fair'}, {value: 'Good', key: 'good', label: 'Good'}, {value: 'New', key: 'new', label: 'New'}]
    };

    //this.ref = firebase.firestore().collection('items');
    //this.authSubscription = null;

    /*this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
        console.log(message);

        // prevent infite look
        if (!message.local_notification) {
          let count = 1;
          let string = '';
          for(date of JSON.parse(message.data.dates)) {

            if(count == JSON.parse(message.data.dates).length)
              string += date;
            else {
              string += date+'\n';
            }

            count++;
          }
          // Process your message as required
          Alert.alert(
            'New Rental Inquiry',
            'Dates Requested:\n\n'+string,
            [
              {text: 'RESPOND', onPress: () => {
                console.log(this._getCurrentRouteName());
              }},
              {text: 'IGNORE', onPress: () => console.log('IGNORE Pressed')},
            ],
            { cancelable: false }
          )
        }
    });*/
    //this.ref = firebase.firestore().collection('items');
    //this.authSubscription = null;
  }

  

  static navigatorStyle = { navBarHidden: true };

  /*componentDidMount() {

    firebase.messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          firebase.messaging().getToken()
            .then(fcmToken => {
              if (fcmToken) {
                // user has a device token
              } else {
                // user doesn't have a device token yet
              } 
            });

          firebase.messaging().subscribeToTopic('all');

          this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
              // Process your token as required
              
          });

          this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
              // Process your message as required
              alert(message);
          });
          // user has permissions
        } else {

          firebase.messaging().requestPermission()
            .then(() => {
              firebase.messaging().getToken()
                .then(fcmToken => {
                  if (fcmToken) {
                    // user has a device token
                  } else {
                    // user doesn't have a device token yet
                  } 
                });

              firebase.messaging().subscribeToTopic('all');

              this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
                  // Process your token as required
                  
              });

              this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
                console.log("message received");
                  // Process your message as required
                  alert(message);
              });
            })
            .catch(error => {
              alert(error);
            });
        } 
      });

    

    // The user is an Object, so they're logged in
    /*if (!this.state.user) {
      const { navigate } = this.props.navigation;

      navigate('LogIn');
    }*/

    
  //}

  componentDidMount() {
    console.log('key for stack navigator:',this.props.navigation.dangerouslyGetParent().state.key);
  };

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
    /*this.onTokenRefreshListener();
    this.messageListener();
    firebase.messaging().unsubscribeFromTopic('all');*/
    //this.authSubscription();
    //this._sub.remove();
  }

  navigateToOtherUserProfile = () => {
    this.setState({opacity: 0.5});
    console.log('image being pressed');
    
    setTimeout(() => {
      this.setState({opacity: 1});

      this.props.navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'OtherUserProfile' })],
      }));
    }, 1)
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
        <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between', /*alignItems: 'center'*/ paddingBottom: 10}}>
          <View style={{flex: 1, backgroundColor: '#e6fffe', position: 'absolute', right: Platform.OS === 'ios' ? -8 : 0, top: Platform.OS === 'ios' ? 0 : 10, justifyContent: 'center', alignItems: 'flex-end', zIndex: 5, borderRadius: 8, borderWidth: 0}}>
            <SimpleLineIcons
              name='close'
              color={this.state.backgroundColor}
              size={40}
              onPress={() => {
                this.setState({backgroundColor: '#94ebe6'});
                const param = this.props.navigation.getParam('param', '');

                setTimeout(() => {
                  this.setState({backgroundColor: '#6de3dc'});

                  //console.log(this.props.navigation.getParam('param', ''));

                  if(param == 'fromOtherUserProfile') {
                    console.log('in param is fromOtherUserProfile');
                    this.props.navigation.goBack();
                  }
                  else {
                    this.props.navigation.navigate('OpenCamera', { param: 'fromRentableScreen'});
                    NavigationService.navigate('Home');
                  }
                }, 1)
                
              }}
              style={{marginRight: 17, marginLeft: 10, marginBottom: 4, marginTop: 14}}
            />
          </View>
          <View style={{flex: 1, height: Dimensions.get('window').height/2, width: Dimensions.get('window').width, backgroundColor: '#e6fffe', justifyContent: 'center', alignItems: 'center', /*borderBottomColor: '#6de3dc', borderBottomWidth: 1,*/ marginTop: Platform.OS === 'ios' ? 10 : 5}}>
            <FitImage
              source={{uri: 'http://snag.eamondev.com/assets/rowboat.png'}}
              style={{height: Dimensions.get('window').height/2, width: Dimensions.get('window').width}}
            />
          </View>
          <InitiateRent
            modalHeight={200}
            modalWidth={200}
          />
          <View style={{flex: 1, flexDirection: 'column', /*flex: 0.4,*/ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fffbf5'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
              <View style={styles.condition_container}>
                <View style={{paddingBottom: 1}, styles.small_container_left}>
                  <Text style={{marginBottom: 0}}>Condition:</Text>
                  <Text style={{color: '#6de3dc', fontWeight: '700', fontSize: 28}}>Fair</Text>
                </View>
                <View style={styles.small_container}>
                  <Text style={{marginBottom: 0}}>Price (per day):</Text>
                  <Text style={{color: '#6de3dc', fontWeight: '700', fontSize: 28}}>$25</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{backgroundColor: 'white'}, styles.description_container}>
            <View style={styles.small_container_description}>
              <Text style={{marginBottom: 5, marginLeft: 10, marginTop: 10, textDecorationLine: 'underline'}}>Description:</Text>
              <Text style={{marginBottom: 10, marginLeft: 10}}>This is a nice rowboat. It is worth $600. This is a long description. This is a nice rowboat. It is worth $600. This is a long description. This is a nice rowboat. It is worth $600. This is a long description. This is a nice rowboat. It is worth $600. This is a long description.</Text>
            </View>
          </View>
          <View style={{flex: 1, /*width: Dimensions.get('window').width,*//*flex: Platform.OS === 'ios' ? 0.68 : 0.58,*/ flexDirection: 'row', backgroundColor: '#e6fffe'}}>
            <View style={{flexDirection: 'column', justifyContent: 'space-between', flex: 1, alignItems: 'center'}}>
              <TouchableWithoutFeedback onPress={() => this.navigateToOtherUserProfile()}>
                <Image
                  source={{uri: 'http://snag.eamondev.com/assets/billythekid2.jpg'}}
                  style={{height: 70, width: 70, marginTop: Platform.OS === 'ios' ? 8 : 5, borderColor: '#6de3dc', borderWidth: 5, borderRadius: 35, marginBottom: 5}}
                  opacity={this.state.opacity}
                />
              </TouchableWithoutFeedback>
              <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, marginBottom: 4}}>
                <Text style={{fontWeight: '700'}}>Eamon White</Text>
              </View>
            </View>
            <View style={{flexDirection: 'column', justifyContent: 'space-between', flex: 1, alignItems: 'center', backgroundColor: '#d8fffd'}}>
              <SimpleLineIcons
                name='location-pin'
                size={70}
                style={{marginTop: Platform.OS === 'ios' ? 6 : 5, marginBottom: 5}}
                color='#6de3dc'
              />
              <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <Text style={{marginTop: Platform.OS === 'ios' ? -8 : 0, fontWeight: '700', marginBottom: 4}}>3.2 mi.</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'column',
      backgroundColor: '#e6fffe',
      paddingTop: 10,
      //flex: 1,
   },
   small_container_left: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      width: Dimensions.get('window').width * 0.5,
      borderRightColor: '#6de3dc',
      borderRightWidth: 1,
      padding: 10,
      backgroundColor: '#fffbf5'
   },
   small_container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      width: Dimensions.get('window').width * 0.5,
      backgroundColor: '#fffbf5'
   },
   small_container_description: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: '#fffbf5',
      flex: 1
   },
   condition_container: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      backgroundColor: '#fffbf5'
   },
   description_container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: '#fffbf5',
      width: Dimensions.get('window').width,
      borderWidth: 1,
      borderColor: '#6de3dc',
      flex: 1
   },

})
