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

class MojiInput extends Component {
    constructor(props) {
        super(props);
        this.renderItemHandler = this.renderItemHandler.bind(this);

        // get from server later
        this.maxNumber = 2;
    }    

    renderItemHandler(item) {
        if(item.substring(0,3) === 'm/#' && item.length > 3 && Number(item.substring(3, item.length) <= this.maxNumber)) {
            // stopped here
            // don't call getMoji every render, not keeping up
            this.props.getMoji(this.props.token, item.substring(3, item.length));
            return <Image
            style={{width: 20, height: 20}}
            source={{uri: 'http://167.99.162.15/mojiStorage/' +
                     this.props.moji.data.creator_id + '/' + this.props.moji.data.path}}/>;
        }
        else {
            return <Text style={styles.text}>{item + ' '}</Text>;
        }

    }

    render() {
        return (
            <View>
              <Text>Preview: </Text>
              <FlatList
                data={this.props.messageSplit}
                horizontal={true}
                renderItem={({item}) => this.renderItemHandler(item)}/>

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
    console.log(state.convoReducer.messageBody);
    return {
        messageSplit: state.convoReducer.messageSplit,
        moji: state.mojiReducer.moji,
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(MojiInput);
