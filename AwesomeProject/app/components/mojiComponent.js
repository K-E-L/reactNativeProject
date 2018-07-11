// import: basics
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Alert,
    Button,
    FlatList,
    Image,
    ListItem,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    View
} from 'react-native';

// import: actions
import * as Actions from '../actions/rootActions';

// import: dumb component
import CommentItem from './commentItemComponent';

// import: pull to refresh
import PTRView from 'react-native-pull-to-refresh';

class Moji extends Component {
    constructor(props) {
        super(props);
        this.collecHandler = this.collecHandler.bind(this);
        this.backHandler = this.backHandler.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Moji', header: null
    });

    componentWillMount() {
        this.props.getMoji(this.props.token, this.props.navigation.state.params.id);
        this.props.getMojiComments(this.props.token, this.props.navigation.state.params.id);
    }

    refresh = () => {
        this.props.getMoji(this.props.token, this.props.navigation.state.params.id);
        this.props.getMojiComments(this.props.token, this.props.navigation.state.params.id);
    }

    collecHandler = (login_cred, id, type) => {
        // alert
        Alert.alert(
            this.props.moji.type + 'ting',
            this.props.moji.type + 'ted',
            [{text: 'Ok'}],
            { cancelable: false }
        );

        // collect
        this.props.CollecUncollec(login_cred, id, type);
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
                <TouchableOpacity onPress={() => this.collecHandler(
                      this.props.token,
                      this.props.navigation.state.params.id,
                      this.props.moji.type
                  )}>
                  <Text style={styles.link}>{this.props.moji.type}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.likeMoji(
                      this.props.token,
                      this.props.navigation.state.params.id
                  )}>
                  <Text style={styles.link}>Like</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => this.props.dislikeMoji(
                      this.props.token,
                      this.props.navigation.state.params.id
                  )}>
                  <Text style={styles.link}>Dislike</Text>
                </TouchableOpacity>
                
                <TextInput
                  onChangeText={(text) => this.props.setCommentBody(text)}
                  value={this.props.commentBody}
                  placeholder="Comment.."
                  onSubmitEditing={() => this.props.comment(
                      this.props.token,
                      this.props.navigation.state.params.id,
                      this.props.commentBody
                  )}/>

                  <TouchableOpacity onPress={() => this.props.comment(
                      this.props.token,
                      this.props.navigation.state.params.id,
                      this.props.commentBody
                  )}>
                    <Text style={styles.link}>Comment</Text>
                  </TouchableOpacity>

                <TextInput
                  onChangeText={(text) => this.props.setReportBody(text)}
                  value={this.props.reportBody}
                  placeholder="Report.."
                  onSubmitEditing={() => this.props.report(
                      this.props.token,
                      this.props.navigation.state.params.id,
                      this.props.reportBody
                  )}/>

                  <TouchableOpacity onPress={() => this.props.report(
                        this.props.token,
                        this.props.navigation.state.params.id,
                        this.props.reportBody
                    )}>
                    <Text style={styles.link}>Report</Text>
                  </TouchableOpacity>

                <FlatList
                  data={this.props.mojiComments.data}
                  renderItem={({item}) =>
                  <CommentItem item={item} navigation={this.props.navigation}/>}
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
    },
    link: {
        fontSize: 30,
        color: '#00a9ff'
    }
});

// Pass: redux state to props
function mapStateToProps(state, props) {
    // console.log(state.mojiReducer.moji);
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
