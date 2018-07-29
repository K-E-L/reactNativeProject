// import: basics
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Button,
    FlatList,
    Image,
    ListItem,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// import: actions
import * as Actions from '../actions/rootActions';

class Dislike extends Component {
    constructor(props) {
        super(props);
        this.dislikeHandler = this.dislikeHandler.bind(this);
    }

    dislikeHandler() {
        switch (this.props.type) {
        case 'comment':
            this.props.dislikeComment(this.props.token, this.props.item.id, this.props.prop_id);
            break;
        case 'reply':
            this.props.dislikeReply(this.props.token, this.props.item.id, this.props.prop_id);
            break;
        case 'moji':
            this.props.dislikeMoji(this.props.token, this.props.prop_id);
            break;
        default:
            console.log('error: type not found');
        }
    }

    render() {
        if (this.props.item.dislike_count > 0) {
            return (
                <View>
                    <Text style={styles.pressed}>Dislike</Text>
                </View>
            );
        }
        else {
            return (
                <View>
                  <TouchableOpacity onPress={() => this.dislikeHandler()}>
                    <Text style={styles.link}>Dislike</Text>
                  </TouchableOpacity>
                </View>
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
    },
    pressed: {
        fontSize: 30,
        color: '#ff891c'
    }
});

// Pass: redux state to props
function mapStateToProps(state, props) {
    return {
        token: state.authReducer.token,
        
        convo_id: state.navReducer.convo_id
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Dislike);
