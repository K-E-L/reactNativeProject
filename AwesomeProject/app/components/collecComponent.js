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

class Collec extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Collection', header: null
    });

    componentWillMount() {
        this.props.getCollec(this.props.token);
    }

    refresh = () => {
        this.props.getCollec(this.props.token);
    }

    backHandler() {
        this.props.navigation.pop();
    }
    
    render() {
        return (
            <PTRView onRefresh={this.refresh}>
              <View>
                <Text style={styles.h3}
                  onPress={() => this.backHandler()}>Back</Text>
                <FlatList
                  data={this.props.collec.data}
                  renderItem={({item}) =>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('Moji', {id: item.id})}>
                                    <Image
                                          style={{width: 20, height: 20}}
                                          source={{uri: 'http://167.99.162.15/mojiStorage/' +
                                                   item.creator_id + '/' +
                                                   item.path}}
                                          />
                              </TouchableOpacity>}
                              keyExtractor={item => item.id.toString()}
                              />
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
    console.log(state.userReducer.collec);
    return {
        collec: state.userReducer.collec,
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Collec);
