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

// import: component
import Login from './loginComponent.js';

// import: component
import Register from './registerComponent.js';

class Root extends Component {
    render() {
        if (this.props.show_register === false) {
            return (
                <Login />
            );
        }
        else {
            return (
                <Register />
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
        show_register: state.authReducer.show_register
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Root);
