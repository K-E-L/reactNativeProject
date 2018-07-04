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

class Followings extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Followings'
    });

    componentDidMount() {
        this.props.getFollowings(this.props.token, this.props.navigation.state.params.id);
    }
    
    render() {
        return (
            <View>
              <FlatList
                data={this.props.followings.data}
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
    // console.log(state.userReducer.followings.data);
    return {
        followings: state.userReducer.followings,
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Followings);
