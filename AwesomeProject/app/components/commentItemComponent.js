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

// import: actions
import * as Actions from '../actions/rootActions';

class CommentItem extends Component {
    render() {
        return (
            <View>
              <Text
                style={styles.text}>
                {this.props.item.creator_username} - {this.props.item.body} - {this.props.item.created_at} - Likes: {this.props.item.like_count} Dislikes: {this.props.item.dislike_count} Replies: {this.props.item.reply_count} </Text>
              <Text
                style={styles.text}
                onPress={() => this.props.navigation.navigate('Comment', {id: this.props.item.id})}>Reply</Text>

            <Button
               onPress={() => this.props.likeComment(
                   this.props.token,
                   this.props.item.id,
                   this.props.moji.data.id
               )}
               title="LikeComment"/>
              
            <Button
              onPress={() => this.props.dislikeComment(
                  this.props.token,
                  this.props.item.id,
                  this.props.moji.data.id
              )}
              title="DislikeComment"/>


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
