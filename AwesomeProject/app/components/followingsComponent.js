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

class Followings extends Component {
    constructor(props) {
        super(props);
        this.backHandler = this.backHandler.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Followings', header: null
    });

    componentDidMount() {
        this.props.getFollowings(this.props.token, this.props.user_stack[this.props.user_stack.length - 1]);
    }

    refresh = () => {
        this.props.getFollowings(this.props.token, this.props.user_stack[this.props.user_stack.length - 1]);
    }

    backHandler() {
        this.props.getUser(this.props.token, this.props.user_stack[this.props.user_stack.length - 1]);
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
                 data={this.props.followings}
                 renderItem={({item}) =>
                             <UserItem
                                   id={item.id}
                                   username={item.username}
                                   name={item.name}
                                   type={'name'}
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
    console.log('followings', state.navReducer.user_stack);
    return {
        followings: state.userReducer.followings,
        user_stack: state.navReducer.user_stack,
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Followings);
