// import: basics
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import {
    FormLabel,
    FormInput,
    FormValidationMessage
} from 'react-native-elements';

// import: components
// import {
//     reduxifyNavigator,
//     createReactNavigationReduxMiddleware,
//     createNavigationReducer,
// } from 'react-navigation-redux-helpers';


// import: actions
import * as authActions from '../actions/authActions';

// import: components
import { TabNavigator } from './navComponent';

// const middleware = createReactNavigationReduxMiddleware(
//     "root",
//     state => state.navReducer,
// );
// const App = reduxifyNavigator(TabNavigator, "root");

// Pass: redux state to props

// const AppWithNavigationState = connect(mapStateToProps)(App);

class Login extends Component {
    render() {
        if (!this.props.logged_in) {
            return (
                <View>
                  <Text>Login</Text>
                  <TextInput
                    onChangeText={(text) => this.props.setEmail(text)}
                    value={this.props.email}
                    placeholder='email'
                    />
                   <TextInput
                     onChangeText={(text) => this.props.setPassword(text)}
                     value={this.props.password}
                     placeholder='password'
                     secureTextEntry={true}
                     autoCapitalize = 'none'
                     />
                     
                    <Button
                      onPress={() => this.props.login(
                          this.props.email,
                          this.props.password
                      )}
                      title="Login"
                      />
                </View>
            );
        }
        return (
            <TabNavigator />
        );
    }
};

function mapStateToProps(state, props) {
    return {
        email: state.authReducer.email,
        password: state.authReducer.password,
        logged_in: state.authReducer.logged_in,
        // state: state.navReducer
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(authActions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Login);
