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
    TouchableOpacity,
    View,
} from 'react-native';
import {
    FormLabel,
    FormInput,
    FormValidationMessage
} from 'react-native-elements';

// import: actions
import * as Actions from '../actions/rootActions';

// import: components
import { TabNavigator } from './navComponent';

class Login extends Component {
    render() {
        if (!this.props.logged_in && !this.props.login_loading) {
            return (
                <View>
                  <Text style={styles.h3}>Login</Text>
                  <TextInput
                    onChangeText={(text) => this.props.setLoginEmail(text)}
                    value={this.props.login_email}
                    placeholder='email'/>
                    
                  <TextInput
                    onChangeText={(text) => this.props.setLoginPassword(text)}
                    value={this.props.login_password}
                    placeholder='password'
                    secureTextEntry={this.props.hide_log_password}
                    autoCapitalize = 'none'/>
                    
                  <TouchableOpacity
                    onPress={() => this.props.toggleHideLogPassword()}>
                    <Text style={styles.link}>Show Password</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.props.login(
                        this.props.login_email,
                        this.props.login_password
                    )}>
                    <Text style={styles.link}>Login</Text>
                  </TouchableOpacity>

                  <Text style={styles.text}>Don't have an account?</Text>
                  <TouchableOpacity
                    onPress={() => this.props.toggleShowRegister()}>
                    <Text style={styles.link}>Go to Register</Text>
                  </TouchableOpacity>

                </View>
            );
        }
        else if (this.props.logged_in && this.props.login_loading) {
            return  (
                <Text style={styles.h3}>Loading..</Text>
            );
        }
        else {
            return (
                <TabNavigator />
            );
        }
    }
};

const styles = StyleSheet.create({
    h3: {
        fontSize: 30,
    },
    text: {
        fontSize: 15,
    },
    link: {
        fontSize: 30,
        color: '#00a9ff'
    }
});

function mapStateToProps(state, props) {
    return {
        login_email: state.authReducer.login_email,
        login_password: state.authReducer.login_password,
        logged_in: state.authReducer.logged_in,
        login_loading: state.authReducer.login_loading,
        hide_log_password: state.authReducer.hide_log_password
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Login);
