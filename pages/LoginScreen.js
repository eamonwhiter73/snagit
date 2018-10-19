import React from 'react';
import { TouchableHighlight, FlatList, KeyboardAvoidingView, Animated, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions, Image, Alert, Platform } from 'react-native';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import autobind from 'autobind-decorator';
import FitImage from 'react-native-fit-image';
import { GoogleSignin } from 'react-native-google-signin';
import { NavigationActions, StackActions } from 'react-navigation';


export default class LoginScreen extends React.Component {

  constructor() {
    super();
    //this.ref = firebase.firestore().collection('items');
    //this.authSubscription = null;
    this.state = {
      password: '',
      email: '',
    };
  }

  // Calling this function will open Google for login.
  googleLogin = async () => {
    try {
      // Add any configuration settings here:
      await GoogleSignin.configure();

      const data = await GoogleSignin.signIn();

      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      // login with credential
      const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

      if(currentUser != null) {
        console.info(JSON.stringify(currentUser.user.toJSON()));

        // Add a new document with a generated id.                          //user-user                           //send generated ID and then change to message id in cloud
        let addUserData = firebase.firestore().collection('users').doc(currentUser.user.email);

        // Set the 'capital' field of the city
        addUserData.update({google: currentUser.user.toJSON()}).then(() => {
          const resetAction = StackActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Main' }),  
            ],
          });
          
          this.props.navigation.dispatch(resetAction);
        }).catch((error) => {
          //alert(error);
          addUserData.set({google: currentUser.user.toJSON()}).then(() => {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Main' }),  
              ],
            });
            
            this.props.navigation.dispatch(resetAction);
          }).catch((error) => {
            alert(error);
          });
        });
      }
      else {
        alert("Something went wrong in the googleLogin.");
      }

    } catch (e) {
      console.error(e);
      alert(e);
    }
  }

  // Calling the following function will open the FB login dialogue:
  facebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw new Error('User cancelled request'); // Handle this however fits the flow of your app
      }

      console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

      try {
        // login with credential
        const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

        if(currentUser != null) {
          console.info(JSON.stringify(currentUser.user.toJSON()));

          // Add a new document with a generated id.                          //user-user                           //send generated ID and then change to message id in cloud
          let addUserData = firebase.firestore().collection('users').doc(currentUser.user.email);

          // Set the 'capital' field of the city
          addUserData.update({facebook: currentUser.user.toJSON()}).then(() => {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Main' }),  
              ],
            });
            
            this.props.navigation.dispatch(resetAction);
          }).catch((error) => {
            //alert(error);
            addUserData.set({facebook: currentUser.user.toJSON()}).then(() => {
              const resetAction = StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'Main' }),  
                ],
              });
              
              this.props.navigation.dispatch(resetAction);
            }).catch((error) => {
              alert(error);
            });
          });
          
        }
        else {
          alert("Something went wrong in the facebookLogin.");
        }
      }
      catch (e) {
        alert(e);
      }

    } catch (e) {
      console.error(e);
      alert(e);
    }
  }

  static navigatorStyle = { navBarHidden: true };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user != null) {
        this.props.navigation.navigate('Main');
      }
    })
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
    return (
      <KeyboardAvoidingView behavior="position" enabled>
        <View style={styles.container}>
          <View style={{width: Dimensions.get('window').width, height: 225, backgroundColor: '#e6fffe', justifyContent: 'flex-start', alignItems: 'center'}}>
            <Image
              source={require('../assets/snaglogo.png')/*uri: base64Image*/}
              style={{height: 225, width: 225, marginTop: Platform.OS === 'ios' ? 0 : 0, borderWidth: 0, borderRadius: 2, /*position: 'absolute', left: Dimensions.get('window').width /2 - 90*/}}
            />
          </View>
          <TouchableOpacity style={{backgroundColor: '#e6fffe', alignItems: 'center', paddingTop: 15}}
                onPress={this.facebookLogin.bind(this)}
                >
            <Image
              source={require('../assets/fb-sign-in-button3.png')/*uri: base64Image*/}
              style={{width: 225, marginTop: Platform.OS === 'ios' ? 0 : 0 /*position: 'absolute', left: Dimensions.get('window').width /2 - 90*/}}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor: '#e6fffe', alignItems: 'center', paddingTop: 15}}
                onPress={this.googleLogin.bind(this)}
                >
            <Image
              source={require('../assets/sign-in-button2.png')/*uri: base64Image*/}
              style={{width: 225, marginTop: Platform.OS === 'ios' ? 0 : 0 /*position: 'absolute', left: Dimensions.get('window').width /2 - 90*/}}
            />
          </TouchableOpacity>
          <View style={styles.small_container_username}>
            <Text style={{width: 225, textAlign: 'left', marginBottom: 5, fontWeight: '900', textAlign: 'left', marginTop: 0}}>Email:</Text>
            <TextInput
              style={{height: 40, width: 225, borderColor: 'gray', borderWidth: 1, backgroundColor: '#ffffff', paddingLeft: 5, borderRadius: 2}}
              onChangeText={(text) => this.setState({email: text})}
              value={this.state.email}
              placeholder="ex. user@user.com"
              textContentType='emailAddress'
            />
          </View>
          <View style={{paddingBottom: 1}, styles.small_container}>
            <Text style={{width: 225, textAlign: 'left', marginBottom: 5, fontWeight: '900'}}>Password:</Text>
            <TextInput
              style={{height: 40, width: 225, borderColor: 'gray', borderWidth: 1, backgroundColor: '#ffffff', paddingLeft: 5, borderRadius: 2}}
              onChangeText={(text) => this.setState({password: text})}
              value={this.state.password}
              textContentType='password'
            />
          </View>
          <View style={styles.small_container}>
            <View style={{borderRadius: 2,
                          borderWidth: 0,
                          borderColor: '#6de3dc',
                          backgroundColor: '#1e4683',
                          marginTop: 10,
                        }}
            >
              <TouchableOpacity
                style = {styles.submitTouch}
                onPress={this.submitEdit}
              >
                <Text style = {styles.submitText}>LOGIN / SIGNUP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create ({
   container: {
      backgroundColor: '#e6fffe',
      height: Dimensions.get('window').height,
      paddingTop: 70,
   },
   small_container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e6fffe',
      width: Dimensions.get('window').width,
      marginTop: 5
   },
   small_container_biogreeting: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e6fffe',
      width: Dimensions.get('window').width,
      marginTop: 5
   },
   small_container_username: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e6fffe',
      width: Dimensions.get('window').width,
      paddingTop: 10
   },
   small_container_description: {
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#fffbf5',
      flex: 1
   },
   submitText: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#1e4683',
    color: '#6de3dc',
    fontWeight: '700',
   },
   submitTouch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 225,
    height: Platform.OS === 'ios' ? 40 : 27.5,
   },

   submitTouchBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? 40 : 27.5,
   },

   fitImageWithSize: {
      width: Dimensions.get('window').width/4 - 6.25,
      height: Dimensions.get('window').height/8
   },
})