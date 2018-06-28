// import: basics
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Button,
    FlatList,
    Header,
    ListItem,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

// import: actions
import * as userActions from '../actions/userActions';

// import: components
import { MojiStackNavigator } from './navComponent';

class Mojistab extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Mojis'
    });

    render() {
        return (
            <MojiStackNavigator/>
        );
    }
};

// Pass: redux state to props
function mapStateToProps(state, props) {
    return {
        // items: state.userReducer.items,
        // token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(userActions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Mojistab);
