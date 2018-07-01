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
import * as userActions from '../actions/userActions';

class Followers extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Followers'
    });

    componentDidMount() {
        this.props.getFollowers(this.props.token, this.props.navigation.state.params.id);
    }

    render() {
        return (
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
    console.log(state.userReducer.followings);
    return {
        followers: state.userReducer.followers,
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(userActions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Followers);
