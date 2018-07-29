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
    TouchableOpacity,
    View
} from 'react-native';

// import: pull to refresh
import PTRView from 'react-native-pull-to-refresh';

// import: actions
import * as Actions from '../actions/rootActions';

// import: dumb component
import ReplyItem from './replyItemComponent';

// import: keyboard component
import CollecKeyboard from './collecKeyboardComponent';

// import: moji input component
import MojiPreview from './mojiPreviewComponent';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.backHandler = this.backHandler.bind(this);
        this.focusReplyHandler = this.focusReplyHandler.bind(this);
    }
    
    static navigationOptions = ({ navigation }) => ({
        title: 'Comment Replies', header: null
    });

    componentDidMount() {
        this.props.getMaxMoji(this.props.token);
        this.props.getCommentReplies(this.props.token, this.props.comment_id);
    }

    refresh = () => {
        this.props.getMaxMoji(this.props.token);
        this.props.getCommentReplies(this.props.token, this.props.comment_id);
    }

    backHandler() {
        this.props.navigation.pop();
    }

    focusReplyHandler() {
        this.props.toggleMojiKeyboard(true);
        this.props.setMojiKeyboardType('Reply');
        this.props.toggleMojiPreview(true);
        this.props.setMojiPreviewType('Reply');
    }

    endEditingReplyHandler() {
        this.props.toggleMojiKeyboard(false);
        this.props.toggleMojiPreview(false);
    }

    changeTextReplyHandler(text) {
        this.props.setReplyBody(text);
        this.props.splitReplyBody();
    }

    render() {
        return (
            <PTRView onRefresh={this.refresh}
                     keyboardShouldPersistTaps='handled'>
              <View>                    
                <TouchableOpacity onPress={() => this.backHandler()}>
                  <Text style={styles.h3}>Back</Text>
                </TouchableOpacity>

                {this.props.moji_preview && <MojiPreview />}
                
                <TextInput
                  onChangeText={(text) => this.changeTextReplyHandler(text)}
                  value={this.props.reply_body}
                  placeholder="Reply.."
                  onFocus={() => this.focusReplyHandler()}
                  onEndEditing={() => this.endEditingReplyHandler()}
                  onSubmitEditing={() => this.props.reply(
                      this.props.token,
                      this.props.comment_id,
                      this.props.reply_body
                  )}/>

                <TouchableOpacity onPress={() => this.props.reply(
                      this.props.token,
                      this.props.comment_id,
                      this.props.reply_body
                  )}>
                  <Text style={styles.link}>Reply</Text>
                </TouchableOpacity>

                {this.props.moji_keyboard && <CollecKeyboard />}
                
                <FlatList
                  data={this.props.replies}
                  renderItem={({item, index}) =>
                              <ReplyItem
                                    item={item}
                                    index={index}
                                navigation={this.props.navigation}/>}
                              keyExtractor={(item, index) => index.toString()}/>
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
    },
    link: {
        fontSize: 30,
        color: '#00a9ff'
    }
});

// Pass: redux state to props
function mapStateToProps(state, props) {
    // console.log('comment', state.mojiReducer.max_moji);
    return {
        replies: state.commentReducer.replies,
        reply_body: state.commentReducer.reply_body,
        
        comment_id: state.navReducer.comment_id,
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
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
