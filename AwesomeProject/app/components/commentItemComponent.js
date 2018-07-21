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

// import: dumb component
import MojiItemImage from './mojiItemImageComponent';

class CommentItem extends Component {
    constructor(props) {
        super(props);
        this.renderItemHandler = this.renderItemHandler.bind(this);
        this.setCommentIdHandler = this.setCommentIdHandler.bind(this);

        // get from server later
        this.maxNumber = 2;
    }

    componentDidMount() {
        this.props.setCommentMojiMap(this.props.token, this.props.item.body, this.props.index);
    }

    renderItemHandler(item, index) {
        if(item.substring(0,3) === 'm/#' && item.length > 3 && Number(item.substring(3, item.length) <= this.maxNumber)) {
            return <MojiItemImage
            item={this.props.commentMojisMap.find(object => object.id == item.substring(3, item.length))}
            navigation={this.props.navigation}/>;
        }
        else {
            return <Text style={styles.text}>{item + ' '}</Text>;
        }
    }

    setCommentIdHandler(id) {
        this.props.setCommentID(id);
        this.props.navigation.navigate('Comment');
    }    

    render() {
        if (!this.props.mojiCommentsLoading[this.props.index]) {
            return (
                <View>
                  <Text style={styles.text}>
                    {this.props.item.creator_username} - {this.props.item.created_at} - Likes: {this.props.item.like_count} Dislikes: {this.props.item.dislike_count} Replies: {this.props.item.reply_count}</Text>

                  <FlatList
                    data={this.props.item.body}
                    horizontal={true}
                    renderItem={({item, index}) => this.renderItemHandler(item, index)}
                    keyExtractor={(item, index) => index.toString()}/>
                  
                  <TouchableOpacity onPress={() => this.setCommentIdHandler(this.props.item.id)}>
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
        else {
            return  (
                <Text style={styles.h3}>Loading..</Text>
            );
        }
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
    // console.log('commentItem', state.mojiReducer.mojiCommentsLoading);
    return {
        token: state.authReducer.token,
        moji: state.mojiReducer.moji,
        mojiCommentsLoading: state.mojiReducer.mojiCommentsLoading,               commentMojisMap: state.mojiReducer.commentMojisMap
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
