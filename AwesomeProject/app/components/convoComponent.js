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
    View
} from 'react-native';

// import: actions
import * as convoActions from '../actions/convoActions';

class Convo extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Convo'
    });

    componentWillMount() {
        this.props.getConvo(this.props.token, this.props.navigation.state.params.id);
        this.props.getMessages(this.props.token, this.props.navigation.state.params.id);
    }

    render() {
        return (
            <View>
              <Text style={styles.h3}>{this.props.specific.convo.name}</Text>
              <FlatList
                data={this.props.specific.convo.users}
                renderItem={({item}) =>
                            <Text
                                  onPress={() => this.props.navigation.push('User', {id: item.id})}
                                  style={styles.text}>
                                  {item.name}
                            </Text>}
                            keyExtractor={item => item.id.toString()}
                            />
             <FlatList
               data={this.props.specificMessages.messages}
               renderItem={({item}) =>
                           <Text
                                 style={styles.text}>
                                 {item.creator_id}: {item.body}: {item.created_at}
                           </Text>}
                           keyExtractor={item => item.id.toString()}
                           />
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
    return {
        specific: state.convoReducer.specific,
        specificMessages: state.convoReducer.specificMessages,
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(convoActions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Convo);
