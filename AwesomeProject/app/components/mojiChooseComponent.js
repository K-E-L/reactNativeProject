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

class MojiChoose extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Moji Choose', header: null
    });

    render() {
        return (
            <View>
              <Text
                onPress={() => this.props.navigation.navigate('Mojis', {type: 'Popular'})}
                style={styles.h3}>Most Popular</Text>
              <Text
                onPress={() => this.props.navigation.navigate('Mojis', {type: 'Recent'})}
                style={styles.h3}>Recent</Text>
              <Text
                onPress={() => this.props.navigation.navigate('Mojis', {type: 'Following'})}
                style={styles.h3}>Recent Following</Text>


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
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(MojiChoose);
