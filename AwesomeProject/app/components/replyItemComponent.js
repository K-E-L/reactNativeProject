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

class ReplyItem extends Component {
    render() {
        return (
            <View>
              <Text
                style={styles.text}>
                {this.props.item.creator_username} - {this.props.item.body} - {this.props.item.created_at} - Likes: {this.props.item.like_count} Dislikes: {this.props.item.dislike_count}</Text>
            <Button
                onPress={() => this.props.likeReply(
                    this.props.token,
                    this.props.item.id,
                    this.props.commentID
                )}
                title="LikeReply"/>
                
            <Button
                onPress={() => this.props.dislikeReply(
                    this.props.token,
                    this.props.item.id,
                    this.props.commentID
                )}
                title="DislikeReply"/>
                


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
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(ReplyItem);
