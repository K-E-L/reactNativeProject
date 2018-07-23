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

class Moji extends Component {
    constructor(props) {
        super(props);
        this.collecHandler = this.collecHandler.bind(this);
        this.backHandler = this.backHandler.bind(this);
        this.pushNavUserHandler = this.pushNavUserHandler.bind(this);
        this.focusCommentHandler = this.focusCommentHandler.bind(this);
        this.endEditingCommentHandler = this.endEditingCommentHandler.bind(this);
        this.changeTextCommentHandler = this.changeTextCommentHandler.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Moji', header: null
    });

    componentDidMount() {
        this.props.getMoji(this.props.token, this.props.mojiID);
        this.props.getMojiComments(this.props.token, this.props.mojiID);
    }

    refresh = () => {
        this.props.getMoji(this.props.token, this.props.mojiID);
        this.props.getMojiComments(this.props.token, this.props.mojiID);
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
        if (this.props.mojiStack.length !== 1) {
            this.props.getMoji(this.props.token, this.props.mojiStack[this.props.mojiStack.length - 2]);
            this.props.getMojiComments(this.props.token, this.props.mojiStack[this.props.mojiStack.length - 2]);
        }
        this.props.navigation.pop();
    }    

    pushNavUserHandler(itemID) {
        this.props.pushNavUser(itemID);
        this.props.navigation.push('User');
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
                <Text
                  style={styles.text}
                  onPress={() => this.pushNavUserHandler(this.props.moji.data.creator_id)}
                  >By: {this.props.moji.data.creator_username}</Text>
                <Text
                  style={styles.text}>Collecs: {this.props.moji.data.collec_count}</Text>
                <Text
                  style={styles.text}>Likes: {this.props.moji.data.like_count}</Text>
                <Text
                  style={styles.text}>Dislikes: {this.props.moji.data.dislike_count}</Text>
                <TouchableOpacity onPress={() => this.collecHandler(
                      this.props.token,
                      this.props.mojiID,
                      this.props.moji.type
                  )}>
                  <Text style={styles.link}>{this.props.moji.type}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.likeMoji(
                      this.props.token,
                      this.props.mojiID
                  )}>
                  <Text style={styles.link}>Like</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => this.props.dislikeMoji(
                      this.props.token,
                      this.props.mojiID
                  )}>
                  <Text style={styles.link}>Dislike</Text>
                </TouchableOpacity>

                {this.props.mojiPreview && <MojiPreview />}
                
                <TextInput
                  onChangeText={(text) => this.changeTextCommentHandler(text)}
                  value={this.props.commentBody}
                  placeholder="Comment.."
                  onFocus={() => this.focusCommentHandler()}
                  onEndEditing={() => this.endEditingCommentHandler()}
                  onSubmitEditing={() => this.props.comment(
                      this.props.token,
                      this.props.mojiID,
                      this.props.commentBody
                  )}/>

                  <TouchableOpacity onPress={() => this.props.comment(
                      this.props.token,
                      this.props.mojiID,
                      this.props.commentBody
                  )}>
                    <Text style={styles.link}>Comment</Text>
                  </TouchableOpacity>

                  {this.props.mojiKeyboard && <CollecKeyboard />}

                <TextInput
                  onChangeText={(text) => this.props.setReportBody(text)}
                  value={this.props.reportBody}
                  placeholder="Report.."
                  onSubmitEditing={() => this.props.report(
                      this.props.token,
                      this.props.mojiID,
                      this.props.reportBody
                  )}/>

                  <TouchableOpacity onPress={() => this.props.report(
                        this.props.token,
                        this.props.mojiID,
                        this.props.reportBody
                    )}>
                    <Text style={styles.link}>Report</Text>
                  </TouchableOpacity>

                  <FlatList
                    data={this.props.mojiComments}
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
    console.log('moji', state.navReducer.mojiStack);
    return {
        token: state.authReducer.token,
        moji: state.mojiReducer.moji,
        mojiComments: state.mojiReducer.mojiComments,
        commentBody: state.mojiReducer.commentBody,
        reportBody: state.mojiReducer.reportBody,
        mojiID: state.navReducer.mojiID,
        mojiKeyboard: state.navReducer.mojiKeyboard,
        mojiPreview: state.navReducer.mojiPreview,
        commentSplit: state.convoReducer.commentSplit,
        
        mojiStack: state.navReducer.mojiStack,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Moji);
