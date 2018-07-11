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

class Convos extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Convos', header: null
    });

    componentWillMount() {
        this.props.getConvos(this.props.token);
    }

    refresh = () => {
        this.props.getConvos(this.props.token);
    }

    render() {
        return (
            <PTRView onRefresh={this.refresh}>
              <View>
                <Text style={styles.h3}>Convos</Text>
                <TouchableOpacity onPress={() => this.props.navigation.push('Messagable', {type: 'createConvo'})}>
                  <Text style={styles.link}>New Convo</Text>
                </TouchableOpacity>

                <FlatList
                  data={this.props.convos.data}
                  renderItem={({item}) =>
                              <Text onPress={() => this.props.navigation.navigate('Convo', {id: item.id})}
                              style={styles.text}>{item.name}</Text>}
                  keyExtractor={item => item.id.toString()}/>

              </View>
            </PTRView>
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
    // console.log(state.convoReducer);
    return {
        convos: state.convoReducer.convos,
        authUser: state.userReducer.authUser,
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Convos);
