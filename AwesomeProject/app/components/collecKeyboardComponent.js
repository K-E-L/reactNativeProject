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

class CollecKeyboard extends Component {
    constructor(props) {
        super(props);
        this.funcHandler = this.funcHandler.bind(this);
    }

    componentWillMount() {
        this.props.getCollec(this.props.token);
    }

    funcHandler(item) {
        switch (this.props.mojiKeyboardType) {
        case 'Message':
            this.props.addMessageMoji(' m/#' + item.id.toString() + ' ');
            this.props.splitMessageBody();
            break;
        case 'Comment':
            this.props.addCommentMoji(' m/#' + item.id.toString() + ' ');
            this.props.splitMessageBody();
            break;
        case 'Reply':
            this.props.addReplyMoji(' m/#' + item.id.toString() + ' ');
            this.props.splitMessageBody();
            break;
        default:
            console.log('error: type not found');
        }
    }

    render() {
        return (
            <View>
              <FlatList
                keyboardShouldPersistTaps='handled'
                data={this.props.collec.data}
                horizontal={true}
                renderItem={({item}) =>
                            <TouchableOpacity
                                  style={styles.moji}
                                  onPress={() => this.funcHandler(item)}>
                                  <Image
                                        style={{width: 20, height: 20}}
                                        source={{uri: 'http://167.99.162.15/mojiStorage/' +
                                                 item.creator_id + '/' +
                                                 item.path}}
                                        />
                            </TouchableOpacity>}
                            keyExtractor={item => item.id.toString()}/>
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
    moji: {
        paddingRight: 10,
        width: 30,
        height: 20
    }
   
});

// Pass: redux state to props
function mapStateToProps(state, props) {
    // console.log(state.navReducer.mojiKeyboardType);
    return {
        collec: state.userReducer.collec,
        mojiKeyboardType: state.navReducer.mojiKeyboardType,
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(CollecKeyboard);
