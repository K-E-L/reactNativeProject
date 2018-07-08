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
    View
} from 'react-native';

// import: actions
import * as Actions from '../actions/rootActions';

import MessageItem from'./messageItemComponent';

class Convo extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Convo'
    });

    componentWillMount() {
        this.props.getConvo(this.props.token, this.props.navigation.state.params.id);
        this.props.getConvoMessages(this.props.token, this.props.navigation.state.params.id);
        this.props.getConvoUsers(this.props.token, this.props.navigation.state.params.id);
    }

    render() {
        return (
            <View>
              <TextInput
                style={styles.h3}
                onChangeText={(text) => this.props.setRenameBody(text)}
                value={this.props.renameBody}
                placeholder="Rename Convo"/>

              <Button
                onPress={() => this.props.renameConvo(
                    this.props.token,
                    this.props.navigation.state.params.id,
                    this.props.renameBody
                )}
                title="Rename Convo"/>
                             
              <FlatList
               data={this.props.convoUsers.data}
               renderItem={({item}) =>
                           <Text
                                 onPress={() => this.props.navigation.push('User', {id: item.id})}
                                 style={styles.text}>
                                 {item.name}
                           </Text>}
                           keyExtractor={item => item.id.toString()}/>
             <FlatList
               data={this.props.convoMessages.data}
               renderItem={({item}) => <MessageItem item={item} navigation={this.props.navigation}/> }
               keyExtractor={item => item.id.toString()}/>

             <Text
               style={styles.h3}
               onPress={() => this.props.destroyConvo(
                   this.props.token,
                   this.props.convo.id
               )}>Delete Convo</Text>

             <TextInput
               onChangeText={(text) => this.props.setMessageBody(text)}
               value={this.props.messageBody}
               placeholder="Message.."/>

             <Button
               onPress={() => this.props.message(
                   this.props.token,
                   this.props.navigation.state.params.id,
                   this.props.messageBody
               )}
               title="Message"/>


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
    console.log(state.convoReducer.renameBody);
    return {
        convo: state.convoReducer.convo,
        convoMessages: state.convoReducer.convoMessages,
        convoUsers: state.convoReducer.convoUsers,
        renameBody: state.convoReducer.renameBody,
        messageBody: state.convoReducer.messageBody,
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Convo);
