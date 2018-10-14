import React from 'react';
import { FlatList, KeyboardAvoidingView, Animated, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions, Image, Alert, Platform } from 'react-native';
import firebase from 'react-native-firebase';
import { Icon } from 'react-native-elements';
import autobind from 'autobind-decorator';
import FitImage from 'react-native-fit-image';

export default class ProfileScreen extends React.Component {

  constructor() {
    super();
    //this.ref = firebase.firestore().collection('items');
    //this.authSubscription = null;
    this.state = {
      yPosition: new Animated.Value(0),  // Initial value for opacity: 0
      items: [{uri: 'http://snag.eamondev.com/assets/rowboat.png', key: 'item1', dist: '3.2 mi', condition: 'Fair', rate: '$250'},
              {uri: 'http://snag.eamondev.com/assets/rowboat.png', key: 'item2', dist: '50 mi', condition: 'Fair', rate: '$25'},
              {uri: 'http://snag.eamondev.com/assets/billythekid2.jpg', key: 'item3', dist: '3.2 mi', condition: 'Fair', rate: '$25'},
              {uri: 'http://snag.eamondev.com/assets/rowboat.png', key: 'item4', dist: '3.2 mi', condition: 'Fair', rate: '$25'},
              {uri: 'http://snag.eamondev.com/assets/billythekid2.jpg', key: 'item5', dist: '3.2 mi', condition: 'Fair', rate: '$25'},
              {uri: 'http://snag.eamondev.com/assets/rowboat.png', key: 'item6', dist: '3.2 mi', condition: 'Fair', rate: '$25'},
              {uri: 'http://snag.eamondev.com/assets/rowboat.png', key: 'item7', dist: '3.2 mi', condition: 'Fair', rate: '$25'},
              {uri: 'http://snag.eamondev.com/assets/billythekid2.jpg', key: 'item8', dist: '3.2 mi', condition: 'Fair', rate: '$25'}],
      username: '',
      password: '',
      email: '',
      backgroundColor: '#e6fffe',
      noItems: false
    };
  }

  static navigatorStyle = { navBarHidden: true };

  

  animateUp = () => {
    console.log("animateUp");

    Animated.timing(this.state.yPosition, {
        toValue: -120,
        duration: 300,
    }).start();

    /*Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration: 1,
    }).start();*/
  }

  submitEdit = () => {
    //const { navigate } = this.props.navigation;

    /*Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1,
    }).start();*/

    Animated.timing(this.state.yPosition, {
      toValue: 0,
      duration: 1,
    }).start();

    /*if(this.state.email == "") {
      Alert.alert("Please enter a valid email address, if you do not have an account please select the 'Sign Up' link below");
    }
    else {
      firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password).then(() => {
        navigate('Inventory', { mode: 'fromLogIn' });
      }).catch(err => {
        Alert.alert(err.message);
      });
    }*/
  }

