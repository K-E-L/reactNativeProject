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

class MojiItemImage extends Component {
    constructor(props) {
        super(props);
        this.pushNavMojiHandler = this.pushNavMojiHandler.bind(this);
    }

    pushNavMojiHandler(id) {
        this.props.navigation.push('Moji');

        if (this.props.tab === 'user')
            this.props.pushNavMojiUserTab(id);
        else
            this.props.pushNavMoji(id);
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => this.pushNavMojiHandler(this.props.item.id)}>
                <Image style={{width: 20, height: 20}}
                       source={{uri: 'http://167.99.162.15/mojiStorage/' +
                                this.props.item.creator_id + '/' +
                       this.props.item.path}}/>
              </TouchableOpacity>
              <Text> </Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(MojiItemImage);
