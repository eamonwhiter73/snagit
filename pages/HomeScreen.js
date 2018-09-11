import React from 'react';
import { Animated, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Platform, FlatList, Image } from 'react-native';
import { SearchBar } from 'react-native-elements';
import firebase from 'react-native-firebase';

export default class HomeScreen extends React.Component {

  constructor() {
    super();
    //this.ref = firebase.firestore().collection('items');
    //this.authSubscription = null;
  }

  static navigatorStyle = { navBarHidden: true };

  state = {
    searchText: "",
    items: [{key: 'item', name: 'Rowboat'}]
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

  renderListItems = (item) => {
    return ( 
      <View style={{flex: 1,
                    flexDirection: 'row',
                    backgroundColor: '#e6fffe',
                    paddingBottom: 10,
                    marginTop: 10,
                    borderColor: '#6de3dc',
                    borderBottomWidth: 2,
                    borderStyle: 'solid',
                    marginHorizontal: 10,
                    borderRadius: 4
                  }}
      >
        <Image
          source={require('../assets/rowboat.jpg')}
          style={{height: 95, width: 95, marginTop: 10, marginLeft: 10, borderColor: '#6de3dc', borderWidth: 2}}
        />
        <View style={{flexDirection: 'column', flex: 1}}>
          <View style={{alignItems: 'center', marginBottom: 10}}>
            <Text style={{marginTop: 10, flex: 1, fontSize: 18, fontWeight: '700'}}
                onPress={() => {}}
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
                    onPress={() => {}}
                >
                  3.2
                </Text>
              </View>
              <View style={{flexDirection: 'column', flex: 0.33, justifyContent: 'space-between'}}>
                <Text style={{textDecorationLine: 'underline', flex: 1, fontSize: 14, fontWeight: '700', textAlign: 'center'}}
                    onPress={() => {}}
                >
                  Cond.
                </Text>
                <Text style={{flex: 1, fontSize: 24, fontWeight: '900', textAlign: 'center', color: '#6de3dc'}}
                    onPress={() => {}}
                >
                  Fair
                </Text>
              </View>
              <View style={{flexDirection: 'column', flex: 0.33, justifyContent: 'space-between'}}>
                <Text style={{textDecorationLine: 'underline', flex: 1, fontSize: 14, fontWeight: '700', textAlign: 'center'}}
                    onPress={() => {}}
                >
                  Price
                </Text>
                <Text style={{flex: 1, fontSize: 24, fontWeight: '900', textAlign: 'center', color: '#6de3dc'}}
                    onPress={() => {}}
                >
                  $25
                </Text>
              </View>
            </View>
          </View>
        </View>
          {/*<TouchableOpacity
            style = {styles.editcontainer}
            onPress={() => { 
              this.edit(item)
            }}>
            <Text style = {styles.buttonTextAdjust}>EDIT</Text>
          </TouchableOpacity>*/}
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <SearchBar
            onChangeText={(text) => this.setState({searchText: text})}
            //onClear={this.clear.bind(this)}
            //onSubmitEditing={this.search.bind(this)}
            placeholder='Search rentals...'
            containerStyle={{ marginTop: 30,
                              height: 46,
                              backgroundColor: '#6de3dc',
                              borderTopColor: '#fff',
                              borderBottomColor: '#fff',
                              borderBottomWidth: 0,
                              borderBottomColor: '#1e4683',
                              borderTopWidth: 0,
                              borderTopColor: '#1e4683',
                              borderStyle: 'solid',
                              flex: 0.945,
                              borderRadius: 4
                            }}
            inputStyle={{backgroundColor: '#ffffff'}}
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
    );
  }
}

const styles = StyleSheet.create ({
   container: {
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'space-between'
   },
})