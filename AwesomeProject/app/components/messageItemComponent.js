// import: basics
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Button,
    FlatList,
    ListItem,
    Image,
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
import WordItem from './wordItemComponent';

// import: dumb component
import UserItem from './userItemComponent';

// import: dumb component
import Like from './likeComponent';

class MessageItem extends Component {
    constructor(props) {
        super(props);
        this.renderItemHandler = this.renderItemHandler.bind(this);
        this.findHandler = this.findHandler.bind(this);
    }

    componentDidMount() {
        const temp = this.props.item.body.filter(string => string.substring(0,3) === 'm/#');
        if (!Array.isArray(temp) || !temp.length) {
            // no mojis in body
            this.props.messageLoaded(this.props.index);
            return;
        }
        const temp1 = temp.map(string => string.replace('m/#', ''));
        const temp2 = temp1.reduce((acc, val) => acc.concat(val), []);

        let findMojis = [];
        let result = {};
        for(let i = 0; i < temp2.length; i++) {
            result = this.props.message_mojis_map.find(object => object.id == temp2[i]);

            if (result === undefined) {
                findMojis.push(temp2[i]);
            }
        }

        if (!Array.isArray(findMojis) || !findMojis.length) {
            // mojis found in local
            this.props.messageLoaded(this.props.index);
            return;
        }

        // get mojis from back end
        this.props.setMessageMojiMap(this.props.token, findMojis, this.props.index);
    }

    findHandler(item) {
        let result = this.props.message_mojis_map.find(object => object.id == item.substring(3, item.length));

        if (result === undefined) {
            return this.props.message_mojis_map.find(object => object.id == 1);
        }

        return result;
    }

    renderItemHandler(item) {
        if(item.substring(0,3) === 'm/#' && item.length > 3 && Number(item.substring(3, item.length) <= this.props.max_moji)) {
            return <MojiItemImage
            item={this.findHandler(item)}
            navigation={this.props.navigation}/>;
        }
        else {
            return <WordItem word={item}/>;
        }
    }

    render() {        
        if (!this.props.convo_messages_loading[this.props.index]) {
        return (
            <View>
              <UserItem
                id={this.props.item.creator_id}
                name={this.props.item.creator_name}
                type={'smallName'}
                navigation={this.props.navigation}/>

              <Text style={styles.text}>
                {this.props.item.created_at}: Likes {this.props.item.like_count}
              </Text>

              <FlatList
                data={this.props.item.body}
                style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}
                renderItem={({item}) => this.renderItemHandler(item)}
                keyExtractor={(item, index) => index.toString()}/>

              <Like item={this.props.item} prop_id={this.props.convo_id} type={'message'}/>
                
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
    // console.log('messageItem', state.mojiReducer.max_moji);
    return {
        token: state.authReducer.token,
        
        convo_id: state.navReducer.convo_id,
        
        max_moji: state.mojiReducer.max_moji,
        
        convo_messages_loading: state.convoReducer.convo_messages_loading,
        message_mojis_map: state.convoReducer.message_mojis_map,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(MessageItem);
