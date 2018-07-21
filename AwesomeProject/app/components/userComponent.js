// import: basics
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Alert,
    Button,
    FlatList,
    Header,
    ListItem,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

// import: actions
import * as Actions from '../actions/rootActions';

// import: pull to refresh
import PTRView from 'react-native-pull-to-refresh';

// import: menu testing..
import { renderers } from 'react-native-popup-menu';
const { SlideInMenu } = renderers;

class User extends Component {
    constructor(props) {
        super(props);
        this.followUnfollowHandler = this.followUnfollowHandler.bind(this);
        this.createConvoHandler = this.createConvoHandler.bind(this);
        this.backHandler = this.backHandler.bind(this);
    }
    
    static navigationOptions = ({ navigation }) => ({
        title: 'User', header: null
    });
    
    componentWillMount() {
        this.props.getUser(this.props.token, this.props.userStack[this.props.userStack.length - 1]);
    }

    refresh = () => {
        this.props.getUser(this.props.token, this.props.userStack[this.props.userStack.length - 1]);
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
        // this.props.navigation.navigate('Authuser');
    }

    createConvoHandler(login_cred, id) {
        // alert
        Alert.alert(
            'Messaging',
            'Messaged',
            [{text: 'Ok'}],
            { cancelable: false }
        );

        this.props.createConvo(login_cred, id);
        this.props.navigation.navigate('Convos');
    }

    backHandler() {
        this.props.popNavUser();
        if (this.props.userStack.length !== 1) {
            this.props.getFollowings(this.props.token, this.props.userStack[this.props.userStack.length - 2]);
            this.props.getFollowers(this.props.token, this.props.userStack[this.props.userStack.length - 2]);
            this.props.getUser(this.props.token, this.props.userStack[this.props.userStack.length - 2]);
        }
        this.props.navigation.pop();
    }

    render() {        
        return (
            <PTRView onRefresh={this.refresh}>
              <View>
                <TouchableOpacity onPress={() => this.backHandler()}>
                  <Text style={styles.h3}>Back</Text>
                </TouchableOpacity>
                                
              <Text style={styles.h3}>{this.props.user.data.name}</Text>
              <Text style={styles.text}>Username: {this.props.user.data.username}</Text>
              <Text
                style={styles.link}
                onPress={() => this.followUnfollowHandler(
                    this.props.token,
                    this.props.user.data.id,
                    this.props.user.type,
                    this.props.authUser.id
                )}>{this.props.user.type}</Text>

              <Text
                onPress={() => this.props.navigation.push('Followings')}
                style={styles.link}>Followings: {this.props.user.data.followingsCount}</Text>

              <Text
                onPress={() => this.props.navigation.push('Followers')}
                style={styles.link}>Followers: {this.props.user.data.followersCount}</Text>

              <Text
                style={styles.link}
                onPress={() => this.createConvoHandler(
                    this.props.token,
                    this.props.user.data.id
                )}>Message</Text>
              
              <TouchableOpacity onPress={() => this.props.navigation.push('PubMojis')}>
                <Text style={styles.link}>Public Mojis: {this.props.user.data.pubMojisCount}</Text>
              </TouchableOpacity>
              
              <Text style={styles.text}>Public Collection</Text>

              <Menu renderer={SlideInMenu}>
                <MenuTrigger>
                  <Text style={styles.h3}>dot dot dot</Text>
                </MenuTrigger>
                <MenuOptions customStyles={{ optionText: styles.text }}>
                  <MenuOption
                    value={1}
                    text='Option one'
                    onSelect={() => alert('Option one')}/>
                  <MenuOption
                    value={2}
                    text='Option two'
                    onSelect={() => alert('Option two')}/>
                  <MenuOption
                    value={3}
                    text='Option three'
                    onSelect={() => alert('Option three')}/>
                </MenuOptions>
              </Menu>

            </View>
            </PTRView>
        );
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

// Pass: redux state to props
function mapStateToProps(state, props) {
    console.log('user', state.navReducer.userStack);
    return {
        user: state.userReducer.user,
        authUser: state.userReducer.authUser,
        userStack: state.navReducer.userStack,
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(User);
