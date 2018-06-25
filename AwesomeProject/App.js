// import: basics
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

// import: store
import store from './app/store';

// import: components
import Login from './app/components/login';
import Profile from './app/components/profile';
import Test from './app/components/test';

// not using root for now, implement redux-navigator later
import Root from './app/components/navComponent';

// ipmort: navigator
import { createStackNavigator } from 'react-navigation';
// disable navigator warning.. kinda sux
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export const Navigator = createStackNavigator({
    Login: { screen: Login },
    Profile: { screen: Profile },
    Test: { screen: Test },
});

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
              <Navigator />
            </Provider>
        );
    }
}

