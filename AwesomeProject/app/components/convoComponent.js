// import: basics
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Alert,
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

// import: dumb component
import MessageItem from'./messageItemComponent';

// import: pull to refresh
import PTRView from 'react-native-pull-to-refresh';

class Convo extends Component {
    constructor(props) {
        super(props);
        this.destroyConvoHandler = this.destroyConvoHandler.bind(this);
        this.pushNavUserHandler = this.pushNavUserHandler.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Convo', header: null
    });

    componentWillMount() {
        this.props.getConvo(this.props.token, this.props.navigation.state.params.id);
        this.props.getConvoMessages(this.props.token, this.props.navigation.state.params.id);
        this.props.getConvoUsers(this.props.token, this.props.navigation.state.params.id);
    }

    refresh = () => {
        this.props.getConvo(this.props.token, this.props.navigation.state.params.id);
        this.props.getConvoMessages(this.props.token, this.props.navigation.state.params.id);
        this.props.getConvoUsers(this.props.token, this.props.navigation.state.params.id);
    }

    destroyConvoHandler(login_cred, id) {
        // alert
        Alert.alert(
            'Left Convo',
            'Left Convo',
            [{text: 'Ok'}],
            { cancelable: false }
        );
        
        this.props.destroyConvo(login_cred, id);
        this.props.navigation.navigate('Convos', {id: this.props.authUser.data.id});
    }

    pushNavUserHandler(item) {
        this.props.pushNavUser(item.id);
        this.props.navigation.push('User', {id: item.id});
    }

    backHandler() {
        this.props.navigation.pop();
    }

    render() {
        return (
            <PTRView onRefresh={this.refresh}>              
              <View>
                <Text style={styles.h3}
                  onPress={() => this.backHandler()}>Back</Text>
                <TextInput
                  style={styles.h3}
                  onChangeText={(text) => this.props.setRenameBody(text)}
                  value={this.props.renameBody}
                  placeholder="Rename Convo"
                  onSubmitEditing={() => this.props.renameConvo(
                      this.props.token,
                      this.props.navigation.state.params.id,
                      this.props.renameBody
                  )}/>

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
                                    onPress={() => this.pushNavUserHandler(item)}
                                    style={styles.text}>
                                    {item.name}
                              </Text>}
                              keyExtractor={item => item.id.toString()}/>
                              
                <Button
                  onPress={() => this.props.navigation.push(
                      'Messagable', {
                          convoID: this.props.convo.id,
                          type: 'addUser'
                  })}
                  title="Add User"/>

                <Text
                  style={styles.h3}
                  onPress={() => this.destroyConvoHandler(
                      this.props.token,
                      this.props.convo.id
                  )}>Leave Convo</Text>

                <TextInput
                  onChangeText={(text) => this.props.setMessageBody(text)}
                  value={this.props.messageBody}
                  placeholder="Message.."
                  onSubmitEditing={() => this.props.message(
                      this.props.token,
                      this.props.navigation.state.params.id,
                      this.props.messageBody
                  )}/>

                <Button
                  onPress={() => this.props.message(
                      this.props.token,
                      this.props.navigation.state.params.id,
                      this.props.messageBody
                  )}
                  title="Message"/>

                <FlatList
                  data={this.props.convoMessages.data}
                  renderItem={({item}) =>
                              <MessageItem
                                    item={item}
                                    convoID={this.props.navigation.state.params.id}
                                navigation={this.props.navigation}/>}
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
        authUser: state.userReducer.authUser,
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Convo);
