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

// import: pull to refresh
import PTRView from 'react-native-pull-to-refresh';

class NotifItem extends Component {
    constructor(props) {
        super(props);
        this.pushNavUserHandler = this.pushNavUserHandler.bind(this);
        this.setConvoHandler = this.setConvoHandler.bind(this);
        this.pushNavMojiHandler = this.pushNavMojiHandler.bind(this);
        this.userSearchAndDestroy = this.userSearchAndDestroy.bind(this);
        this.convoSearchAndDestroy = this.convoSearchAndDestroy.bind(this);
        this.mojiSearchAndDestroy = this.mojiSearchAndDestroy.bind(this);
    }

    userSearchAndDestroy(token, name) {
        let obj = this.props.user_notifs.find(function (obj) { return (obj.spec_name === name && obj.read === 0); });
        if (typeof obj !== "undefined") {
            this.props.destroyNotif(token, obj.id);
        }
    }

    convoSearchAndDestroy(token, name) {
        let obj = this.props.convo_notifs.find(function (obj) { return (obj.spec_name === name && obj.read === 0); });
        if (typeof obj !== "undefined") {
            this.props.destroyNotif(token, obj.id);
        }
    }

    mojiSearchAndDestroy(token, name) {
        let obj = this.props.moji_notifs.find(function (obj) { return (obj.spec_name === name && obj.read === 0); });
        if (typeof obj !== "undefined") {
            this.props.destroyNotif(token, obj.id);
        }
    }

    pushNavUserHandler(id, name) {
        this.props.pushNavUser(id);
        this.userSearchAndDestroy(this.props.token, name);
        this.props.navigation.push('User');
    }

    setConvoHandler(id, name) {
        this.props.setConvoID(id);
        this.convoSearchAndDestroy(this.props.token, name);
        this.props.navigation.push('Convo');
    }

    pushNavMojiHandler(id, name) {
        this.props.pushNavMoji(id);
        this.mojiSearchAndDestroy(this.props.token, name);
        this.props.navigation.push('Moji');
    }
    
    render() {
        if (this.props.type === 'users') {
            return (
                <View>
                  <Text style={styles.text}
                        onPress={() => this.pushNavUserHandler(this.props.item.spec_id, this.props.item.spec_name)}>
                    {this.props.item.body}: {this.props.item.created_at}</Text>
                  
                  <TouchableOpacity onPress={() => this.props.destroyNotif(this.props.token, this.props.item.id)}>
                    <Text style={styles.link}>Read</Text>
                  </TouchableOpacity>

                </View>
            );
        }
        if (this.props.type === 'convos') {
            return (
                <View>
                  <Text style={styles.text}
                        onPress={() => this.setConvoHandler(this.props.item.spec_id, this.props.item.spec_name)}>
                    {this.props.item.body}: {this.props.item.created_at}</Text>
                  
                  <TouchableOpacity onPress={() => this.props.destroyNotif(this.props.token, this.props.item.id)}>
                    <Text style={styles.link}>Read</Text>
                  </TouchableOpacity>

                </View>
            );
        }
        if (this.props.type === 'mojis') {
            return (
                <View>
                  <Text style={styles.text}
                        onPress={() => this.pushNavMojiHandler(this.props.item.spec_id, this.props.item.spec_name)}>
                    {this.props.item.body}: {this.props.item.created_at}</Text>
                  
                  <TouchableOpacity onPress={() => this.props.destroyNotif(this.props.token, this.props.item.id)}>
                    <Text style={styles.link}>Read</Text>
                  </TouchableOpacity>

                </View>
            );
        }
        else {
            return (
                <View>
                  <Text style={styles.text}
                        onPress={() => this.props.navigation.navigate('Convos')}>
                    {this.props.item.body}: {this.props.item.created_at}</Text>
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
    return {
        token: state.authReducer.token,
        user_notifs: state.userReducer.user_notifs,
        convo_notifs: state.userReducer.convo_notifs,
        moji_notifs: state.userReducer.moji_notifs
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(NotifItem);
