// import: basics
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Alert,
    Button,
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    ListItem,
    Platform,
    RefreshControl,
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

// import: dumb component
import UserItem from './userItemComponent';

class Convo extends Component {
    constructor(props) {
        super(props);
        this.destroyConvoHandler = this.destroyConvoHandler.bind(this);
        this.backHandler = this.backHandler.bind(this);
        this.setConvoHandler = this.setConvoHandler.bind(this);
        this.focusMessageHandler = this.focusMessageHandler.bind(this);
        this.endEditingMessageHandler = this.endEditingMessageHandler.bind(this);
        this.changeTextMessageHandler = this.changeTextMessageHandler.bind(this);
        this.findHandler = this.findHandler.bind(this);

        this.state = {
            refreshing: false,
        };
    }    

    static navigationOptions = ({ navigation }) => ({
        title: 'Convo', header: null
    });

    componentDidMount() {
        this.props.getMaxMoji(this.props.token);
        this.props.getConvo(this.props.token, this.props.convo_id);
        this.props.getConvoMessages(this.props.token, this.props.convo_id);
        this.props.getConvoUsers(this.props.token, this.props.convo_id);
    }
    
    refresh = () => {
        this.props.getMaxMoji(this.props.token);
        this.props.getConvo(this.props.token, this.props.convo_id);
        this.props.getConvoMessages(this.props.token, this.props.convo_id);
        this.props.getConvoUsers(this.props.token, this.props.convo_id);
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
        this.props.navigation.pop();
    }

    setConvoHandler(id, type) {
        this.props.setConvoID(id);
        this.props.setConvoType(type);
        this.props.navigation.push('Messagable');
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

    findHandler() {
        let result = this.props.convo_messages_map.find(object => object.itemID === this.props.convo_id);

        if (result === undefined) {
            return this.props.convo_messages_map.find(object => object.itemID === 0);
        }

        return result;
    }


    render() {
        return (
              //           <KeyboardAvoidingView
              // behavior={'padding'}
              // keyboardVerticalOffset={Platform.select({ios: 0, android: 0})}
            // style={{flex: 1}}>
            // <PTRView onRefresh={this.refresh}
            //          keyboardShouldPersistTaps='handled'>
            // <View>
              <ScrollView
                keyboardShouldPersistTaps='handled'
                ref={ref => this.scrollView = ref}
                overScrollMode="never"
                onContentSizeChange={(contentWidth, contentHeight)=>{                         this.scrollView.scrollToEnd({animated: true});
                }}
                // contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
                refreshControl={<RefreshControl
                              refreshing={this.state.refreshing}
                              onRefresh={this.refresh}/>}>

                <TouchableOpacity onPress={() => this.backHandler()}>
                  <Text style={styles.h3}>Back</Text>
                </TouchableOpacity>

              <TextInput
                style={styles.h3}
                onChangeText={(text) => this.props.setRenameBody(text)}
                value={this.props.rename_body}
                placeholder="Rename Convo"
                onSubmitEditing={() => this.props.renameConvo(
                    this.props.token,
                    this.props.convo_id,
                    this.props.rename_body
                )}/>

                <TouchableOpacity
                  onPress={() => this.props.renameConvo(
                      this.props.token,
                      this.props.convo_id,
                      this.props.rename_body
                  )}>
                  <Text style={styles.link}>Rename Convo</Text>
                </TouchableOpacity>
                                      
                <FlatList
                  data={this.props.convo_users}
                  renderItem={({item}) =>
                              <UserItem
                                    id={item.id}
                                    name={item.name}
                                    type={'smallName'}
                                navigation={this.props.navigation}/>}
                              keyExtractor={item => item.id.toString()}/>
                              
                <TouchableOpacity
                  onPress={() => this.setConvoHandler(
                      this.props.convo_id,
                  'addUser')}>
                  
                  <Text style={styles.link}>Add User</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.destroyConvoHandler(
                      this.props.token,
                      this.props.convo_id
                  )}>
                  <Text style={styles.link}>Leave Convo</Text>
                </TouchableOpacity>

                <FlatList                  
                  // data={this.props.convo_messages}
                  data={this.findHandler().itemMessages}
                  renderItem={({item, index}) =>
                              <MessageItem
                                    item={item}
                                    index={index}
                                navigation={this.props.navigation}/>}
                              keyExtractor={(item, index) => index.toString()}/>

                {this.props.moji_preview && <MojiPreview />}

                <TextInput
                  onChangeText={(text) => this.changeTextMessageHandler(text)}
                  value={this.props.message_body}
                  placeholder="Message.."
                  onFocus={() => this.focusMessageHandler()}
                  onEndEditing={() => this.endEditingMessageHandler()}
                  onSubmitEditing={() => this.props.message(
                      this.props.token,
                      this.props.convo_id,
                      this.props.message_body
                  )}/>

                <TouchableOpacity
                  onPress={() => this.props.message(
                      this.props.token,
                      this.props.convo_id,
                      this.props.message_body
                  )}>
                  <Text style={styles.link}>Message</Text>
                </TouchableOpacity>

                {this.props.moji_keyboard && <CollecKeyboard />}

              </ScrollView>
            // </View>
            // </PTRView>
            // </KeyboardAvoidingView>
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
    // console.log('convoCom', state.navReducer.convo_id,);
    // console.log('convoCom2', state.convoReducer.convo_messages[1]);
    // console.log('convoCom2', state.convoReducer.convo_messages_loading[1]);
    return {
        convo: state.convoReducer.convo,
        convo_messages: state.convoReducer.convo_messages,
        convo_users: state.convoReducer.convo_users,
        rename_body: state.convoReducer.rename_body,
        message_body: state.convoReducer.message_body,
        message_split: state.convoReducer.message_split,
        
        convo_messages_map: state.convoReducer.convo_messages_map,
        
        auth_user: state.userReducer.auth_user,
        
        convo_id: state.navReducer.convo_id,
        user_stack: state.navReducer.user_stack,
        moji_keyboard: state.navReducer.moji_keyboard,
        moji_preview: state.navReducer.moji_preview,
        
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Convo);
