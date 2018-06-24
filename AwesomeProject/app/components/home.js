import React, { Component } from 'react';
import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'; // Import your actions

class Home extends Component {
    componentDidMount() {
        // this.props.login();
        
        // this.props.getData(); // call our action
        //       <FlatList
        //                      data={this.props.posts}
        //                      renderItem={({item}) =>
        //                                  <Text>
        //                                        Name: {item.name}
        //                                            Username: {item.username}
        //                                  </Text>}
        //                                  keyExtractor={(item, id) => id.toString()}
        //                                  />

    }

    render() {
        return (
            <View>
              <Button
                onPress={() => this.props.login()}
                title="Login"
                />
                              
              <Button
                onPress={() => this.props.details(this.props.login_cred)}
                title="Details"
                />
            </View>
        );
    }
};

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        posts: state.postReducer.items,
        login_cred: state.postReducer.token,
    };
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Home);
