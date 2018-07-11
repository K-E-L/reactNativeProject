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

class CommentItem extends Component {
    render() {
        return (
            <View>
              <Text
                style={styles.text}>
                {this.props.item.creator_username} - {this.props.item.body} - {this.props.item.created_at} - Likes: {this.props.item.like_count} Dislikes: {this.props.item.dislike_count} Replies: {this.props.item.reply_count} </Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', {id: this.props.item.id})}>
                <Text style={styles.link}>Reply</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.likeComment(
                    this.props.token,
                    this.props.item.id,
                    this.props.moji.data.id
                )}>
                <Text style={styles.link}>Like</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.dislikeComment(
                    this.props.token,
                    this.props.item.id,
                    this.props.moji.data.id
                )}>
                <Text style={styles.link}>Dislike</Text>
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
    return {
        moji: state.mojiReducer.moji,
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
