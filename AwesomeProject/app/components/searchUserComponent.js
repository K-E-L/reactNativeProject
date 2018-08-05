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
    TouchableOpacity,
    View
} from 'react-native';

// import: actions
import * as Actions from '../actions/rootActions';

// import: pull to refresh
import PTRView from 'react-native-pull-to-refresh';

// import: dumb component
import UserItem from './userItemComponent';

class SearchUser extends Component {
    constructor(props) {
        super(props);
        this.backHandler = this.backHandler.bind(this);
        this.changeTextSearchUserHandler = this.changeTextSearchUserHandler.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'SearchUser', header: null
    });
    
    refresh = () => {
        this.props.searchUser(this.props.token, this.props.user_search_body);
    }

    backHandler() {
        this.props.navigation.pop();
    }

    changeTextSearchUserHandler(text, token) {
        this.props.setUserSearchBody(text);
        this.props.searchUser(token, text);
    }
    
    render() {
        if (this.props.search_user_loaded === true) {
            return (
                <PTRView onRefresh={this.refresh}
                         keyboardShouldPersistTaps='handled'>
                  <View>
                    <TouchableOpacity onPress={() => this.backHandler()}>
                      <Text style={styles.h3}>Back</Text>
                    </TouchableOpacity>

                    <Text style={styles.h3}>Search User</Text>
                    
                    <TextInput
                      onChangeText={(text) => this.changeTextSearchUserHandler(text, this.props.token)}
                      value={this.props.user_search_body}
                      placeholder="Search by Username.."
                      onSubmitEditing={() => this.props.searchUser(this.props.token, this.props.user_search_body)}
                      autoCapitalize = 'none'/>

                      {this.props.search_user_loaded &&
                          <UserItem
                                id={this.props.user_search.data.id}
                                username={this.props.user_search.data.username}
                                name={this.props.user_search.data.name}
                                type={'name'}
                            navigation={this.props.navigation}/>}
                          
                  </View>
                </PTRView>
            );
        }
        else {
            return (
                <PTRView onRefresh={this.refresh}
                         keyboardShouldPersistTaps='handled'>
                  <View>
                    <TouchableOpacity onPress={() => this.backHandler()}>
                      <Text style={styles.h3}>Back</Text>
                    </TouchableOpacity>

                    <Text style={styles.h3}>Search User</Text>
                    
                    <TextInput
                      onChangeText={(text) => this.changeTextSearchUserHandler(text, this.props.token)}
                      value={this.props.user_search_body}
                      placeholder="Search by Username.."
                      onSubmitEditing={() => this.props.searchUser(this.props.token, this.props.user_search_body)}
                      autoCapitalize = 'none'/>

                      {this.props.search_user_searching && <Text style={styles.h3}>User not found..</Text>}
                  </View>
                </PTRView>
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

// Pass: redux state to props
function mapStateToProps(state, props) {
    // console.log('user_search', state.userReducer.user_search);
    return {
        user_search_body: state.userReducer.user_search_body,
        user_search: state.userReducer.user_search,
        search_user_loaded: state.userReducer.search_user_loaded,
        search_user_searching: state.userReducer.search_user_searching,
        
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);
