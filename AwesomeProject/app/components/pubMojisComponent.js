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

// import: pull to refresh
import PTRView from 'react-native-pull-to-refresh';

// import: dumb component
import MojiItemImage from './mojiItemImageComponent';

class PubMojis extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'PubMojis', header: null
    });

    componentDidMount() {
        this.props.getPubMojis(this.props.token, this.props.auth_user.id);
    }

    refresh = () => {
        this.props.getPubMojis(this.props.token, this.props.auth_user.id);
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

                <FlatList
                  data={this.props.pub_mojis}
                  horizontal={true}
                  renderItem={({item}) =>
                  <MojiItemImage item={item} navigation={this.props.navigation}/>}
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
  }
});

// Pass: redux state to props
function mapStateToProps(state, props) {
    console.log('pubMojis', state.commentReducer.reply_mojis_map);
    return {
        pub_mojis: state.userReducer.pub_mojis,
        auth_user: state.userReducer.auth_user,
        
        user_stack: state.navReducer.user_stack,
        
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(PubMojis);
