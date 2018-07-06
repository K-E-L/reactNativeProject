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
import * as Actions from '../actions/rootActions';

class Notifs extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Notifs'
    });

    componentDidMount() {
        this.props.getNotifs(this.props.token);
    }
    
    render() {
        return (
            <View>
              <FlatList
                data={this.props.notifs.data}
                renderItem={({item}) =>
                            <Text
                                  style={styles.text}
                                  onPress={() => this.props.navigation.navigate('Convos')}>
                              {item.body}: {item.created_at}</Text>}
                            keyExtractor={item => item.id.toString()}/>
              <Button
               onPress={() => this.props.message(
                   this.props.token,
                   this.props.navigation.state.params.id,
                   this.props.messageBody
               )}
               title="Message"/>

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
        notifs: state.userReducer.notifs,
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Notifs);
