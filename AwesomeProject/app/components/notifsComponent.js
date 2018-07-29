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

// import: dumb component
import NotifItem from './notifItemComponent';

class Notifs extends Component {
    constructor(props) {
        super(props);
        this.backHandler = this.backHandler.bind(this);
    }
    
    static navigationOptions = ({ navigation }) => ({
        title: 'Notifs', header: null
    });

    componentDidMount() {
        this.props.getUserNotifs(this.props.token);
        this.props.getConvoNotifs(this.props.token);
        this.props.getMojiNotifs(this.props.token);
        this.props.getAllNotifs(this.props.token);
    }

    refresh = () => {
        this.props.getUserNotifs(this.props.token);
        this.props.getConvoNotifs(this.props.token);
        this.props.getMojiNotifs(this.props.token);
        this.props.getAllNotifs(this.props.token);
    }

    backHandler() {
        this.props.getAuthUser(this.props.token);
        this.props.navigation.pop();
    }
    
    render() {
        return (
            <PTRView onRefresh={this.refresh}>
              <View>
                <TouchableOpacity onPress={() => this.backHandler()}>
                  <Text style={styles.h3}>Back</Text>
                </TouchableOpacity>

                <Text style={styles.h3}>User Notifs</Text>
              <FlatList
                data={this.props.user_notifs}
                renderItem={({item}) =>
                            <NotifItem
                                  item={item}
                                  type='users'
                                  navigation={this.props.navigation}/>}
                keyExtractor={item => item.id.toString()}/>

                <Text style={styles.h3}>Convo Notifs</Text>
              <FlatList
                data={this.props.convo_notifs}
                renderItem={({item}) =>
                            <NotifItem
                                  item={item}
                                  type='convos'
                              navigation={this.props.navigation}/>}
                keyExtractor={item => item.id.toString()}/>

                <Text style={styles.h3}>Moji Notifs</Text>
              <FlatList
                data={this.props.moji_notifs}
                renderItem={({item}) =>
                            <NotifItem
                                  item={item}
                                  type='mojis'
                              navigation={this.props.navigation}/>}
                keyExtractor={item => item.id.toString()}/>

                <Text style={styles.h3}>Read Notifs</Text>
              <FlatList
                data={this.props.all_notifs}
                renderItem={({item}) =>
                            <NotifItem
                                  item={item}
                                  type='all'
                              navigation={this.props.navigation}/>}
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
    console.log('notifs', state.userReducer.moji_notifs);
    return {
        user_notifs: state.userReducer.user_notifs,
        convo_notifs: state.userReducer.convo_notifs,
        moji_notifs: state.userReducer.moji_notifs,
        all_notifs: state.userReducer.all_notifs,
        
        token: state.authReducer.token,
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Notifs);
