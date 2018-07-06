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

class Mojis extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Mojis'
    });

    componentWillMount() {
        this.props.getMojis(this.props.token);
    }

    render() {
        return (
            <View>
              <FlatList
                data={this.props.mojis.data}
                renderItem={({item}) =>
                            <Text
                                  style={styles.text}
                                  onPress={() => this.props.navigation.navigate('Moji', {id: item.id})}>
                              {item.name}: {item.creator_username} : {item.created_at}</Text>}
                            keyExtractor={item => item.id.toString()}/>
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
    // console.log(state.mojiReducer.mojis);
    return {
        mojis: state.mojiReducer.mojis,
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Mojis);
