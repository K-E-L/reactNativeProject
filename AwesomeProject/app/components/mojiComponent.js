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
    View
} from 'react-native';

// import: actions
import * as Actions from '../actions/rootActions';

// import: dumb component
import CommentItem from './commentItemComponent';

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
              <Text style={styles.h3}>{this.props.moji.data.name}</Text>
              <Image
                style={{width: 20, height: 20}}
                source={{uri: 'http://167.99.162.15/mojiStorage/' +
                         this.props.moji.data.creator_id + '/' +
                this.props.moji.data.path}}/>
              <Text
                style={styles.text}
                onPress={() => this.props.navigation.push('User', {id: this.props.moji.data.creator_id})}
                >{this.props.moji.data.creator_username}</Text>
              <Text
                style={styles.text}>Collecs: {this.props.moji.data.collec_count}</Text>
              <Text
                style={styles.text}>Likes: {this.props.moji.data.like_count}</Text>
              <Text
                style={styles.text}>Dislikes: {this.props.moji.data.dislike_count}</Text>
              <Text
                style={styles.h3}
                onPress={() => this.props.CollecUncollec(
                      this.props.token,
                      this.props.navigation.state.params.id,
                      this.props.moji.type
                )}>{this.props.moji.type}</Text>

              <Button
                onPress={() => this.props.likeMoji(
                    this.props.token,
                    this.props.navigation.state.params.id
                )}
                title="LikeMoji"/>
                
              <Button
                onPress={() => this.props.dislikeMoji(
                    this.props.token,
                    this.props.navigation.state.params.id
                )}
                title="DislikeMoji"/>

              <FlatList
               data={this.props.mojiComments.data}
               renderItem={({item}) =>
                <CommentItem item={item} navigation={this.props.navigation}/>}
                           keyExtractor={item => item.id.toString()}/>

             <TextInput
                onChangeText={(text) => this.props.setCommentBody(text)}
                value={this.props.commentBody}
                placeholder="Comment.."/>
                
             <Button
                onPress={() => this.props.comment(
                    this.props.token,
                    this.props.navigation.state.params.id,
                    this.props.commentBody
                )}
                title="Comment"/>

             <TextInput
               onChangeText={(text) => this.props.setReportBody(text)}
               value={this.props.reportBody}
               placeholder="Report.."/>

            <Button
              onPress={() => this.props.report(
                  this.props.token,
                  this.props.navigation.state.params.id,
                  this.props.reportBody
              )}
              title="Report"/>



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
    console.log(state.mojiReducer.moji);
    return {
        moji: state.mojiReducer.moji,
        mojiComments: state.mojiReducer.mojiComments,
        commentBody: state.mojiReducer.commentBody,
        reportBody: state.mojiReducer.reportBody,
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Moji);
