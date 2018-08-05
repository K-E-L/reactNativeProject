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
    }

    pushNavUserHandler(id) {
        this.props.navigation.push('User');

        if (this.props.stack === 'convo') 
            this.props.pushNavUserConvoTab(id);
        else if (this.props.stack === 'moji') 
            this.props.pushNavUserMojiTab(id);
        else 
            this.props.pushNavUser(id);
    }
    
    render() {
        if(this.props.type === 'name') {
            return (
                <View>
                  <Text
                    onPress={() => this.pushNavUserHandler(this.props.id)}
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
                    onPress={() => this.pushNavUserHandler(this.props.id)}
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
