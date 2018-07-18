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

class MessageItem extends Component {
    constructor(props) {
        super(props);
        this.renderItemHandler = this.renderItemHandler.bind(this);

        // get from server later
        this.maxNumber = 2;
    }

    componentWillMount() {
        // load here? stopped here
        this.props.getMessageMojis(this.props.item.body);
        this.props.setMessageMojiStack(this.props.token, this.props.messageMojis);
    }
    
    renderItemHandler(item) {
        // if(item.substring(0,3) === 'm/#' && item.length > 3 && Number(item.substring(3, item.length) <= this.maxNumber)) {
        //     // don't call getMoji every render, not keeping up
            
        //     // this.props.getMoji(this.props.token, '1');
        //     // this.props.getMoji(this.props.token, this.props.messageMojis[this.props.messageMojisCount - 1]);
        //     // this.props.decMessageMojisCount();
            
            
        //     return <Image style={{width: 20, height: 20}}
        //     source={{uri: 'http://167.99.162.15/mojiStorage/' +
        //              this.props.messageMojisStack.data[0].creator_id + '/' + this.props.messageMojisStack.data[0].path}}/>;
        // }
        // else {
            return <Text style={styles.text}>{item + ' '}</Text>;
        // }
    }

    render() {
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
                    this.props.convoID
                )}>
                <Text style={styles.link}>Like</Text>
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
    console.log('messageItem', state.navReducer.messageMojisStack);
    return {
        token: state.authReducer.token,
        // moji: state.mojiReducer.moji,
        messageMojis: state.navReducer.messageMojis,
        messageMojisCount: state.navReducer.messageMojisCount,
        messageMojisStack: state.navReducer.messageMojisStack
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(MessageItem);
