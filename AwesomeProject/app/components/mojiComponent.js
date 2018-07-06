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

class Moji extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Moji'
    });

    componentWillMount() {
        this.props.getMoji(this.props.token, this.props.navigation.state.params.id);
        this.props.getMojiComments(this.props.token, this.props.navigation.state.params.id);
    }

    render() {
        return (
            <View>
              <Text style={styles.h3}>{this.props.moji.name}</Text>
              <Text
                style={styles.text}
                onPress={() => this.props.navigation.push('User', {id: this.props.moji.creator_id})}
                >{this.props.moji.creator_username}</Text>
              <Text
                style={styles.text}>Likes: {this.props.moji.like_count}</Text>
              <Text
                style={styles.text}>Dislikes: {this.props.moji.dislike_count}</Text>
              <Text
                style={styles.text}>Collecs: {this.props.moji.collec_count}</Text>
              <FlatList
               data={this.props.mojiComments.data}
               renderItem={({item}) =>
                           <Text
                                 style={styles.text}
                                 onPress={() => this.props.navigation.navigate('Comment', {id: item.id})}>
                             {item.creator_username} - {item.body} - {item.created_at} - Likes: {item.like_count} Dislikes: {item.dislike_count} Replies: {item.reply_count} </Text>}
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
    // console.log(state.mojiReducer.mojiComments);
    return {
        moji: state.mojiReducer.moji,
        mojiComments: state.mojiReducer.mojiComments,
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Moji);
