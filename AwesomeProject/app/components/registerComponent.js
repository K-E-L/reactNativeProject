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

class Register extends Component {
    render() {
        if (!this.props.logged_in && !this.props.register_loading) {
        return (
            <View>
              <TouchableOpacity
                onPress={() => this.props.toggleShowRegister()}>
                <Text style={styles.link}>Back</Text>
              </TouchableOpacity>              
                                   
              <Text style={styles.h3}>Register</Text>

              <TextInput
                onChangeText={(text) => this.props.setRegisterName(text)}
                value={this.props.register_name}
                placeholder='Name'/>

              <TextInput
                onChangeText={(text) => this.props.setRegisterUsername(text)}
                value={this.props.register_username}
                placeholder='Username'/>
                
              <TextInput
                onChangeText={(text) => this.props.setRegisterEmail(text)}
                value={this.props.register_email}
                placeholder='Email'/>
                
              <TextInput
                onChangeText={(text) => this.props.setRegisterPassword(text)}
                value={this.props.register_password}
                placeholder='Password'
                secureTextEntry={this.props.hide_reg_password}
                autoCapitalize = 'none'/>

              <TextInput
                onChangeText={(text) => this.props.setRegisterSamePassword(text)}
                value={this.props.register_same_password}
                placeholder='Retype Password'
                secureTextEntry={this.props.hide_reg_password}
                autoCapitalize = 'none'/>

              <TouchableOpacity
                onPress={() => this.props.toggleHideRegPassword()}>
                <Text style={styles.link}>Show Password</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.register(
                    this.props.register_name,
                    this.props.register_username,
                    this.props.register_email,
                    this.props.register_password,
                    this.props.register_same_password
                )}>
                <Text style={styles.link}>Register</Text>
              </TouchableOpacity>

            </View>
        );
        }
        else if (this.props.logged_in && this.props.register_loading) {
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
        register_name: state.authReducer.register_name,
        register_username: state.authReducer.register_username,
        register_email: state.authReducer.register_email,
        register_password: state.authReducer.register_password,
        register_same_password: state.authReducer.register_same_password,

        hide_reg_password: state.authReducer.hide_reg_password,

        register_loading: state.authReducer.register_loading,
        logged_in: state.authReducer.logged_in
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Register);
