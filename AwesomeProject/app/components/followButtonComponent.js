// import: basics
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Alert,
    Button,
    FlatList,
    Image,
    ListItem,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// import: actions
import * as Actions from '../actions/rootActions';

class FollowButton extends Component {
    constructor(props) {
        super(props);
        this.followUnfollowHandler = this.followUnfollowHandler.bind(this);
    }

    followUnfollowHandler(login_cred, user_id, type, auth_id) {
        // alert
        Alert.alert(
            this.props.user.type + 'ing',
            this.props.user.type + 'ed',
            [{text: 'Ok'}],
            { cancelable: false }
        );
        
        this.props.FollowUnfollow(login_cred, user_id, type, auth_id);
    }

    render() {
        if (this.props.user.type === 'Follow') {
            return (
                <View>
                  <TouchableOpacity onPress={() => this.followUnfollowHandler(
                        this.props.token,
                        this.props.user.data.id,
                        this.props.user.type,
                        this.props.auth_user.id
                    )}>
                    <Text style={styles.link}>
                      {this.props.user.type}</Text>
                  </TouchableOpacity>
                </View>
            );
        }
        else {
            return (
                <View>
                  <TouchableOpacity onPress={() => this.followUnfollowHandler(
                        this.props.token,
                        this.props.user.data.id,
                        this.props.user.type,
                        this.props.auth_user.id
                    )}>
                    <Text style={styles.pressed}>
                      {this.props.user.type}</Text>
                  </TouchableOpacity>
                </View>
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
    },
    pressed: {
        fontSize: 30,
        color: '#ff891c'
    }
});

// Pass: redux state to props
function mapStateToProps(state, props) {
    return {
        auth_user: state.userReducer.auth_user,
        
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);
