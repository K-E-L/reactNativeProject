// import: basics
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Alert,
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
        this.funcHandler = this.funcHandler.bind(this);
    }

    componentWillMount() {
        // nothing
    }

    // setUserItemHandler(item) {
    //     this.props.setUserItem(item);
    // }

    funcHandler(login_cred, user_id, convo_id) {
        // alert
        Alert.alert(
            this.props.convoType,
            this.props.convoType,
            [{text: 'Ok'}],
            { cancelable: false }
        );

        switch (this.props.convoType) {
        case 'createConvo':
            this.props.createConvo(login_cred, user_id);
            this.props.navigation.navigate('Convos');
            break;
        case 'addUser':
            this.props.addUser(login_cred, user_id, convo_id);
            this.props.navigation.navigate('Convo');
            break;
        default:
            console.log('error: type not found');
        }
    }
    
    render() {
        return (
            <View>              
              <Text
                style={styles.h3}
                onPress={() => this.funcHandler(
                    this.props.token,
                    this.props.item.id,
                    this.props.convoID
                )}>
                {this.props.item.name}: {this.props.item.username}
              </Text>

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
    return {
        token: state.authReducer.token,        
        authUser: state.userReducer.authUser,
        convoID: state.navReducer.convoID,
        convoType: state.navReducer.convoType
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(UserItem);