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

class ConvoItem extends Component {
    constructor(props) {
        super(props);
        this.searchConvoNotifs = this.searchConvoNotifs.bind(this);
        this.setConvoHandler = this.setConvoHandler.bind(this);
    }

    setConvoHandler(id, name) {
        this.props.setConvoID(id);
        this.props.setConvoName(name);
        this.props.navigation.push('Convo');
    }

    searchConvoNotifs(name) {
        let obj = this.props.convo_notifs.find(function (obj) { return (obj.spec_name === name && obj.read === 0); });

        if (typeof obj === "undefined") {
            return false;
        }

        return true;
    }

    render() {
        if (this.searchConvoNotifs(this.props.item.name)) {
            return (
                <View>
                  <Text style={styles.h3}
                        onPress={() => this.setConvoHandler(this.props.item.id, this.props.item.name)}>
                    {this.props.item.name}..dot..</Text>
                </View>
            );
        }
        else {
            return (
                <View>              
                  <Text style={styles.h3}
                        onPress={() => this.setConvoHandler(this.props.item.id, this.props.item.name)}>
                    {this.props.item.name}</Text>
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
    }
});

// Pass: redux state to props
function mapStateToProps(state, props) {
    console.log('convoItem', state.userReducer.convo_notifs);
    return {
        token: state.authReducer.token,
        convo_notifs: state.userReducer.convo_notifs,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(ConvoItem);
