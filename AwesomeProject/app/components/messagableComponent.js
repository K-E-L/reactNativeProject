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
import UserItem from './userItemComponent';

class Messagable extends Component {
    constructor(props) {
        super(props);
        this.backHandler = this.backHandler.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Messagable', header: null
    });

    componentWillMount() {
        this.props.getMessagable(this.props.token, this.props.authUser.id);
    }

    refresh = () => {
        this.props.getMessagable(this.props.token, this.props.authUser.id);
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
                  data={this.props.messagable.data}
                  renderItem={({item}) =>
                              <UserItem
                                    item={item}
                                    type={this.props.navigation.state.params.type}
                                    convoID={this.props.navigation.state.params.convoID}
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
        authUser: state.userReducer.authUser,
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Messagable);
