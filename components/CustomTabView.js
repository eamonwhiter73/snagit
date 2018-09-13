import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const HomeRoute = () => (
  <View style={{ backgroundColor: '#ff4081' }} />
);
const ProfileRoute = () => (
  <View style={{ backgroundColor: '#673ab7' }} />
);
const RentRoute = () => (
  <View style={{ backgroundColor: '#673ab7' }} />
);  

export default class CustomTabView extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Home' },
      { key: 'second', title: 'Profile' },
      { key: 'third', title: 'Rent' },
    ],
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: HomeRoute,
          second: ProfileRoute,
          third: RentRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width, height: 44 }}
      />
    );
  }
}