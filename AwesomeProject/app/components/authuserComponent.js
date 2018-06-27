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

class Authuser extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Profile'
    });

    componentWillMount() {
        this.props.getAuthUser(this.props.token);        
    }

    render() {
        return (
            <View>
              <Text>About</Text>
              <Text>Name: {this.props.auth.user.name}</Text>
              <Text>Username: {this.props.auth.user.username}</Text>
              <Text>Email: {this.props.auth.user.email}</Text>

              <Text>Following</Text>
              <FlatList
                data={this.props.auth.followings}
                renderItem={({item}) =>
                            <Text
                                  onPress={() => this.props.navigation.navigate('User', {id: item.id})}>
                                  {item.name}
                            </Text>}
                            keyExtractor={item => item.id.toString()}
                            />
              <Text>Followers</Text>
              <FlatList
                data={this.props.auth.followers}
                renderItem={({item}) =>
                            <Text
                                  onPress={() => this.props.navigation.navigate('User', {id: item.id})}>
                                  {item.name}
                            </Text>}
                            keyExtractor={item => item.id.toString()}
                            />
               <Text>Messagable</Text>
               <Text>Public Mojis</Text>
               <Text>Private Mojis</Text>
               <Text>Collection</Text>
               <Text>Notifications</Text>
            </View>
        );
    }
};

// Pass: redux state to props
function mapStateToProps(state, props) {
    return {
        auth: state.userReducer.auth,
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(userActions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Authuser);
