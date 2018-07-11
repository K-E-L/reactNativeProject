// import: basics
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Button,
    Dimensions,
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

const ScreenHeight = Dimensions.get("window").height;

class MojiChoose extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Moji Choose', header: null
    });

    render() {
        return (
            <View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Mojis', {type: 'Popular'})}>
                <Text style={styles.link}>Most Popular</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Mojis', {type: 'Recent'})}>
                <Text style={styles.link}>Recent</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Mojis', {type: 'Following'})}>
                <Text style={styles.link}>Recent Following</Text>
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
    return {
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(MojiChoose);
