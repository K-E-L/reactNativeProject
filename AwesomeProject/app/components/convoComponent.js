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
import * as convoActions from '../actions/convoActions';

class Convo extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Convo'
    });

    componentWillMount() {
        this.props.getConvo(this.props.token, this.props.navigation.state.params.id);
    }

    render() {
        return (
            <View>
              <Text>Name: {this.props.specific.convo.name}</Text>
              <FlatList
                data={this.props.specific.convo.users}
                renderItem={({item}) =>
                            <Text
                                  onPress={() => this.props.navigation.push('User', {id: item.id})}>
                                  {item.name}
                            </Text>}
                            keyExtractor={item => item.id.toString()}
                            />
            </View>
        );
    }
};

// Pass: redux state to props
function mapStateToProps(state, props) {
    return {
        specific: state.convoReducer.specific,
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(convoActions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Convo);
