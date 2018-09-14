import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, Platform, FlatList, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { StackActions, NavigationActions } from 'react-navigation';

export const toRentable = () => {
  const resetToRentable = NavigationActions.navigate({
      key: 'rentable',
      routeName: 'Rentable'
  });
  return resetToRentable;
}

export default class HomeScreen extends React.Component {

  constructor() {
    super();
    //this.ref = firebase.firestore().collection('items');
    //this.authSubscription = null;
  }

  static navigatorStyle = { navBarHidden: true };

  state = {
    searchText: "",
    items: [{key: 'item', name: 'Rowboat'}],
    backgroundColor: '#e6fffe'
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
  
  }

  navigateToRentable = () => {
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
          routeName: 'Rent',
          params: { param: 'RentTab' },
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

  renderListItems = (item) => {
    return ( 
      <TouchableWithoutFeedback onPress={this.navigateToRentable}>
        <View style={{flex: 1,
                      flexDirection: 'row',
                      backgroundColor: /*'#e6fffe'*/this.state.backgroundColor,
                      paddingBottom: 10,
                      marginTop: 10,
                      borderColor: '#6de3dc',
                      borderBottomWidth: 2,
                      borderStyle: 'solid',
                      marginHorizontal: 10,
                      borderRadius: 4
                    }}
        >
        <TouchableWithoutFeedback onPress={this.navigateToRentable}>
          <Image
            source={require('../assets/rowboat.jpg')}
            style={{height: 95, width: 95, marginTop: 10, marginLeft: 10, borderColor: '#6de3dc', borderWidth: 2, borderRadius: 4}}
          />
        </TouchableWithoutFeedback>
          <View style={{flexDirection: 'column', flex: 1}}>
            <View style={{alignItems: 'center', marginBottom: 10}}>
              <Text style={{marginTop: 10, flex: 1, fontSize: 18, fontWeight: '700'}}
                    onPress={this.navigateToRentable}
              >
                {item.name} {/*distance/condition/price*/}
              </Text>
            </View>
            <View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                <View style={{flexDirection: 'column', flex: 0.33, justifyContent: 'space-between'}}>
                  <Text style={{textDecorationLine: 'underline', flex: 1, fontSize: 14, fontWeight: '700', marginLeft: 10, textAlign: 'center'}}
                      onPress={() => {}}
                  >
                    Dist. (mi.)
                  </Text>
                  <Text style={{flex: 1, fontSize: 24, fontWeight: '900', marginLeft: 10, textAlign: 'center', color: '#6de3dc'}}
                        onPress={this.navigateToRentable}
                  >
                    3.2
                  </Text>
                </View>
                <View style={{flexDirection: 'column', flex: 0.33, justifyContent: 'space-between'}}>
                  <Text style={{textDecorationLine: 'underline', flex: 1, fontSize: 14, fontWeight: '700', textAlign: 'center'}}
                        onPress={this.navigateToRentable}
                  >
                    Cond.
                  </Text>
                  <Text style={{flex: 1, fontSize: 24, fontWeight: '900', textAlign: 'center', color: '#6de3dc'}}
                        onPress={this.navigateToRentable}
                  >
                    Fair
                  </Text>
                </View>
                <View style={{flexDirection: 'column', flex: 0.33, justifyContent: 'space-between'}}>
                  <Text style={{textDecorationLine: 'underline', flex: 1, fontSize: 14, fontWeight: '700', textAlign: 'center'}}
                        onPress={this.navigateToRentable}
                  >
                    Price
                  </Text>
                  <Text style={{flex: 1, fontSize: 24, fontWeight: '900', textAlign: 'center', color: '#6de3dc'}}
                        onPress={this.navigateToRentable}
                  >
                    $25
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <SearchBar
              onChangeText={(text) => this.setState({searchText: text})}
              //onClear={this.clear.bind(this)}
              //onSubmitEditing={this.search.bind(this)}
              placeholder='Search rentals...'
              containerStyle={{ 
                                //marginBottom: Platform.OS === 'android' ? 10 : 0,
                                height: Platform.OS === 'android' ? 58 : 48,
                                backgroundColor: '#6de3dc',
                                borderWidth: 1,
                                borderColor: '#54e1d9',
                                flex: 0.945,
                                borderRadius: 4
                              }}
              inputStyle={{backgroundColor: '#ffffff',
                           paddingTop: Platform.OS === 'android' ? 11 : 0,
                           paddingBottom: Platform.OS === 'android' ? 11 : 0
                         }}
              value={this.state.searchText}
              lightTheme={true}
              placeholderTextColor='#dddddd'
            />
          </View>
          <FlatList
            style={{backgroundColor: '#fff'}}
            data={this.state.items}
            renderItem={({item}) => this.renderListItems(item)}
            //contentContainerStyle={{backgroundColor: '#1e4683'}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create ({
   container: {
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      paddingTop: Platform.OS === 'android' ? 10 : 30,
   },
});