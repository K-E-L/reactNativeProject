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
    TouchableOpacity,
    View
} from 'react-native';

// import: pull to refresh
import PTRView from 'react-native-pull-to-refresh';

// import: actions
import * as Actions from '../actions/rootActions';

// import: dumb component
import MojiItem from './mojiItemComponent';

class Mojis extends Component {
    constructor(props) {
        super(props);
        this.backHandler = this.backHandler.bind(this);
    }
    
    static navigationOptions = ({ navigation }) => ({
        title: 'Mojis', header: null
    });

    componentWillMount() {
        switch (this.props.moji_type) {
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

    refresh = () => {
        switch (this.props.moji_type) {
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

              <Text
                style={styles.h3}>{this.props.moji_type}
              </Text>
              
              <FlatList
                data={this.props.mojis}
                renderItem={({item}) =>
                <MojiItem item={item} navigation={this.props.navigation}/>}
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
    // console.log('mojis', state.mojiReducer.mojis);
    return {
        mojis: state.mojiReducer.mojis,
        moji_type: state.navReducer.moji_type,
        token: state.authReducer.token
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Mojis);
