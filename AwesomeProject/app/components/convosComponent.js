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
    constructor(props) {
        super(props);
        this.setConvoIdHandler = this.setConvoIdHandler.bind(this);
        this.setConvoTypeHandler = this.setConvoTypeHandler.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Convos', header: null
    });

    componentWillMount() {
        this.props.getConvos(this.props.token);
    }

    refresh = () => {
        this.props.getConvos(this.props.token);
    }

    setConvoIdHandler(id) {
        this.props.setConvoID(id);
        this.props.navigation.navigate('Convo');
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
                              <Text onPress={() => this.setConvoIdHandler(item.id)}
                              style={styles.h3}>{item.name}</Text>}
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
