// import: basics
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Button,
    FlatList,
    Header,
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

// import: pull to refresh
import PTRView from 'react-native-pull-to-refresh';

class Authuser extends Component {
    constructor(props) {
        super(props);
        this.pushNavUserHandler = this.pushNavUserHandler.bind(this);
    }
    
    static navigationOptions = ({ navigation }) => ({
        title: 'Profile', header: null
    });

    componentWillMount() {
        this.props.getAuthUser(this.props.token);
        this.props.getConvos(this.props.token);
    }

    refresh = () => {
        this.props.getAuthUser(this.props.token);
    }

    pushNavUserHandler(type) {
        if (this.props.userStack[this.props.userStack.length - 1] !==
            this.props.authUser.data.id) {
            this.props.pushNavUser(this.props.authUser.data.id);
        }

        switch (type) {
        case 'followings':
            this.props.navigation.navigate('Followings', {id: this.props.authUser.data.id});    
            break;
        case 'followers':
            this.props.navigation.navigate('Followers', {id: this.props.authUser.data.id});
            break;
        default:
            console.log('error: type not found');
        }
    }

    render() {
        return (
            <PTRView onRefresh={this.refresh}>
              <View>
                <Text style={styles.h3}>{this.props.authUser.data.name}</Text>
                <Text style={styles.text}>Username: {this.props.authUser.data.username}</Text>
                <Text style={styles.text}>Email: {this.props.authUser.email}</Text>

                <TouchableOpacity onPress={() => this.pushNavUserHandler('followings')}>
                  <Text style={styles.link}>Followings: {this.props.authUser.data.followingsCount}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.pushNavUserHandler('followers')}>
                  <Text style={styles.link}>Followers: {this.props.authUser.data.followersCount}</Text>
                </TouchableOpacity>
                
                <Text style={styles.text}>Public Mojis</Text>
                <Text style={styles.text}>Private Mojis</Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Collec', {id: this.props.authUser.data.id})}>
                  <Text style={styles.link}>Collection</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Notifs')}>
                  <Text style={styles.link}>Notifs: {this.props.authUser.data.notifsCount}</Text>
                </TouchableOpacity>
                
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
    console.log('auth', state.navReducer.userStack);
    return {
        authUser: state.userReducer.authUser,
        userStack: state.navReducer.userStack,
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Authuser);
