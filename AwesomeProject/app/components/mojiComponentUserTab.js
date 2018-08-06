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

// import: pull to refresh
import PTRView from 'react-native-pull-to-refresh';

// import: keyboard component
import CollecKeyboard from './collecKeyboardComponent';

// import: moji input component
import MojiPreview from './mojiPreviewComponent';

// import: dumb component
import CommentItem from './commentItemComponent';

// import: dumb component
import UserItem from './userItemComponent';

// import: dumb component
import Like from './likeComponent';

// import: dumb component
import Dislike from './dislikeComponent';

// import: dumb component
import CollecButton from './collecButtonComponent';

class MojiUserTab extends Component {
    constructor(props) {
        super(props);
        this.backHandler = this.backHandler.bind(this);
        this.focusCommentHandler = this.focusCommentHandler.bind(this);
        this.endEditingCommentHandler = this.endEditingCommentHandler.bind(this);
        this.changeTextCommentHandler = this.changeTextCommentHandler.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Moji', header: null
    });

    componentDidMount() {
        this.props.getMaxMoji(this.props.token);
        this.props.getMojiUserTab(this.props.token, this.props.moji_stack_user_tab[this.props.moji_stack_user_tab.length - 1]);
        this.props.getMojiCommentsUserTab(this.props.token, this.props.moji_stack_user_tab[this.props.moji_stack_user_tab.length - 1]);
    }

    refresh = () => {
        this.props.getMaxMoji(this.props.token);
        this.props.getMojiUserTab(this.props.token, this.props.moji_stack_user_tab[this.props.moji_stack_user_tab.length - 1]);
        this.props.getMojiCommentsUserTab(this.props.token, this.props.moji_stack_user_tab[this.props.moji_stack_user_tab.length - 1]);
    }

    backHandler() {
        this.props.popNavMojiUserTab();
        if (this.props.moji_stack_user_tab.length !== 1) {
            this.props.getMojiUserTab(this.props.token, this.props.moji_stack_user_tab[this.props.moji_stack_user_tab.length - 2]);
            this.props.getMojiCommentsUserTab(this.props.token, this.props.moji_stack_user_tab[this.props.moji_stack_user_tab.length - 2]);
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
                  <Text style={styles.h3}>{this.props.moji_user_tab.data.name}</Text>
                <Image
                  style={{width: 20, height: 20}}
                  source={{uri: 'http://167.99.162.15/mojiStorage/' +
                           this.props.moji_user_tab.data.creator_id + '/' +
                  this.props.moji_user_tab.data.path}}/>
                <Text style={styles.text}>Moji #{this.props.moji_user_tab.data.id}</Text>

                <UserItem
                  id={this.props.moji_user_tab.data.creator_id}
                  username={this.props.moji_user_tab.data.creator_username}
                  type={'username'}
                  stack={'moji'}
                  navigation={this.props.navigation}/>

                <Text
                  style={styles.text}>Collecs: {this.props.moji_user_tab.data.collec_count}</Text>
                <Text
                  style={styles.text}>Likes: {this.props.moji_user_tab.data.like_count}</Text>
                <Text
                  style={styles.text}>Dislikes: {this.props.moji_user_tab.data.dislike_count}</Text>

                <CollecButton type={this.props.moji_user_tab.type}/>
                
                <Like item={this.props.moji_user_tab.data} prop_id={this.props.moji_stack_user_tab[this.props.moji_stack_user_tab.length - 1]} type={'moji'}/>

                <Dislike item={this.props.moji_user_tab.data} prop_id={this.props.moji_stack_user_tab[this.props.moji_stack_user_tab.length - 1]} type={'moji'}/>
                
                {this.props.moji_preview && <MojiPreview />}
                
                <TextInput
                  onChangeText={(text) => this.changeTextCommentHandler(text)}
                  value={this.props.comment_body}
                  placeholder="Comment.."
                  onFocus={() => this.focusCommentHandler()}
                  onEndEditing={() => this.endEditingCommentHandler()}
                  onSubmitEditing={() => this.props.comment(
                      this.props.token,
                      this.props.moji_stack_user_tab[this.props.moji_stack_user_tab.length - 1],
                      this.props.comment_body
                  )}/>

                {this.props.moji_keyboard && <CollecKeyboard />}

                <TouchableOpacity onPress={() => this.props.comment(
                      this.props.token,
                      this.props.moji_stack_user_tab[this.props.moji_stack_user_tab.length - 1],
                      this.props.comment_body
                  )}>
                  <Text style={styles.link}>Comment</Text>
                </TouchableOpacity>

                <TextInput
                  onChangeText={(text) => this.props.setReportBody(text)}
                  value={this.props.report_body}
                  placeholder="Report.."
                  onSubmitEditing={() => this.props.report(
                      this.props.token,
                      this.props.moji_stack_user_tab[this.props.moji_stack_user_tab.length - 1],
                      this.props.report_body
                  )}/>

                  <TouchableOpacity onPress={() => this.props.report(
                        this.props.token,
                        this.props.moji_stack_user_tab[this.props.moji_stack_user_tab.length - 1],
                        this.props.report_body
                    )}>
                    <Text style={styles.link}>Report</Text>
                  </TouchableOpacity>

                  <FlatList
                    data={this.props.moji_comments_user_tab}
                    renderItem={({item, index}) =>
                                <CommentItem
                                      item={item}
                                      index={index}
                                      tab={'user'}
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
    console.log('mojiUserTab', state.navReducer.moji_stack_user_tab);
    return {
        moji_user_tab: state.mojiReducer.moji_user_tab,
        moji_comments_user_tab: state.mojiReducer.moji_comments_user_tab,
        
        comment_body: state.mojiReducer.comment_body,
        report_body: state.mojiReducer.report_body,
        moji_keyboard: state.navReducer.moji_keyboard,
        moji_preview: state.navReducer.moji_preview,
        
        moji_stack_user_tab: state.navReducer.moji_stack_user_tab,

        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(MojiUserTab);
