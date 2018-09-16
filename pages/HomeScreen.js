import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, Platform, FlatList, Image, Dimensions, ImageSource} from 'react-native';
import { SearchBar } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import ResponsiveImage from 'react-native-responsive-image';
import FitImage from 'react-native-fit-image';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import autobind from 'autobind-decorator';

export const toRentable = () => {
  const resetToRentable = NavigationActions.navigate({
      key: 'rentable',
      routeName: 'Rentable'
  });
  return resetToRentable;
}

export interface ISize {
  width: number;
  height: number;
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
    items: [{uri: 'http://snag.eamondev.com/assets/rowboat.png', key: 'item1', dist: '3.2 mi', condition: 'Fair', rate: '$250'},
            {uri: 'http://snag.eamondev.com/assets/rowboat.png', key: 'item2', dist: '50 mi', condition: 'Fair', rate: '$25'},
            {uri: 'http://snag.eamondev.com/assets/billythekid2.jpg', key: 'item3', dist: '3.2 mi', condition: 'Fair', rate: '$25'},
            {uri: 'http://snag.eamondev.com/assets/rowboat.png', key: 'item4', dist: '3.2 mi', condition: 'Fair', rate: '$25'},
            {uri: 'http://snag.eamondev.com/assets/billythekid2.jpg', key: 'item5', dist: '3.2 mi', condition: 'Fair', rate: '$25'},
            {uri: 'http://snag.eamondev.com/assets/rowboat.png', key: 'item6', dist: '3.2 mi', condition: 'Fair', rate: '$25'},
            {uri: 'http://snag.eamondev.com/assets/rowboat.png', key: 'item7', dist: '3.2 mi', condition: 'Fair', rate: '$25'},
            {uri: 'http://snag.eamondev.com/assets/billythekid2.jpg', key: 'item8', dist: '3.2 mi', condition: 'Fair', rate: '$25'}
           ],
    backgroundColor: '#e6fffe',
    width: 150,
    height: 150
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

  @autobind
  renderListItems({item, index}) {

    const uri = 'http://snag.eamondev.com/assets/rowboat.png';

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
                    borderRadius: 4,
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
              <Text style={{textDecorationLine: 'underline', flex: 1, fontSize: 12, fontWeight: '700', marginLeft: 10, textAlign: 'center'}}
                  onPress={() => {}}
              >
                Dist.
              </Text>
              <Text style={{flex: 1, fontSize: 15, fontWeight: '900', marginLeft: 10, textAlign: 'center', color: '#6de3dc'}}
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
              <Text style={{textDecorationLine: 'underline', flex: 1, fontSize: 12, fontWeight: '700', textAlign: 'center'}}
                    onPress={this.navigateToRentable}
              >
                Rate
              </Text>
              <Text style={{flex: 1, fontSize: 15, fontWeight: '900', textAlign: 'center', color: '#6de3dc'}}
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

  renderHeader = () => {
    return (
      <SearchBar
        onChangeText={(text) => this.setState({searchText: text})}
        //onClear={this.clear.bind(this)}
        //onSubmitEditing={this.search.bind(this)}
        placeholder='Search rentals...'
        containerStyle={{ 
                          //marginBottom: Platform.OS === 'android' ? 10 : 0,
                          height: Platform.OS === 'android' ? 58 : 48,
                          backgroundColor: '#ffe4c4',
                          borderWidth: 1,
                          borderColor: '#6de3dc',
                          /*borderTopWidth: 0,
                          borderBottomWidth: 0,*/
                          flex: 0.945,
                          borderRadius: 4,
                          marginHorizontal: 5
                        }}
        inputStyle={{backgroundColor: '#ffffff',
                     paddingTop: Platform.OS === 'android' ? 11 : 0,
                     paddingBottom: Platform.OS === 'android' ? 11 : 0,
                     paddingLeft: 35,
                     margin: 0,
                     height: Platform.OS === 'android' ? 58 : 46,
                   }}
        value={this.state.searchText}
        lightTheme={true}
        placeholderTextColor='#dddddd'
      />
    )
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <MultiSelectList
            style={{backgroundColor: '#ffe4c4'}}
            data={this.state.items}
            renderItem={this.renderListItems}
            numColumns={2}
            contentContainerStyle={{}}
            onEndReachedThreshold={0.5}
            maxToRenderPerBatch={2}
            initialNumToRender={4}
            ListHeaderComponent={this.renderHeader}
            getItemLayout={(data, index) => (
              {length: Dimensions.get('window').height/2, offset: Dimensions.get('window').height/2 * index, index}
            )}
            backgroundColor={this.state.backgroundColor}
            //contentContainerStyle={{backgroundColor: '#1e4683'}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

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
        stickyHeaderIndices={[0]}
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
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: '#ffe4c4',
      paddingTop: Platform.OS === 'android' ? 10 : 20,
   },
   fitImageWithSize: {
      width: Dimensions.get('window').width/2 - 7.5,
      height: Dimensions.get('window').height/3
   },
});