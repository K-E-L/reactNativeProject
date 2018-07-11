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

class Comment extends Component {
    constructor(props) {
        super(props);
        this.backHandler = this.backHandler.bind(this);
    }
    
    static navigationOptions = ({ navigation }) => ({
        title: 'Comment Replies', header: null
    });

    componentWillMount() {
        this.props.getCommentReplies(this.props.token, this.props.navigation.state.params.id);
    }

    refresh = () => {
        this.props.getCommentReplies(this.props.token, this.props.navigation.state.params.id);
    }

    backHandler() {
        this.props.navigation.pop();
    }

    render() {
        return (
            <PTRView onRefresh={this.refresh}>
              <View>                    
                <TouchableOpacity onPress={() => this.backHandler()}>
                  <Text style={styles.h3}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.h3}>Replies</Text>
                <TextInput
                  onChangeText={(text) => this.props.setReplyBody(text)}
                  value={this.props.replyBody}
                  placeholder="Reply.."
                  onSubmitEditing={() => this.props.reply(
                      this.props.token,
                      this.props.navigation.state.params.id,
                      this.props.replyBody
                  )}/>

                <TouchableOpacity onPress={() => this.props.reply(
                      this.props.token,
                      this.props.navigation.state.params.id,
                      this.props.replyBody
                  )}>
                  <Text style={styles.link}>Reply To Comment</Text>
                </TouchableOpacity>

                <FlatList
                  data={this.props.replies.data}
                  renderItem={({item}) =>
                  <ReplyItem item={item} commentID={this.props.navigation.state.params.id} navigation={this.props.navigation}/>}
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
    },
    link: {
        fontSize: 30,
        color: '#00a9ff'
    }
});

// Pass: redux state to props
function mapStateToProps(state, props) {
    // console.log(state.commentReducer.replyBody);
    return {
        replies: state.commentReducer.replies,
        replyBody: state.commentReducer.replyBody,
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
