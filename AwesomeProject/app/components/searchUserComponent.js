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

class SearchUser extends Component {
    constructor(props) {
        super(props);
        this.backHandler = this.backHandler.bind(this);
        this.pushNavUserHandler = this.pushNavUserHandler.bind(this);
        this.changeTextSearchUserHandler = this.changeTextSearchUserHandler.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'SearchUser', header: null
    });

    backHandler() {
        this.props.navigation.pop();
    }

    pushNavUserHandler(id) {
        this.props.pushNavUser(id);
        this.props.navigation.push('User');
    }

    changeTextSearchUserHandler(text, token) {
        this.props.setUserSearchBody(text);
        this.props.searchUser(token, text);
    }
    
    render() {
        return (
            <PTRView onRefresh={this.refresh}>
              <View>
                <TouchableOpacity onPress={() => this.backHandler()}>
                  <Text style={styles.h3}>Back</Text>
                </TouchableOpacity>

                <Text style={styles.h3}>Search User</Text>
                
                <TextInput
                  onChangeText={(text) => this.changeTextSearchUserHandler(text, this.props.token)}
                  value={this.props.userSearchBody}
                  placeholder="Search by Username.."
                  onSubmitEditing={() => this.props.searchUser(this.props.token, this.props.userSearchBody)}
                  />

                  {this.props.searchUserLoaded && <Text onPress={() => this.pushNavUserHandler(this.props.userSearch.data.id)}
                        style={styles.h3}>
                        {this.props.userSearch.data.name}: {this.props.userSearch.data.username}
                  </Text>}
                  
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
    // console.log('userSearch', state.userReducer.userSearch);
    return {
        userSearchBody: state.userReducer.userSearchBody,
        userSearch: state.userReducer.userSearch,
        searchUserLoaded: state.userReducer.searchUserLoaded,
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);
