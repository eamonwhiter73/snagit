import React from 'react';
import { Alert, StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator, StackActions, NavigationActions, createStackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import { YellowBox } from 'react-native';
import NavigationService from './services/NavigationService';
//import type { RemoteMessage } from 'react-native-firebase';

import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import ProfileScreen from './pages/ProfileScreen';
import LoginScreenNavigator from './components/LoginScreenNavigator';
import CameraScreenNavigator from './components/CameraScreenNavigator';
//import RentScreenNavigator from './components/RentScreenNavigator';
import { setCustomText } from 'react-native-global-props';

const customTextProps = { 
  style: { 
    fontFamily: 'OpenSans-Regular'
  }
}

setCustomText(customTextProps);

YellowBox.ignoreWarnings(['Class RCTCxxModule']);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['You should only render one navigator explicitly in your app, and other navigators should by rendered by including them in that navigator.']);

const AppMainNavigator = createBottomTabNavigator(
  {
    Home: { key: 'home', screen: HomeScreen },
    Settings: { key: 'profile', screen: ProfileScreen },
    Share: { key: 'renttab', screen: CameraScreenNavigator },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Settings') {
          iconName = 'settings';
        } else if (routeName === 'Share') {
          iconName = 'plus-square';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <Icon
            name={iconName}
            color={tintColor}
            type='feather'
          />
        )
      }
    }),
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#c9fffd',
      activeBackgroundColor: '#6de3dc',
      inactiveBackgroundColor: '#6de3dc'
    },
    initialRouteName: 'Home'
  },
);

/*const AppLoginNavigator = createStackNavigator(
  {
    Login: { key: 'login', screen: LoginScreenNavigator },
  },
  {
    headerMode: 'none',
    navigationOptions: ({ navigation }) => ({
      headerVisible: false,
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Settings') {
          iconName = 'settings';
        } else if (routeName === 'Share') {
          iconName = 'plus-square';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <Icon
            name={iconName}
            color={tintColor}
            type='feather'
          />
        )
      }
    }),
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#c9fffd',
      activeBackgroundColor: '#6de3dc',
      inactiveBackgroundColor: '#6de3dc'
    },
    initialRouteName: 'Login'
  },
)*/

const AppNavigator = createStackNavigator(
  {
    LoginSeq: { key: 'loginseq', screen: LoginScreenNavigator },
    MainSeq: { key: 'mainseq', screen: AppMainNavigator }
  },
  {
    headerMode: 'none',
    initialRouteName: 'LoginSeq'
  },
)

// gets the current screen from navigation state
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

export default class App extends React.Component {
  
  constructor() {
    super();
  }

  componentDidMount() {
    this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
      console.log(message);

      // prevent infite look
      //if (!message.local_notification) {
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
              console.log("message.data:", message.data);
              console.log("this.props.ref:", this.props.ref);
              NavigationService.resetWithSubAction('MainSeq', {}, 'Home', { data: JSON.parse(JSON.stringify(message.data)) });
            }},
            {text: 'IGNORE', onPress: () => console.log('IGNORE Pressed')},
          ],
          { cancelable: false }
        )
      //}
    });
  }

  componentWillUnmount() {
    /*this.onTokenRefreshListener();
    this.messageListener();
    firebase.messaging().unsubscribeFromTopic('all');*/
    //this.authSubscription();
  }
  
  render() {
    return (
      <AppNavigator ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef);}}/>
    )
  }
}