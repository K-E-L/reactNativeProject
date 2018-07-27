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

// import: dumb component
import MessagableItem from './messagableItemComponent';

class Messagable extends Component {
    constructor(props) {
        super(props);
        this.backHandler = this.backHandler.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Messagable', header: null
    });

    componentDidMount() {
        this.props.getMessagable(this.props.token, this.props.auth_user.id);
    }

    refresh = () => {
        this.props.getMessagable(this.props.token, this.props.auth_user.id);
    }

    backHandler() {
        this.props.navigation.pop();
    }

    render() {
        return (
            <PTRView onRefresh={this.refresh}>
              <View>
                <TouchableOpacity onPress={() => this.backHandler()}>
                  <Text style={styles.h3}>Back</Text>
                </TouchableOpacity>

                <FlatList
                  data={this.props.messagable}
                  renderItem={({item}) =>
                              <MessagableItem
                                    item={item}
                                navigation={this.props.navigation}/>}
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
  }
});

// Pass: redux state to props
function mapStateToProps(state, props) {
    // console.log(state.userReducer.messagable);
    return {
        messagable: state.userReducer.messagable,
        auth_user: state.userReducer.auth_user,
        convo_id: state.navReducer.convo_id,
        convo_type: state.navReducer.convo_type,
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Messagable);
