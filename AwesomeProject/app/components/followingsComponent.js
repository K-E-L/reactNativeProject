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

class Followings extends Component {
    constructor(props) {
        super(props);
        this.backHandler = this.backHandler.bind(this);
        this.pushNavUserHandler = this.pushNavUserHandler.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Followings', header: null
    });

    componentDidMount() {
        this.props.getFollowings(this.props.token, this.props.userStack[this.props.userStack.length - 1]);
    }

    refresh = () => {
        this.props.getFollowings(this.props.token, this.props.userStack[this.props.userStack.length - 1]);
    }

    backHandler() {
        this.props.getUser(this.props.token, this.props.userStack[this.props.userStack.length - 1]);
        this.props.navigation.pop();
    }

    pushNavUserHandler(item) {
        this.props.pushNavUser(item.id);
        this.props.navigation.push('User');
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
                             <Text onPress={() => this.pushNavUserHandler(item)}
                                   style={styles.h3}>
                                   {item.name}: {item.username}
                             </Text>}
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
    console.log('followings', state.navReducer.userStack);
    return {
        followings: state.userReducer.followings,
        userStack: state.navReducer.userStack,
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Followings);
