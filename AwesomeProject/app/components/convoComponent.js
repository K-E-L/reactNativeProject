// import: basics
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Alert,
    Button,
    FlatList,
    Keyboard,
    ListItem,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// import: actions
import * as Actions from '../actions/rootActions';

// import: dumb components
import MessageItem from'./messageItemComponent';

// import: keyboard component
import CollecKeyboard from './collecKeyboardComponent';

// import: moji input component
import MojiPreview from './mojiPreviewComponent';

// import: pull to refresh
import PTRView from 'react-native-pull-to-refresh';

class Convo extends Component {
    constructor(props) {
        super(props);
        this.destroyConvoHandler = this.destroyConvoHandler.bind(this);
        this.pushNavUserHandler = this.pushNavUserHandler.bind(this);
        this.backHandler = this.backHandler.bind(this);
        this.setConvoHandler = this.setConvoHandler.bind(this);
        this.focusMessageHandler = this.focusMessageHandler.bind(this);
        this.endEditingMessageHandler = this.endEditingMessageHandler.bind(this);
        this.changeTextMessageHandler = this.changeTextMessageHandler.bind(this);
        this.searchAndDestroy = this.searchAndDestroy.bind(this);
    }    

    static navigationOptions = ({ navigation }) => ({
        title: 'Convo', header: null
    });

    componentDidMount() {
        this.props.getConvo(this.props.token, this.props.convoID);
        this.props.getConvoMessages(this.props.token, this.props.convoID);
        this.props.getConvoUsers(this.props.token, this.props.convoID);
        this.searchAndDestroy(this.props.token, this.props.convoName);
    }
    
    refresh = () => {
        this.props.getConvo(this.props.token, this.props.convoID);
        this.props.getConvoMessages(this.props.token, this.props.convoID);
        this.props.getConvoUsers(this.props.token, this.props.convoID);
        this.searchAndDestroy(this.props.token, this.props.convoName);
    }

    searchAndDestroy(token, name) {
        let obj = this.props.convoNotifs.find(function (obj) { return (obj.spec_type === name && obj.read === 0); });

        if (typeof obj !== "undefined") {
            this.props.destroyNotif(token, obj.id);
        }
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
        this.props.navigation.navigate('Convos');
    }

    backHandler() {
        this.props.getConvos(this.props.token);
        this.props.clearLoaded();
        this.props.navigation.pop();
    }

    setConvoHandler(id, type) {
        this.props.setConvoID(id);
        this.props.setConvoType(type);
        this.props.navigation.push('Messagable');
    }

    pushNavUserHandler(item) {
        this.props.pushNavUser(item.id);
        this.props.navigation.push('User');
    }

    focusMessageHandler() {
        this.props.toggleMojiKeyboard(true);
        this.props.setMojiKeyboardType('Message');
        this.props.toggleMojiPreview(true);
        this.props.setMojiPreviewType('Message');
    }

    endEditingMessageHandler() {
        this.props.toggleMojiKeyboard(false);
        this.props.toggleMojiPreview(false);
    }

    changeTextMessageHandler(text) {
        this.props.setMessageBody(text);
        this.props.splitMessageBody();
    }

    render() {
        return (
            <PTRView onRefresh={this.refresh}
              keyboardShouldPersistTaps='handled'>
                <TouchableOpacity onPress={() => this.backHandler()}>
                  <Text style={styles.h3}>Back</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.h3}
                  onChangeText={(text) => this.props.setRenameBody(text)}
                  value={this.props.renameBody}
                  placeholder="Rename Convo"
                  onSubmitEditing={() => this.props.renameConvo(
                      this.props.token,
                      this.props.convoID,
                      this.props.renameBody
                  )}/>

                <TouchableOpacity
                  onPress={() => this.props.renameConvo(
                      this.props.token,
                      this.props.convoID,
                      this.props.renameBody
                  )}>
                  <Text style={styles.link}>Rename Convo</Text>
                </TouchableOpacity>
                                      
                <FlatList
                  data={this.props.convoUsers}
                  renderItem={({item}) =>
                              <Text
                                    onPress={() => this.pushNavUserHandler(item)}
                                    style={styles.text}>
                                    {item.name}
                              </Text>}
                              keyExtractor={item => item.id.toString()}/>
                              
                <TouchableOpacity
                  onPress={() => this.setConvoHandler(
                      this.props.convo.id,
                  'addUser')}>
                  
                  <Text style={styles.link}>Add User</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.destroyConvoHandler(
                      this.props.token,
                      this.props.convo.id
                  )}>
                  <Text style={styles.link}>Leave Convo</Text>
                </TouchableOpacity>

                {this.props.mojiPreview && <MojiPreview />}

                <TextInput
                  onChangeText={(text) => this.changeTextMessageHandler(text)}
                  value={this.props.messageBody}
                  placeholder="Message.."
                  onFocus={() => this.focusMessageHandler()}
                  onEndEditing={() => this.endEditingMessageHandler()}
                  onSubmitEditing={() => this.props.message(
                      this.props.token,
                      this.props.convoID,
                      this.props.messageBody
                  )}/>

                <TouchableOpacity
                  onPress={() => this.props.message(
                      this.props.token,
                      this.props.convoID,
                      this.props.messageBody
                  )}>
                  <Text style={styles.link}>Message</Text>
                </TouchableOpacity>

                {this.props.mojiKeyboard && <CollecKeyboard />}

                <FlatList
                  data={this.props.convoMessages}
                  renderItem={({item, index}) =>
                              <MessageItem
                                    item={item}
                                    index={index}
                                navigation={this.props.navigation}/>}
                              keyExtractor={(item, index) => index.toString()}/>
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
    },
    link: {
        fontSize: 30,
        color: '#00a9ff'
    }
});

// Pass: redux state to props
function mapStateToProps(state, props) {
    // console.log('convoCom', state.convoReducer.convoMessages);
    return {
        convo: state.convoReducer.convo,
        convoMessages: state.convoReducer.convoMessages,
        convoUsers: state.convoReducer.convoUsers,
        renameBody: state.convoReducer.renameBody,
        messageBody: state.convoReducer.messageBody,
        authUser: state.userReducer.authUser,
        convoID: state.navReducer.convoID,
        convoName: state.navReducer.convoName,
        userStack: state.navReducer.userStack,
        mojiKeyboard: state.navReducer.mojiKeyboard,
        mojiPreview: state.navReducer.mojiPreview,
        messageSplit: state.convoReducer.messageSplit,

        convoNotifs: state.userReducer.convoNotifs,
        
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Convo);
