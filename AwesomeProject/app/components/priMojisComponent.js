// import: basics
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
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

// import: pull to refresh
import PTRView from 'react-native-pull-to-refresh';

// import: dumb component
import MojiItemImage from './mojiItemImageComponent';

// mojis aren't actuall private.. fix later..
class PriMojis extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'PriMojis', header: null
    });

    componentWillMount() {
        this.props.getPriMojis(this.props.token, this.props.authUser.id);
    }

    refresh = () => {
        this.props.getPriMojis(this.props.token, this.props.authUser.id);
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
                  data={this.props.priMojis}
                  horizontal={true}
                  renderItem={({item}) =>
                              <Image style={{width: 20, height: 20}}
                                         source={{uri: 'http://167.99.162.15/mojiStorage/' +
                                                  this.props.authUser.id + '/' +
                                     item.path}}/>}
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
    console.log('priMojis', state.navReducer.userStack);
    return {
        priMojis: state.userReducer.priMojis,
        userStack: state.navReducer.userStack,
        authUser: state.userReducer.authUser,
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(PriMojis);
