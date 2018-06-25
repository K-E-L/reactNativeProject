import React, { Component } from 'react';
import { AppNavigator } from '../reducers/nav';
import { Provider, connect } from 'react-redux';

import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const Root = reduxifyNavigator(AppNavigator, "root");
const mapStateToProps = (state) => ({
  state: state.nav,
});

export default connect(mapStateToProps)(Root);
