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

// import: dumb component
import MojiItem from './mojiItemComponent';

class Mojis extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Mojis'
    });

    componentWillMount() {
        switch (this.props.navigation.state.params.type) {
        case 'Popular':
            this.props.getPopularMojis(this.props.token);
            break;
        case 'Recent':
            this.props.getRecentMojis(this.props.token);
            break;
        case 'Following':
            this.props.getFollowingMojis(this.props.token);
            break;
        default:
            console.log('error: type not found');
        }
    }

    render() {
        return (
            <View>
              <Text
                style={styles.h3}>{this.props.navigation.state.params.type}
              </Text>
              
              <FlatList
                data={this.props.mojis.data}
                renderItem={({item}) =>
                <MojiItem item={item} navigation={this.props.navigation}/>}
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
