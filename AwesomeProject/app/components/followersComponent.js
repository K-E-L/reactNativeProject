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

class Followers extends Component {
    constructor(props) {
        super(props);
        this.backHandler = this.backHandler.bind(this);
        this.pushNavUserHandler = this.pushNavUserHandler.bind(this);
    }
    
    static navigationOptions = ({ navigation }) => ({
        title: 'Followers', header: null
    });

    componentWillMount() {
        this.props.getFollowers(this.props.token, this.props.user_stack[this.props.user_stack.length - 1]);
    }

    refresh = () => {
        this.props.getFollowers(this.props.token, this.props.user_stack[this.props.user_stack.length - 1]);
    }

    backHandler() {
        this.props.getUser(this.props.token, this.props.user_stack[this.props.user_stack.length - 1]);
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

                <Text style={styles.h3}>Followers</Text>

                <FlatList
                  data={this.props.followers}
                  renderItem={({item}) =>
                              <Text
                                    onPress={() => this.pushNavUserHandler(item)}
                                    style={styles.h3}>
                                    {item.name}: {item.username}
                              </Text>}
                              keyExtractor={item => item.id.toString()}
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
  }
});

// Pass: redux state to props
function mapStateToProps(state, props) {
    // console.log('followings', state.navReducer.user_stack);
    return {
        followers: state.userReducer.followers,
        user_stack: state.navReducer.user_stack,
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Followers);
