import React from 'react';
import { Animated, StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Alert, Platform, Image, Picker, Keyboard, Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import NavigationService from '../services/NavigationService';


export default class RentScreen extends React.Component {

  constructor() {
    super();
    //this.ref = firebase.firestore().collection('items');
    //this.authSubscription = null;
  }

  static navigatorStyle = { navBarHidden: true };

  state = {
    condition: 'poor',
    items: [{value: 'Poor', key: 'poor', label: 'Poor'}, {value: 'Fair', key: 'fair', label: 'Fair'}, {value: 'Good', key: 'good', label: 'Good'}, {value: 'New', key: 'new', label: 'New'}]
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
                  key: null,
                  actions: [NavigationActions.navigate({ routeName: 'OpenCamera' })],
                }));

                //NavigationService.navigate('Home');
              }}
            />
          </View>
          <View style={{width: Dimensions.get('window').width, backgroundColor: '#e6fffe', justifyContent: 'center', alignItems: 'center', paddingBottom: 10, borderBottomColor: '#6de3dc', borderBottomWidth: 1}}>
            <Image
              source={{uri: base64Image}}
              style={{height: 180, width: 180, marginTop: Platform.OS === 'ios' ? 30 : 10, borderColor: '#6de3dc', borderWidth: 2, borderRadius: 4}}
            />
          </View>
          <View style={styles.small_container}>
            <Text style={{marginBottom: 5}}>Item Name:</Text>
            <TextInput
              style={{height: 40, width: 180, borderColor: 'gray', borderWidth: 1, backgroundColor: '#ffffff', paddingLeft: 5, borderRadius: 4}}
              onChangeText={(text) => this.setState({item_name: text})}
              value={this.state.item_name}
              placeholder="ex. rowboat"
            />
          </View>
          <View style={{paddingBottom: 1}, styles.small_container}>
            <Text style={{marginBottom: 5}}>Item Description:</Text>
            <TextInput
              style={{width: 180, height: 60, borderColor: 'gray', borderWidth: 1, backgroundColor: '#ffffff', paddingLeft: 5, borderRadius: 4}}
              onChangeText={(text) => this.setState({item_description: text})}
              value={this.state.item_description}
              placeholder="ex. 10 feet long"
              multiline = {true}
              numberOfLines = {2}
            />
          </View>
          <View style={styles.small_container}>
            <Text style={{marginBottom: 5}}>Condition:</Text>
            <RNPickerSelect
              placeholder={{
                  label: 'Select',
                  value: null,
              }}
              items={this.state.items}
              onValueChange={(value) => {
                  this.setState({
                      condtion: value,
                  });
              }}
              style={{ ...pickerSelectStyles }}
              selectedValue={this.state.condition}
            />
          </View>
          <View style={styles.small_container}>
            <Text style={{marginBottom: 5}}>Price (per day):</Text>
            <TextInput
              style={{width: 180, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: '#ffffff', paddingLeft: 5, borderRadius: 4}}
              onChangeText={(text) => this.setState({price: text})}
              value={this.state.price}
              placeholder="ex. 20"
            />
          </View>
          <View style={{borderRadius: 8,
                        borderWidth: 1,
                        borderColor: '#6de3dc',
                        backgroundColor: '#6de3dc',
                      }}
          >
            <TouchableOpacity
              style = {styles.submitTouch}
              onPress={() => {}}
            >
              <Text style = {styles.submitText}>SUBMIT</Text>
            </TouchableOpacity>
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
      paddingBottom: Platform.OS === 'ios' ? 15 : 6,
   },
   small_container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      width: 180
   },
   submitText: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#6de3dc',
    color: 'white',
    fontWeight: '700',
   },
   submitTouch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    height: 40,
   }

})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 9,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
        width: 180
    },
});
