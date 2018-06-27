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

class User extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'User'
    });
    
    componentWillMount() {
        this.props.getUser(this.props.token, this.props.navigation.state.params.id);
        
    }

    render() {
        return (
            <View>
              <Text>About</Text>
              <Text>Name: {this.props.other.user.name}</Text>
              <Text>Username: {this.props.other.user.username}</Text>
              <Text>Email: {this.props.other.user.email}</Text>
              <Text>Following</Text>
              <FlatList
                data={this.props.other.followings}
                renderItem={({item}) =>
                            <Text
                                  onPress={() => this.props.navigation.push('User', {id: item.id})}>
                                  {item.name}
                            </Text>}
                            keyExtractor={item => item.id.toString()}
                            />
               <Text>Followers</Text>
               <FlatList
                 data={this.props.other.followers}
                 renderItem={({item}) =>
                             <Text
                                   onPress={() => this.props.navigation.push('User', {id: item.id})}>
                                   {item.name}
                             </Text>}
                             keyExtractor={item => item.id.toString()}
                             />
                <Text>Public Mojis</Text>
                <Text>Collection</Text>
            </View>
        );
    }
};

// Pass: redux state to props
function mapStateToProps(state, props) {
    return {
        other: state.userReducer.other,
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(userActions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(User);
