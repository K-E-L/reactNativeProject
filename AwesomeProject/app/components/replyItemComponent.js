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

class ReplyItem extends Component {
    constructor(props) {
        super(props);
        this.renderItemHandler = this.renderItemHandler.bind(this);
    }

    componentDidMount() {
        this.props.setReplyMojiMap(this.props.token, this.props.item.body, this.props.index);
    }

    findHandler(item) {
        let result = this.props.reply_mojis_map.find(object => object.id == item.substring(3, item.length));

        if (result === undefined) {
            return this.props.reply_mojis_map.find(object => object.id == 1);
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
                style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}
                renderItem={({item, index}) => this.renderItemHandler(item, index)}
                keyExtractor={(item, index) => index.toString()}/>

              <Like item={this.props.item} prop_id={this.props.comment_id} type={'reply'}/>

              <Dislike item={this.props.item} prop_id={this.props.comment_id} type={'reply'}/>
              
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
        reply_mojis_map: state.commentReducer.reply_mojis_map,

        max_moji: state.mojiReducer.max_moji,
        reply_mojis_map: state.commentReducer.reply_mojis_map
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(ReplyItem);