  componentDidMount() {
    console.log('key for stack navigator:',this.props.navigation.dangerouslyGetParent().state.key);

    if(this.state.items.length == 0) {
      this.setState({noItems: true});
    }

    Keyboard.addListener('keyboardWillHide', () => {
      Animated.timing(this.state.yPosition, {
        toValue: 0,
        duration: 1,
      }).start();
    })
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

  @autobind
  navigateToRentable() {
    console.log('in navigateToRentable');

    /*this.props
     .navigation
     .dispatch(
        NavigationActions.navigate({
          key: 'renttab',
          routeName: 'RentTab',
          action: toRentable
        })
     )*/

     this.setState({backgroundColor: '#d8fffd'});

     setTimeout(() => {
      this.props.navigation.dispatch(
        NavigationActions.navigate({
          routeName: 'Rentable',
          params: { param: 'fromOtherUserProfile' },
        })
      );

      this.setState({backgroundColor: '#e6fffe'});
     }, 1)
     /*const { state } = this.props.navigation;
     console.log(state);
     const keyToGoTo = state.routes[2].key

     this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          key: keyToGoTo,
          actions: [
            NavigationActions.navigate({
              routeName: 'Rentable',
            })
          ]
        })
        
      );*/


    /*const navigateAction = NavigationActions.navigate({
      routeName: 'Rent',

      params: {},

      action: NavigationActions.navigate({ routeName: 'Rentable' }),
    });

    this.props.navigation.dispatch(navigateAction);*/
   
    /*this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'Rent',
      action: NavigationActions.navigate({
        routeName: 'Rentable'
      })
    }));
    */
  }

  @autobind
  renderListItems({item, index}) {
    return (
      <TouchableOpacity onPress={this.navigateToRentable}>
        <View style={{
                    flexDirection: 'column',
                    backgroundColor: /*'#e6fffe'*/this.state.backgroundColor,
                    paddingBottom: 5,
                    marginTop: 5,
                    borderColor: '#6de3dc',
                    borderBottomWidth: 2,
                    borderStyle: 'solid',
                    /*marginHorizontal: 10,*/
                    borderRadius: 2,
                    overflow: 'hidden',
                    flex: 0.5,
                    marginLeft: 5
                  }}
        >
          <FitImage
            source={{uri: item.uri}}
            style={styles.fitImageWithSize}
            resizeMethod='resize'
          />
          <View style={{flexDirection: 'row', /*flex: 0, justifyContent: 'center', alignItems: 'center',*/ marginTop: 5}}>
            <View style={{flexDirection: 'column', flex: 0.5, justifyContent: 'space-between'}}>
              <Text style={{textDecorationLine: 'underline', flex: 1, fontSize: 9, fontWeight: '700', marginLeft: 10, textAlign: 'center'}}
                  onPress={() => {}}
              >
                Dist.
              </Text>
              <Text style={{flex: 1, fontSize: 10, fontWeight: '900', marginLeft: 10, textAlign: 'center', color: '#6de3dc'}}
                    onPress={this.navigateToRentable}
              >
                {item.dist}
              </Text>
            </View>
            {/*<View style={{flexDirection: 'column', flex: 0.33, justifyContent: 'space-between'}}>
              <Text style={{textDecorationLine: 'underline', flex: 1, fontSize: 12, fontWeight: '700', textAlign: 'center'}}
                    onPress={this.navigateToRentable}
              >
                Cond.
              </Text>
              <Text style={{flex: 1, fontSize: 14, fontWeight: '900', textAlign: 'center', color: '#6de3dc'}}
                    onPress={this.navigateToRentable}
              >
                {item.condition}
              </Text>
            </View>*/}
            <View style={{flexDirection: 'column', flex: 0.5, justifyContent: 'space-between'}}>
              <Text style={{textDecorationLine: 'underline', flex: 1, fontSize: 9, fontWeight: '700', textAlign: 'center'}}
                    onPress={this.navigateToRentable}
              >
                Rate
              </Text>
              <Text style={{flex: 1, fontSize: 10, fontWeight: '900', textAlign: 'center', color: '#6de3dc'}}
                    onPress={this.navigateToRentable}
              >
                {item.rate}
              </Text>
            </View>
          </View>  
        </View> 
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="position" enabled>
        <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'space-between', flexGrow: 1, alignItems: 'center',}}
        >
          <View style={{alignItems: 'center', backgroundColor: '#fffbf5', flex: 1}}>
            <View style={{backgroundColor: '#e6fffe', position: 'absolute', right: Platform.OS === 'ios' ? 15 : 10, top: Platform.OS === 'ios' ? 25 : 10, justifyContent: 'center', alignItems: 'flex-end', zIndex: 5}}>
              <Icon
                name='mail'
                color='#6de3dc'
                type='feather'
                size={40}
              />
            </View>
            <View style={{paddingTop: 50, width: Dimensions.get('window').width, height: 160, backgroundColor: '#e6fffe', justifyContent: 'center', alignItems: 'center', paddingBottom: 10, borderBottomColor: '#6de3dc', borderBottomWidth: 0}}>
              <Image
                source={require('../assets/billythekid2.jpg')/*uri: base64Image*/}
                style={{height: 180, width: 180, marginTop: Platform.OS === 'ios' ? 30 : 10, borderColor: '#6de3dc', borderWidth: 1, borderRadius: 90, /*position: 'absolute', left: Dimensions.get('window').width /2 - 90*/}}
              />
            </View>
            <View style={styles.small_container_username}>
              <Text style={{width: 225, textAlign: 'left', marginBottom: 5, fontWeight: '900', textAlign: 'left'}}>Username:</Text>
              <TextInput
                style={{height: 40, width: 225, borderColor: 'gray', borderWidth: 1, backgroundColor: '#ffffff', paddingLeft: 5, borderRadius: 2}}
                onChangeText={(text) => this.setState({username: text})}
                value={this.state.username}
                placeholder="ex. user123"
                textContentType='username'
              />
            </View>
            <View style={{paddingBottom: 1}, styles.small_container}>
              <Text style={{width: 225, textAlign: 'left', marginBottom: 5, fontWeight: '900'}}>Email:</Text>
              <TextInput
                style={{height: 40, width: 225, borderColor: 'gray', borderWidth: 1, backgroundColor: '#ffffff', paddingLeft: 5, borderRadius: 2}}
                onChangeText={(text) => this.setState({email: text})}
                value={this.state.email}
                placeholder="ex. user@user.com"
                textContentType='emailAddress'
              />
            </View>
            <View style={styles.small_container}>
                <View style={{borderRadius: 8,
                            borderWidth: 1,
                            borderColor: '#6de3dc',
                            backgroundColor: '#6de3dc',
                            marginTop: 10,
                          }}
              >
                <TouchableOpacity
                  style = {styles.submitTouch}
                  onPress={() => {}}
                >
                  <Text style = {styles.submitText}>CHANGE PASSWORD</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{/*width: Dimensions.get('window').width,*/flex: 0, paddingLeft: 5, paddingRight: 10, flexDirection: 'row', backgroundColor: '#fffbf5', marginBottom: 10}}>
              <View style={styles.small_container_description}>
                <Text style={{marginBottom: 5, marginLeft: 10, fontWeight: '900', marginTop: 10}}>Renting:</Text>
                {(this.state.noItems && ( <Text style={{alignSelf: 'center'}}>No Items</Text> )) || (
                  <View>
                  <MultiSelectList
                    style={{backgroundColor: '#ffe4c4'}}
                    data={this.state.items}
                    renderItem={this.renderListItems}
                    numColumns={4}
                    contentContainerStyle={{}}
                    onEndReachedThreshold={0.5}
                    maxToRenderPerBatch={4}
                    initialNumToRender={4}
                    //ListHeaderComponent={this.renderHeader}
                    getItemLayout={(data, index) => (
                      {length: Dimensions.get('window').height/4, offset: Dimensions.get('window').height/4 * index, index}
                    )}
                    backgroundColor={this.state.backgroundColor}
                    //contentContainerStyle={{backgroundColor: '#1e4683'}}
                  />
                </View>)}
              </View>
            </View>
            <View style={{flex: 1, backgroundColor: '#e6fffe', paddingBottom: 10}}>
              <View style={styles.small_container_biogreeting}>
                <Text style={{width: Dimensions.get('window').width - 20, textAlign: 'left', marginBottom: 5, fontWeight: '900'}}>Bio:</Text>
                <TextInput
                  style={{width: Dimensions.get('window').width - 20, height: 60, borderColor: 'gray', borderWidth: 1, backgroundColor: '#ffffff', paddingLeft: 5, borderRadius: 2}}
                  onChangeText={(text) => this.setState({bio: text})}
                  value={this.state.bio}
                  placeholder="ex. I am a farmer."
                  multiline = {true}
                  numberOfLines = {2}
                  onFocus={this.animateUp}
                />
              </View>
              <View style={styles.small_container_biogreeting}>
                <Text style={{width: Dimensions.get('window').width - 20, textAlign: 'left', marginBottom: 5, fontWeight: '900'}}>Standard Greeting:</Text>
                <TextInput
                  style={{width: Dimensions.get('window').width - 20, height: 60, borderColor: 'gray', borderWidth: 1, backgroundColor: '#ffffff', paddingLeft: 5, borderRadius: 2}}
                  onChangeText={(text) => this.setState({bio: text})}
                  value={this.state.bio}
                  placeholder="ex. I am a farmer."
                  multiline = {true}
                  numberOfLines = {2}
                  onFocus={this.animateUp}
                />
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
              <View style={{borderRadius: 8,
                            borderWidth: 1,
                            borderColor: '#6de3dc',
                            backgroundColor: '#6de3dc',
                            marginTop: 10,
                            marginBottom: 10,
                            marginRight: 5,
                            flex: 0.475
                          }}
              >
                <TouchableOpacity
                  style = {styles.submitTouchBottom}
                  onPress={() => {}}
                >
                  <Text style = {styles.submitText}>SAVE</Text>
                </TouchableOpacity>
              </View>
              <View style={{borderRadius: 8,
                            borderWidth: 1,
                            borderColor: '#6de3dc',
                            backgroundColor: '#6de3dc',
                            marginTop: 10,
                            marginBottom: 10,
                            marginLeft: 5,
                            flex: 0.475
                          }}
              >
                <TouchableOpacity
                  style = {styles.submitTouchBottom}
                  onPress={() => {}}
                >
                  <Text style = {styles.submitText}>LOGOUT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

//DUBLICATE CODE!!!!!
class MultiSelectList extends React.PureComponent {
  state = {selected: (new Map(): Map<string, boolean>)};

  _keyExtractor = (item, index) => item.key;

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this.props.renderItem}
        numColumns={this.props.numColumns}
        contentContainerStyle={this.props.contentContainerStyle}
        ListHeaderComponent={this.props.ListHeaderComponent}
        //stickyHeaderIndices={[0]}
        getItemLayout={this.props.getItemLayout}
        onEndReachedThreshold={this.props.onEndReachedThreshold}
        removeClippedSubviews={false}
      />
    );
  }
}

const styles = StyleSheet.create ({
   container: {
      flexDirection: 'column',
      backgroundColor: '#e6fffe',
      //flex: 1,
      //paddingBottom: Platform.OS === 'ios' ? 0 : 0,
   },
   small_container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fffbf5',
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
      backgroundColor: '#fffbf5',
      width: Dimensions.get('window').width,
      marginTop: 40,
      marginTop: 50
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
    backgroundColor: '#6de3dc',
    color: 'white',
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