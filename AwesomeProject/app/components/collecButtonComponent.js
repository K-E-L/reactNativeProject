// import: basics
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Alert,
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

class CollecButton extends Component {
    constructor(props) {
        super(props);
        this.collecHandler = this.collecHandler.bind(this);
    }

    collecHandler(login_cred, id, type) {
        Alert.alert(
            this.props.type + 'ting',
            this.props.type + 'ted',
            [{text: 'Ok'}],
            { cancelable: false }
        );

        this.props.CollecUncollec(login_cred, id, type);
    }

    render() {
        if (this.props.type === 'Collec') {
            return (
                <View>
                  <TouchableOpacity onPress={() => this.collecHandler(
                        this.props.token,
                        this.props.moji_stack[this.props.moji_stack.length - 1],
                        this.props.type
                    )}>
                    <Text style={styles.link}>{this.props.type}</Text>
                  </TouchableOpacity>
                </View>
            );
        }
        else {
            return (
                <View>
                  <TouchableOpacity onPress={() => this.collecHandler(
                        this.props.token,
                        this.props.moji_stack[this.props.moji_stack.length - 1],
                        this.props.type
                    )}>
                    <Text style={styles.pressed}>{this.props.type}</Text>
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
        
        moji_stack: state.navReducer.moji_stack
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(CollecButton);
