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

class AuthUser extends Component {
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
            this.props.authUser.id) {
            this.props.pushNavUser(this.props.authUser.id);
        }

        switch (type) {
        case 'followings':
            this.props.navigation.navigate('Followings');
            break;
        case 'followers':
            this.props.navigation.navigate('Followers');
            break;
        case 'pubMojis':
            this.props.navigation.navigate('PubMojis');
            break;
        case 'priMojis':
            this.props.navigation.navigate('PriMojis');
            break;
        default:
            console.log('error: type not found');
        }
    }

    render() {
        return (
            <PTRView onRefresh={this.refresh}>
              <View>
                <Text style={styles.h3}>{this.props.authUser.name}</Text>
                <Text style={styles.text}>Username: {this.props.authUser.username}</Text>
                <Text style={styles.text}>Email: {this.props.authUserEmail}</Text>

                <TouchableOpacity onPress={() => this.pushNavUserHandler('followings')}>
                  <Text style={styles.link}>Followings: {this.props.authUser.followingsCount}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.pushNavUserHandler('followers')}>
                  <Text style={styles.link}>Followers: {this.props.authUser.followersCount}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.pushNavUserHandler('pubMojis')}>
                  <Text style={styles.link}>Public Mojis: {this.props.authUser.pubMojisCount}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.pushNavUserHandler('priMojis')}>
                  <Text style={styles.link}>Private Mojis: {this.props.authUser.priMojisCount}</Text>
                </TouchableOpacity>
                
                <Text style={styles.text}>Public Collection</Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Collec')}>
                  <Text style={styles.link}>Collection</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Notifs')}>
                  <Text style={styles.link}>Notifs: {this.props.authUser.notifsCount}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('SearchUser')}>
                  <Text style={styles.link}>Search User</Text>
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
    // console.log('auth', state.navReducer.userStack);
    return {
        authUser: state.userReducer.authUser,
        authUserEmail: state.userReducer.authUserEmail,
        userStack: state.navReducer.userStack,
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(AuthUser);
