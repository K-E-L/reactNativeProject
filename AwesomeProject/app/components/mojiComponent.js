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
    TouchableHighlight,
    View
} from 'react-native';

// import: actions
import * as Actions from '../actions/rootActions';

// import: dumb component
import CommentItem from './commentItemComponent';

// import: keyboard component
import CollecKeyboard from './collecKeyboardComponent';

// import: moji input component
import MojiPreview from './mojiPreviewComponent';

// import: pull to refresh
import PTRView from 'react-native-pull-to-refresh';

// import: dumb component
import UserItem from './userItemComponent';

class Moji extends Component {
    constructor(props) {
        super(props);
        this.collecHandler = this.collecHandler.bind(this);
        this.backHandler = this.backHandler.bind(this);
        this.focusCommentHandler = this.focusCommentHandler.bind(this);
        this.endEditingCommentHandler = this.endEditingCommentHandler.bind(this);
        this.changeTextCommentHandler = this.changeTextCommentHandler.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Moji', header: null
    });

    componentDidMount() {
        this.props.getMoji(this.props.token, this.props.moji_stack[this.props.moji_stack.length - 1]);
        this.props.getMojiComments(this.props.token, this.props.moji_stack[this.props.moji_stack.length - 1]);
    }

    refresh = () => {
        this.props.getMoji(this.props.token, this.props.moji_stack[this.props.moji_stack.length - 1]);
        this.props.getMojiComments(this.props.token, this.props.moji_stack[this.props.moji_stack.length - 1]);
    }

    collecHandler = (login_cred, id, type) => {
        Alert.alert(
            this.props.moji.type + 'ting',
            this.props.moji.type + 'ted',
            [{text: 'Ok'}],
            { cancelable: false }
        );

        this.props.CollecUncollec(login_cred, id, type);
    }
    
    backHandler() {
        this.props.popNavMoji();
        if (this.props.moji_stack.length !== 1) {
            this.props.getMoji(this.props.token, this.props.moji_stack[this.props.moji_stack.length - 2]);
            this.props.getMojiComments(this.props.token, this.props.moji_stack[this.props.moji_stack.length - 2]);
        }
        this.props.navigation.pop();
    }    

    focusCommentHandler() {
        this.props.toggleMojiKeyboard(true);
        this.props.setMojiKeyboardType('Comment');
        this.props.toggleMojiPreview(true);
        this.props.setMojiPreviewType('Comment');
    }

    endEditingCommentHandler() {
        this.props.toggleMojiKeyboard(false);
        this.props.toggleMojiPreview(false);
    }

    changeTextCommentHandler(text) {
        this.props.setCommentBody(text);
        this.props.splitCommentBody();
    }

    render() {
        return (
            <PTRView onRefresh={this.refresh}
                     keyboardShouldPersistTaps='handled'>
                <TouchableOpacity onPress={() => this.backHandler()}>
                  <Text style={styles.h3}>Back</Text>
                </TouchableOpacity>
                  <Text style={styles.h3}>{this.props.moji.data.name}</Text>
                <Image
                  style={{width: 20, height: 20}}
                  source={{uri: 'http://167.99.162.15/mojiStorage/' +
                           this.props.moji.data.creator_id + '/' +
                  this.props.moji.data.path}}/>
                <Text style={styles.text}>Moji #{this.props.moji.data.id}</Text>

                <UserItem
                  id={this.props.moji.data.creator_id}
                  username={this.props.moji.data.creator_username}
                  type={'username'}
                  navigation={this.props.navigation}/>

                <Text
                  style={styles.text}>Collecs: {this.props.moji.data.collec_count}</Text>
                <Text
                  style={styles.text}>Likes: {this.props.moji.data.like_count}</Text>
                <Text
                  style={styles.text}>Dislikes: {this.props.moji.data.dislike_count}</Text>
                <TouchableOpacity onPress={() => this.collecHandler(
                      this.props.token,
                      this.props.moji_stack[this.props.moji_stack.length - 1],
                      this.props.moji.type
                  )}>
                  <Text style={styles.link}>{this.props.moji.type}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.likeMoji(
                      this.props.token,
                      this.props.moji_stack[this.props.moji_stack.length - 1]
                  )}>
                  <Text style={styles.link}>Like</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => this.props.dislikeMoji(
                      this.props.token,
                      this.props.moji_stack[this.props.moji_stack.length - 1]
                  )}>
                  <Text style={styles.link}>Dislike</Text>
                </TouchableOpacity>

                {this.props.moji_preview && <MojiPreview />}
                
                <TextInput
                  onChangeText={(text) => this.changeTextCommentHandler(text)}
                  value={this.props.comment_body}
                  placeholder="Comment.."
                  onFocus={() => this.focusCommentHandler()}
                  onEndEditing={() => this.endEditingCommentHandler()}
                  onSubmitEditing={() => this.props.comment(
                      this.props.token,
                      this.props.moji_stack[this.props.moji_stack.length - 1],
                      this.props.comment_body
                  )}/>

                  <TouchableOpacity onPress={() => this.props.comment(
                      this.props.token,
                      this.props.moji_stack[this.props.moji_stack.length - 1],
                      this.props.comment_body
                  )}>
                    <Text style={styles.link}>Comment</Text>
                  </TouchableOpacity>

                  {this.props.moji_keyboard && <CollecKeyboard />}

                <TextInput
                  onChangeText={(text) => this.props.setReportBody(text)}
                  value={this.props.report_body}
                  placeholder="Report.."
                  onSubmitEditing={() => this.props.report(
                      this.props.token,
                      this.props.moji_stack[this.props.moji_stack.length - 1],
                      this.props.report_body
                  )}/>

                  <TouchableOpacity onPress={() => this.props.report(
                        this.props.token,
                        this.props.moji_stack[this.props.moji_stack.length - 1],
                        this.props.report_body
                    )}>
                    <Text style={styles.link}>Report</Text>
                  </TouchableOpacity>

                  <FlatList
                    data={this.props.moji_comments}
                    renderItem={({item, index}) =>
                                <CommentItem
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
    console.log('moji', state.navReducer.moji_stack);
    return {
        moji: state.mojiReducer.moji,
        moji_comments: state.mojiReducer.moji_comments,
        comment_body: state.mojiReducer.comment_body,
        report_body: state.mojiReducer.report_body,
        
        // moji_id: state.navReducer.moji_id,
        moji_keyboard: state.navReducer.moji_keyboard,
        moji_preview: state.navReducer.moji_preview,
        moji_stack: state.navReducer.moji_stack,

        token: state.authReducer.token,
        
        // comment_split: state.convoReducer.comment_split,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Moji);
