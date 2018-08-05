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

class FollowingsConvoTab extends Component {
    constructor(props) {
        super(props);
        this.backHandler = this.backHandler.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'FollowingsConvoTab', header: null
    });

    componentDidMount() {
        this.props.getFollowingsConvoTab(this.props.token, this.props.user_stack_convo_tab[this.props.user_stack_convo_tab.length - 1]);
    }

    refresh = () => {
        this.props.getFollowingsConvoTab(this.props.token, this.props.user_stack_convo_tab[this.props.user_stack_convo_tab.length - 1]);
    }

    backHandler() {
        this.props.getUserConvoTab(this.props.token, this.props.user_stack_convo_tab[this.props.user_stack_convo_tab.length - 1]);
        this.props.navigation.pop();
    }

    render() {
        return (
            <PTRView onRefresh={this.refresh}>
              <View>
                <TouchableOpacity onPress={() => this.backHandler()}>
                  <Text style={styles.h3}>Back</Text>
                </TouchableOpacity>

                <Text style={styles.h3}>Followings</Text>
                
               <FlatList
                 data={this.props.followings_convo_tab}
                 renderItem={({item}) =>
                             <UserItem
                                   id={item.id}
                                   username={item.username}
                                   name={item.name}
                                   type={'name'}
                                   stack={'convo'}
                                   navigation={this.props.navigation}/>}
                              keyExtractor={item => item.id.toString()}/>

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
    console.log('followings', state.navReducer.user_stack_convo_tab);
    return {
        followings_convo_tab: state.userReducer.followings_convo_tab,
        user_stack_convo_tab: state.navReducer.user_stack_convo_tab,
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(FollowingsConvoTab);
