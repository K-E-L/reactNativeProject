// import: basics
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Button,
    FlatList,
    Image,
    ListItem,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// import: actions
import * as Actions from '../actions/rootActions';

class UserItem extends Component {
    constructor(props) {
        super(props);
        this.pushNavUserHandler = this.pushNavUserHandler.bind(this);
        this.pushWithNameHandler = this.pushWithNameHandler.bind(this);
    }

    pushNavUserHandler(id) {
        this.props.pushNavUser(id);
        this.props.navigation.push('User');
    }

    pushWithNameHandler(id, name) {
        this.props.pushNavUser(id);
        this.props.setUserName(name);
        this.props.navigation.push('User');
    }
    
    render() {
        if(this.props.type === 'name') {
            return (
                <View>
                  <Text
                    onPress={() => this.pushWithNameHandler(this.props.id, this.props.name)}
                    style={styles.h3}>
                    {this.props.name}: {this.props.username}
                  </Text>
                </View>
            );
        }
        if(this.props.type === 'smallName') {
            return (
                <View>
                  <Text
                    onPress={() => this.pushWithNameHandler(this.props.id, this.props.name)}
                    style={styles.text}>
                    {this.props.name}
                  </Text>
                </View>
            );
        }
        else {
            return (
                <View>
                  <Text
                    onPress={() => this.pushNavUserHandler(this.props.id)}
                    style={styles.text}>
                    {this.props.username}
                  </Text>
                </View>
            );
        }
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
    return {
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(UserItem);
