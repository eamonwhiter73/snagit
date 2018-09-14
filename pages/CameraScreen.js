import React from 'react';
import { RNCamera } from 'react-native-camera';
import { AppState, StyleSheet, Text, View, Alert, Permissions, Linking, TouchableOpacity, Platform, ImageStore, Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import { createStackNavigator, NavigationActions, StackActions } from 'react-navigation';
import NavigationService from '../services/NavigationService';

export default class CameraScreen extends React.Component {

  static navigatorStyle = { navBarHidden: true };

  constructor() {
    super();
    this.state = {
      //response: null,
      //showCamera: true,
    };
    //this.authSubscription = null;
    //this.ref = firebase.firestore().collection('items');
  }

  componentWillMount() {
    /*his.authSubscription = firebase.auth().onAuthStateChanged((user) => {

      if(user) {
        this.setState({
          loading: false,
          user,
        });
      }
    });*/
  }

  componentWillUnmount() {
    this._sub.remove();
  }

  //GET NAVIGATION PROPS HERE SOMEHOW

  componentDidMount() {
    this._sub = this.props.navigation.addListener(
      'didFocus',
      () => {
        if(this.props.navigation.getParam('param', '') === 'fromRentableScreen') {
          NavigationService.navigate('Home')

          this.props.navigation.state.params = null;
        }
      }
    );    
    /*this._sub = this.props.navigation.addListener(
      'didFocus',
      () => {*/
        /*if(this.props.navigation.getParam('param', '') === 'RentTab') {
          console.log('I HEARD YOU');

          this.navigator && this.navigator.dispatch(
            NavigationActions.navigate({
              routeName: 'Rentable',
            })
          );
        }
        else */
        /*}
      }
    );*/
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.2, base64: true };
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri);

      if(Platform.OS === 'android') {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'RentDetails', params: { base64orURI: data.uri } }),  
          ],
        });
        
        this.props.navigation.dispatch(resetAction);
      }
      else {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'RentDetails', params: { base64orURI: data.base64 } }),  
          ],
        });
        
        this.props.navigation.dispatch(resetAction);
      }


      

      /*this.uploadImage(data.uri)
        .then(url => { alert('uploaded'); this.setState({image_uri: url}) })
        .catch(error => console.log(error))*/
    }
  };

  /*uploadImage(uri, mime = 'application/octet-stream') {
    return new Promise((resolve, reject) => {
      const imageRef = firebase.storage().ref('images').child('image_001');

      return imageRef.put(uri, { contentType: mime })
    })
  }*/

  render() {
    //if(this.state.showCamera) {
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            //flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center', backgroundColor: '#e6fffe'}}>
          <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              style = {styles.capture}
          >
              <Text style={{fontSize: 14, fontWeight: '700', color: "#fff"}}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(109, 227, 220, 0.2)'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#6de3dc',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});