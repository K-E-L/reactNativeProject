// import: basics
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

// import: store
import store from './app/store';

// import: components
// import { AuthStackNavigator } from './app/components/navComponent';
// import { TabNavigator } from './app/components/navComponent';

import Login from './app/components/loginComponent.js';

// disable navigator warning.. kinda sux
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
              <Login/>
            </Provider>
        );
    }
}

