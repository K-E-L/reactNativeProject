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

// import: dumb component
import UserItem from './userItemComponent';

// import: dumb component
import Like from './likeComponent';

// import: dumb component
import Dislike from './dislikeComponent';

class CommentItem extends Component {
    constructor(props) {
        super(props);
        this.renderItemHandler = this.renderItemHandler.bind(this);
        this.setCommentIdHandler = this.setCommentIdHandler.bind(this);
        this.findHandler = this.findHandler.bind(this);
    }

    componentDidMount() {
        this.props.setCommentMojiMap(this.props.token, this.props.item.body, this.props.index);
    }

    findHandler(item) {
        let result = this.props.comment_mojis_map.find(object => object.id == item.substring(3, item.length));

        if (result === undefined) {
            return this.props.comment_mojis_map.find(object => object.id == 1);
        }

        return result;
    }

    renderItemHandler(item, index) {
        if(item.substring(0,3) === 'm/#' && item.length > 3 && Number(item.substring(3, item.length) <= this.props.max_moji)) {
            return <MojiItemImage
            item={this.findHandler(item)}
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
        if (!this.props.moji_comments_loading[this.props.index]) {
            return (
                <View>
                  <UserItem
                    id={this.props.item.creator_id}
                    username={this.props.item.creator_username}
                    type={'username'}
                    navigation={this.props.navigation}/>

                  <Text style={styles.text}>
                    {this.props.item.created_at} - Likes: {this.props.item.like_count} Dislikes: {this.props.item.dislike_count} Replies: {this.props.item.reply_count}</Text>

                  <FlatList
                    data={this.props.item.body}
                    horizontal={true}
                    renderItem={({item, index}) => this.renderItemHandler(item, index)}
                    keyExtractor={(item, index) => index.toString()}/>
                  
                  <TouchableOpacity onPress={() => this.setCommentIdHandler(this.props.item.id)}>
                    <Text style={styles.link}>Reply</Text>
                  </TouchableOpacity>

                  <Like item={this.props.item} prop_id={this.props.moji.data.id} type={'comment'}/>

                  <Dislike item={this.props.item} prop_id={this.props.moji.data.id} type={'comment'}/>

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
    console.log('commentItem', state.mojiReducer.comment_mojis_map);
    return {
        token: state.authReducer.token,
        
        moji: state.mojiReducer.moji,
        moji_comments_loading: state.mojiReducer.moji_comments_loading,
        comment_mojis_map: state.mojiReducer.comment_mojis_map,
        max_moji: state.mojiReducer.max_moji,

        comment_mojis_map: state.mojiReducer.comment_mojis_map
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
