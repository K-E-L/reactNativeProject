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

class ReplyItem extends Component {
    constructor(props) {
        super(props);
        this.renderItemHandler = this.renderItemHandler.bind(this);

        // get from server later
        this.maxNumber = 2;
    }

    componentDidMount() {
        this.props.setReplyMojiMap(this.props.token, this.props.item.body, this.props.index);
    }
    
    renderItemHandler(item, index) {
        if(item.substring(0,3) === 'm/#' && item.length > 3 && Number(item.substring(3, item.length) <= this.maxNumber)) {
            return <MojiItemImage
            item={this.props.reply_mojis_map.find(object => object.id == item.substring(3, item.length))}
            navigation={this.props.navigation}/>;
        }
        else {
            return <Text style={styles.text}>{item + ' '}</Text>;
        }
    }
    
    render() {
        if (!this.props.comment_replies_loading[this.props.index]) {
        return (
            <View>

              <UserItem
                id={this.props.item.creator_id}
                username={this.props.item.creator_username}
                type={'username'}
                navigation={this.props.navigation}/>
              
              <Text style={styles.text}>
                {this.props.item.created_at} - Likes: {this.props.item.like_count} Dislikes: {this.props.item.dislike_count}</Text>

              <FlatList
                data={this.props.item.body}
                horizontal={true}
                renderItem={({item, index}) => this.renderItemHandler(item, index)}
                keyExtractor={(item, index) => index.toString()}/>


              <TouchableOpacity onPress={() => this.props.likeReply(
                    this.props.token,
                    this.props.item.id,
                    this.props.comment_id
                )}>
                <Text style={styles.link}>Like</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => this.props.dislikeReply(
                    this.props.token,
                    this.props.item.id,
                    this.props.comment_id
                )}>
                <Text style={styles.link}>Dislike</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.setReplyBody('@' + this.props.item.creator_username + ' ')}>
                <Text style={styles.link}>Reply @{this.props.item.creator_username}</Text>
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
    // console.log('replyItem', state.commentReducer.comment_replies_loading);
    return {
        token: state.authReducer.token,
        comment_id: state.navReducer.comment_id,
        comment_replies_loading: state.commentReducer.comment_replies_loading,
        reply_mojis_map: state.commentReducer.reply_mojis_map
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(ReplyItem);
