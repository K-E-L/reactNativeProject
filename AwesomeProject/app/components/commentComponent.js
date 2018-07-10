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

// import: pull to refresh
import PTRView from 'react-native-pull-to-refresh';

// import: actions
import * as Actions from '../actions/rootActions';

// import: dumb component
import ReplyItem from './replyItemComponent';

class Comment extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Comment Replies'
    });

    componentWillMount() {
        this.props.getCommentReplies(this.props.token, this.props.navigation.state.params.id);
    }

    refresh = () => {
        this.props.getCommentReplies(this.props.token, this.props.navigation.state.params.id);
    }

    render() {
        return (
            <PTRView onRefresh={this.refresh}>
            <View>
              <FlatList
                data={this.props.replies.data}
                renderItem={({item}) =>
                <ReplyItem item={item} commentID={this.props.navigation.state.params.id} navigation={this.props.navigation}/>}
                keyExtractor={item => item.id.toString()}/>
              <TextInput
                onChangeText={(text) => this.props.setReplyBody(text)}
                value={this.props.replyBody}
                placeholder="Reply.."
                onSubmitEditing={() => this.props.reply(
                    this.props.token,
                    this.props.navigation.state.params.id,
                    this.props.replyBody
                )}/>

              <Button
                onPress={() => this.props.reply(
                    this.props.token,
                    this.props.navigation.state.params.id,
                    this.props.replyBody
                )}
                title="Reply"/>
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
