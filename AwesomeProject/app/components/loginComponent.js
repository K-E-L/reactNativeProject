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

// import: actions
import * as authActions from '../actions/authActions';

class Login extends Component {
    static navigationOptions = {
        title: 'Login',
    };

    render() {
        return (
            <View>
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
                <Button
                  onPress={() => this.props.navigation.navigate('Profile')}
                  title="Profile"
                  />
            </View>
        );
    }
};

// Pass: redux state to props
function mapStateToProps(state, props) {
    return {
        email: state.authReducer.email,
        password: state.authReducer.password
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(authActions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Login);
