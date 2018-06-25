// import: basics
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

// import: actions
import * as Actions from '../actions'; 

class Login extends Component {
    static navigationOptions = {
        title: 'Login',
    };

    // constructor () {
    //     super();
    //     this.state = {
    //         username: '',
    //         password: ''
    //     };
    // }

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

                //       <Button
                // onPress={() => this.props.login()}
                // title="Login"
                // />
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
              <TextInput
                // onChangeText={(text) => this.setState({username : text})}
                onChangeText={(text) => {this.props.username();}}
                value='hello'
                />
              
              <Button
                onPress={() => navigate('Profile')}
                title="Login"
                />
            </View>
        );
    }
};

// Pass: redux state to props
function mapStateToProps(state, props) {
    return {
        posts: state.authReducer.items,
        login_cred: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Login);
