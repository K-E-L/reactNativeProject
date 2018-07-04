// import: basics
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Button,
    FlatList,
    Header,
    ListItem,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

// import: actions
// import * as userActions from '../actions/userActions';
import * as Actions from '../actions/rootActions';

import { renderers } from 'react-native-popup-menu';
const { SlideInMenu } = renderers;

class User extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'User'
    });
    
    componentWillMount() {
        this.props.getUser(this.props.token, this.props.navigation.state.params.id);

              // <Button
              //   title="Start Convo"
              //   onPress={() => this.props.createConvo(
              //       this.props.user.data.id,
              //       this.props.token
              //   )}/>
    }

    state = {user: ''}
    updateUser = (user) => {
        this.setState({ user: user });
    }

    

    render() {        
        return (
            <View>
              <Text style={styles.h3}>{this.props.user.data.name}</Text>
              <Text style={styles.text}>Username: {this.props.user.data.username}</Text>
              <Text
                style={styles.h3}
                onPress={() => this.props.FollowUnfollow(
                    this.props.user.type,
                    this.props.user.data.id,
                    this.props.token
                )}>{this.props.user.type}</Text>

              <Text
                onPress={() => this.props.navigation.push('Followings', {id: this.props.user.data.id})}
                style={styles.h3}>Followings: {this.props.user.data.followingsCount}</Text>

              <Text
                onPress={() => this.props.navigation.push('Followers', {id: this.props.user.data.id})}
                style={styles.h3}>Followers: {this.props.user.data.followersCount}</Text>

              <Text
                style={styles.h3}
                onPress={() => this.props.createConvo(
                    this.props.user.data.id,
                    this.props.token
                )}>Message</Text>


              <Text style={styles.text}>Public Mojis</Text>
              <Text style={styles.text}>Collection</Text>

              <Menu renderer={SlideInMenu}>
                <MenuTrigger>
                  <Text style={styles.h3}>dot dot dot</Text>
                </MenuTrigger>
                <MenuOptions customStyles={{ optionText: styles.text }}>
                  <MenuOption
                    value={1}
                    text='Option one'
                    onSelect={() => alert('Option one')}/>
                  <MenuOption
                    value={2}
                    text='Option two'
                    onSelect={() => alert('Option two')}/>
                  <MenuOption
                    value={3}
                    text='Option three'
                    onSelect={() => alert('Option three')}/>
                </MenuOptions>
              </Menu>

            </View>
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
    // console.log(state.userReducer.user);
    return {
        user: state.userReducer.user,
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(User);
