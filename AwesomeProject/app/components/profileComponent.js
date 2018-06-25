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

class Profile extends Component {
    static navigationOptions = {
        title: 'Profile',
    };

    componentWillMount() {
        this.props.details(this.props.token);
        // this.props.getData();
    }

    render() {
        return (
            <View>
              // stopped here, cant output items json on display
              <FlatList
                data={this.props.items}
                renderItem={({ item }) => (
                    <ListItem
                      title={item.name}
                      />)}
                />
                </View>
        );
    }
};

// Pass: redux state to props
function mapStateToProps(state, props) {
    console.log(state.authReducer.items.success);
    return {
        items: state.authReducer.items.success,
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(authActions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
