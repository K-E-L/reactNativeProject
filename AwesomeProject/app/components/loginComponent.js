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
        if (!this.props.loggedIn && !this.props.loginLoading) {
            return (
                <View>
                  <Text style={styles.h3}>Login</Text>
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

                     <TouchableOpacity
                       onPress={() => this.props.login(
                           this.props.email,
                           this.props.password
                       )}>
                       <Text style={styles.link}>Login</Text>
                     </TouchableOpacity>
                </View>
            );
        }
        else if (this.props.loggedIn && this.props.loginLoading) {
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
        email: state.authReducer.email,
        password: state.authReducer.password,
        loggedIn: state.authReducer.loggedIn,
        loginLoading: state.authReducer.loginLoading
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Login);
