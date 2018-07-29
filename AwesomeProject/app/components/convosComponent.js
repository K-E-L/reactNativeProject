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

// import: dumb components
import ConvoItem from'./convoItemComponent';

class Convos extends Component {
    constructor(props) {
        super(props);
        this.setConvoTypeHandler = this.setConvoTypeHandler.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Convos', header: null
    });

    componentDidMount() {
        this.props.getConvos(this.props.token);
        this.props.getConvoNotifs(this.props.token);
    }

    refresh = () => {
        this.props.getConvos(this.props.token);
        this.props.getConvoNotifs(this.props.token);
    }

    setConvoTypeHandler(type) {
        this.props.setConvoType(type);
        this.props.navigation.push('Messagable');
    }

    render() {
        return (
            <PTRView onRefresh={this.refresh}>
              <View>
                <Text style={styles.h3}>Convos</Text>
                <TouchableOpacity onPress={() => this.setConvoTypeHandler('createConvo')}>
                  <Text style={styles.link}>New Convo</Text>
                </TouchableOpacity>

                <FlatList
                  keyboardShouldPersistTaps='always'
                  data={this.props.convos}
                  renderItem={({item}) =>
                              <ConvoItem
                                    item={item}
                                navigation={this.props.navigation}/>}
                              keyExtractor={(item, index) => index.toString()}/>

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
    // console.log('convos', state.convoReducer.convo_messages_loading);
    return {
        convos: state.convoReducer.convos,
        auth_user: state.userReducer.auth_user,
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Convos);
