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

class MessageItem extends Component {
    constructor(props) {
        super(props);
        this.renderItemHandler = this.renderItemHandler.bind(this);

        // get from server later
        this.maxNumber = 2;
    }

    // stopped here.. rendering from the map but mojis aren't there..
    componentDidMount() {
        this.props.setMessageMojiMap(this.props.token, this.props.item.body, this.props.index);
    }

    renderItemHandler(item) {
        if(item.substring(0,3) === 'm/#' && item.length > 3 && Number(item.substring(3, item.length) <= this.maxNumber)) {
            return <MojiItemImage
            item={this.props.message_mojis_map.find(object => object.id == item.substring(3, item.length))}
            navigation={this.props.navigation}/>;
        }
        else {
            // this.props.triggerStateChange();
            return <WordItem word={item}/>;
        }
    }

    render() {        
        if (!this.props.convo_messages_loading[this.props.index]) {
        return (
            <View>
              <Text style={styles.text}>
                {this.props.item.creator_name}: {this.props.item.created_at}: Likes {this.props.item.like_count}
              </Text>

              <FlatList
                data={this.props.item.body}
                horizontal={true}
                renderItem={({item}) => this.renderItemHandler(item)}
                keyExtractor={(item, index) => index.toString()}/>
                
              <TouchableOpacity onPress={() => this.props.likeMessage(
                    this.props.token,
                    this.props.item.id,
                    this.props.convo_id
                )}>
                <Text style={styles.link}>Like</Text>
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
    console.log('messageItem', state.convoReducer.message_mojis_map);
    return {
        token: state.authReducer.token,
        convo_id: state.navReducer.convo_id,
        convo_messages_loading: state.convoReducer.convo_messages_loading,
        message_mojis_map: state.convoReducer.message_mojis_map
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(MessageItem);
