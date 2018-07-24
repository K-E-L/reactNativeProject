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

// import: dumb component
import MojiItemImage from './mojiItemImageComponent';

class MojiPreview extends Component {
    constructor(props) {
        super(props);
        this.renderItemHandler = this.renderItemHandler.bind(this);
        this.dataHandler = this.dataHandler.bind(this);

        // get from server later
        this.maxNumber = 2;
    }    

    renderItemHandler(item) {
        if(item.substring(0,3) === 'm/#' && item.length > 3 && Number(item.substring(3, item.length) <= this.maxNumber)) {
            return <MojiItemImage
            item={this.props.collec.find(object => object.id == item.substring(3, item.length))}
            navigation={this.props.navigation}/>;
        }
        else {
            return <Text style={styles.text}>{item + ' '}</Text>;
        }
    }

    dataHandler() {
        switch (this.props.mojiPreviewType) {
        case 'Message':
            return this.props.messageSplit;
        case 'Comment':
            return this.props.commentSplit;
        case 'Reply':
            return this.props.replySplit;
        default:
            console.log('error: type not found');
            return null;
        }
    }

    render() {
         return (
            <View>
              <Text>Preview: </Text>
              <FlatList
                data={this.dataHandler()}
                horizontal={true}
                renderItem={({item, index}) => this.renderItemHandler(item)}
                keyExtractor={(item, index) => index.toString()}/>


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
    // console.log('preview', state.navReducer.mojiPreviewType);
    return {
        messageSplit: state.convoReducer.messageSplit,
        commentSplit: state.mojiReducer.commentSplit,
        replySplit: state.commentReducer.replySplit,
        mojiPreviewType: state.navReducer.mojiPreviewType,
        collec: state.userReducer.collec,
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(MojiPreview);