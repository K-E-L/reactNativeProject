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

// import: actions
import * as Actions from '../actions/rootActions';

// import: pull to refresh
import PTRView from 'react-native-pull-to-refresh';

class SearchMoji extends Component {
    constructor(props) {
        super(props);
        this.backHandler = this.backHandler.bind(this);
        this.pushNavMojiHandler = this.pushNavMojiHandler.bind(this);
        this.changeTextSearchMojiHandler = this.changeTextSearchMojiHandler.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'SearchMoji', header: null
    });

    backHandler() {
        this.props.navigation.pop();
    }

    pushNavMojiHandler(id) {
        this.props.pushNavMoji(id);
        this.props.setMojiID(id);
        this.props.navigation.push('Moji');
    }

    changeTextSearchMojiHandler(text, token) {
        this.props.setMojiSearchBody(text);        
        this.props.searchMoji(token, text);
    }
    
    render() {
        return (
            <PTRView onRefresh={this.refresh}>
              <View>
                <TouchableOpacity onPress={() => this.backHandler()}>
                  <Text style={styles.h3}>Back</Text>
                </TouchableOpacity>

                <Text style={styles.h3}>Search Moji</Text>
                
                <TextInput
                  onChangeText={(text) => this.changeTextSearchMojiHandler(text, this.props.token)}
                  value={this.props.mojiSearchBody}
                  placeholder="Search by Moji name.."
                  onSubmitEditing={() => this.props.searchMoji(this.props.token, this.props.mojiSearchBody)}
                  />

                  {this.props.searchMojiLoaded && <Text onPress={() => this.pushNavMojiHandler(this.props.mojiSearch.data.id)}
                        style={styles.h3}>
                        {this.props.mojiSearch.data.name}: {this.props.mojiSearch.data.creator_username}
                  </Text>}
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
    console.log('mojiSearch', state.mojiReducer.mojiSearch);
    return {
        mojiSearchBody: state.mojiReducer.mojiSearchBody,
        mojiSearch: state.mojiReducer.mojiSearch,
        searchMojiLoaded: state.mojiReducer.searchMojiLoaded,
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(SearchMoji);
