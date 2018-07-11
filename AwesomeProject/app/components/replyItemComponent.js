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

// import: actions
import * as Actions from '../actions/rootActions';

class ReplyItem extends Component {
    render() {
        return (
            <View>
              <Text
                style={styles.text}>
                {this.props.item.creator_username} - {this.props.item.body} - {this.props.item.created_at} - Likes: {this.props.item.like_count} Dislikes: {this.props.item.dislike_count}</Text>

              <TouchableOpacity onPress={() => this.props.likeReply(
                    this.props.token,
                    this.props.item.id,
                    this.props.commentID
                )}>
                <Text style={styles.link}>Like</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => this.props.dislikeReply(
                    this.props.token,
                    this.props.item.id,
                    this.props.commentID
                )}>
                <Text style={styles.link}>Dislike</Text>
              </TouchableOpacity>

              <TextInput
                onChangeText={(text) => this.props.setReplyBody(text)}
                value={this.props.replyBody}
                placeholder="Reply.."
                onSubmitEditing={() => this.props.reply(
                    this.props.token,
                    this.props.navigation.state.params.id,
                    this.props.replyBody,
                    this.props.item.creator_username
                )}/>

              <TouchableOpacity onPress={() => this.props.reply(
                    this.props.token,
                    this.props.navigation.state.params.id,
                    this.props.replyBody,
                    this.props.item.creator_username
                )}>
                <Text style={styles.link}>Reply @{this.props.item.creator_username}</Text>
              </TouchableOpacity>


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
    },
    link: {
        fontSize: 30,
        color: '#00a9ff'
    }
});

// Pass: redux state to props
function mapStateToProps(state, props) {
    console.log(state.commentReducer.replyBody);
    return {
        replyBody: state.commentReducer.replyBody,
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(ReplyItem);
