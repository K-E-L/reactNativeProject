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

// import: actions
import * as userActions from '../actions/userActions';

class Authuser extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Profile'
    });

    componentWillMount() {
        this.props.getAuthUser(this.props.token);
    }

    render() {
        return (
            <View>
              <Text style={styles.h3}>{this.props.authUser.data.name}</Text>
              <Text style={styles.text}>Username: {this.props.authUser.data.username}</Text>
              <Text style={styles.text}>Email: {this.props.authUser.email}</Text>

              <Text
                onPress={() => this.props.navigation.navigate('Followings', {id: this.props.authUser.data.id})}
                style={styles.h3}>Followings: {this.props.authUser.data.followingsCount}</Text>

              <Text
                onPress={() => this.props.navigation.navigate('Followers', {id: this.props.authUser.data.id})}
                style={styles.h3}>Followers: {this.props.authUser.data.followersCount}</Text>
              
              <Text style={styles.text}>Messagable</Text>
              <Text style={styles.text}>Public Mojis</Text>
              <Text style={styles.text}>Private Mojis</Text>
              <Text style={styles.text}>Collection</Text>
              <Text style={styles.text}>Notifications</Text>
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
    console.log(state.userReducer.authUser);
    return {
        authUser: state.userReducer.authUser,
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(userActions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Authuser);
