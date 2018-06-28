// not using root for now, implement redux-navigator later

// import React, { Component } from 'react';
// import { AppNavigator } from '../reducers/nav';
// import { Provider, connect } from 'react-redux';

// import {
//     reduxifyNavigator,
//     createReactNavigationReduxMiddleware
// } from 'react-navigation-redux-helpers';

// const middleware = createReactNavigationReduxMiddleware(
//   "root",
//   state => state.nav,
// );

// const Root = reduxifyNavigator(AppNavigator, "root");
// const mapStateToProps = (state) => ({
//   state: state.nav,
// });

// export default connect(mapStateToProps)(Root);

import Authuser from './authuserComponent';
import Authusertab from './authusertabComponent';
import Convo from './convoComponent';
import Convos from './convosComponent';
import Convostab from './convostabComponent';
import Followers from './followersComponent';
import Followings from './followingsComponent';
import Login from './loginComponent';
import Mojis from './mojisComponent';
import Mojistab from './mojistabComponent';
import User from './userComponent';

// import: navigator
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

// export: tab navigator
export const TabNavigator = createBottomTabNavigator({
    Convostab: { screen: Convostab },
    Authusertab: { screen: Authusertab },
    Mojistab: { screen: Mojistab }
}, {
    initialRouteName: 'Authusertab',
    tabBarPosition: 'bottom'
});

// export: user navigator
export const UserStackNavigator = createStackNavigator({
    Authuser: { screen: Authuser },
    User: { screen: User },
    Followings: { screen: Followings },
    Followers: { screen: Followers }
}, {
    initialRouteName: 'Authuser',
});

// export: convo navigator
export const ConvoStackNavigator = createStackNavigator({
    Convos: { screen: Convos },
    Convo: { screen: Convo },
    User: { screen: User },
    Followings: { screen: Followings },
    Followers: { screen: Followers }
}, {
    initialRouteName: 'Convos',
});

export const MojiStackNavigator = createStackNavigator({
    Mojis: { screen: Mojis }
}, {
    initialRouteName: 'Mojis',
});

