// import: basics
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Button,
    FlatList,
    ListItem,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

// import: actions
import * as authActions from '../actions/authActions';

class Mojis extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Mojis'
    });

    componentDidMount() {
        // this.props.details(this.props.token);
        // this.props.getData();
    }

    render() {
        return (
            <View>
              <Text>Mojis Here</Text>
            </View>
        );
    }
};

// Pass: redux state to props
function mapStateToProps(state, props) {
    return {
        // items: state.authReducer.items,
        // token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(authActions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Mojis);
