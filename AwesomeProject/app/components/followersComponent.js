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

// import: pull to refresh
import PTRView from 'react-native-pull-to-refresh';

class Followers extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Followers'
    });

    componentWillMount() {
        this.props.getFollowers(this.props.token, this.props.navigation.state.params.id);
    }

    refresh = () => {
        this.props.getFollowers(this.props.token, this.props.navigation.state.params.id);
    }

    render() {
        return (
            <PTRView onRefresh={this.refresh}>
              <View>
                <FlatList
                  data={this.props.followers.data}
                  renderItem={({item}) =>
                              <Text
                                    onPress={() => this.props.navigation.push('User', {id: item.id})}
                                    style={styles.text}>
                                    {item.name}: {item.username}
                              </Text>}
                              keyExtractor={item => item.id.toString()}
                              />
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
    // console.log(state.userReducer.followings);
    return {
        followers: state.userReducer.followers,
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Followers);
