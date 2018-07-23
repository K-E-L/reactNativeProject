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
    // constructor(props) {
    //     super(props);
    //     this.backHandler = this.backHandler.bind(this);
    //     this.pushNavUserHandler = this.pushNavUserHandler.bind(this);
    // }

    static navigationOptions = ({ navigation }) => ({
        title: 'SearchUser', header: null
    });

    componentDidMount() {
        // this.props.getFollowings(this.props.token, this.props.userStack[this.props.userStack.length - 1]);
    }

    refresh = () => {
        // this.props.getFollowings(this.props.token, this.props.userStack[this.props.userStack.length - 1]);
    }

    backHandler() {
        // this.props.getUser(this.props.token, this.props.userStack[this.props.userStack.length - 1]);
        this.props.navigation.pop();
    }

    pushNavUserHandler(item) {
        this.props.pushNavUser(item.id);
        this.props.navigation.push('User');
    }

    // focusSearchUserHandler() {
    //     // this.props.toggleMojiKeyboard(true);
    //     // this.props.setMojiKeyboardType('SearchUser');
    //     // this.props.toggleMojiPreview(true);
    //     // this.props.setMojiPreviewType('SearchUser');
    // }

    // endEditingSearchUserHandler() {
    //     // this.props.toggleMojiKeyboard(false);
    //     // this.props.toggleMojiPreview(false);
    // }

    // changeTextSearchUserHandler(text) {
    //     this.props.setUserSearchBody(text);
    //     // this.props.splitSearchUserBody();
    // }

                 //   <FlatList
                 // data={this.props.followings}
                 // renderItem={({item}) =>
                 //             <Text onPress={() => this.pushNavUserHandler(item)}
                 //                   style={styles.h3}>
                 //                   {item.name}: {item.username}
                 //             </Text>}
                 //              keyExtractor={item => item.id.toString()}/>
    
    render() {
        return (
            <PTRView onRefresh={this.refresh}>
              <View>
                <TouchableOpacity onPress={() => this.backHandler()}>
                  <Text style={styles.h3}>Back</Text>
                </TouchableOpacity>

                <Text style={styles.h3}>Search User</Text>
                
                <TextInput
                  onChangeText={(text) => this.props.searchUser(this.props.token, text)}
                  value={this.props.userSearchBody}
                  placeholder="Search by Username.."
                  // onFocus={() => this.focusSearchUserHandler()}
                  // onEndEditing={() => this.endEditingSearchUserHandler()}
                  // onSubmitEditing={() => this.props.message(
                  //     this.props.token,
                  //     this.props.convoID,
                  //     this.props.messageBody
                  // )}
                  />
                

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
    console.log('searchUser', state.userReducer.userSearchBody);
    return {
        followings: state.userReducer.followings,
        userStack: state.navReducer.userStack,
        userSearchBody: state.userReducer.userSearchBody,
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);
