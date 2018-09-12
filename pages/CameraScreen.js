import React from 'react';
import { RNCamera } from 'react-native-camera';
import { StyleSheet, Text, View, Alert, Permissions, Linking, TouchableOpacity, Platform } from 'react-native';
import firebase from 'react-native-firebase';
import RNFetchBlob from 'rn-fetch-blob';


// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

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

  componentDidMount() {
    // firebase things?
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
    //this.authSubscription();
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri);

      this.uploadImage(data.uri)
        .then(url => { alert('uploaded'); this.setState({image_uri: url}) })
        .catch(error => console.log(error))
    }
  };

  uploadImage(uri, mime = 'application/octet-stream') {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      let uploadBlob = null;

      const imageRef = firebase.storage().ref('images').child('image_001');

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(uri, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
      })
    })
  }

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
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              style = {styles.capture}
          >
              <Text style={{fontSize: 14}}> SNAP </Text>
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
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});
