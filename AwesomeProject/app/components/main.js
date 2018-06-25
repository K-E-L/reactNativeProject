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

// import: actions
import * as Actions from '../actions'; 

class Profile extends Component {
    static navigationOptions = {
        title: 'Login',
    };

    componentDidMount() {
    }

    render() {
        return (
            <View>
              <Button
                onPress={() => this.props.login()}
                title="Login"
                />
                              
              <Button
                onPress={() => this.props.details(this.props.login_cred)}
                title="Details"
                />
            </View>
        );
    }
};

// Pass: redux state to props
function mapStateToProps(state, props) {
    return {
        posts: state.postReducer.items,
        login_cred: state.postReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
