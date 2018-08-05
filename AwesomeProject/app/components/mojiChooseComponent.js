// import: basics
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Button,
    CameraRoll,
    Dimensions,
    FlatList,
    Image,
    ListItem,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    View
} from 'react-native';

// import: actions
import * as Actions from '../actions/rootActions';

// const ScreenHeight = Dimensions.get("window").height;

class MojiChoose extends Component {    
    constructor(props) {
        super(props);
        this.setMojiTypeHandler = this.setMojiTypeHandler.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Moji Choose', header: null
    });

    componentDidMount() {
        this.props.getAuthUser(this.props.token);
        this.props.getConvos(this.props.token);
        this.props.getMaxMoji(this.props.token);
        
        this.props.setMessageFirstMoji(this.props.token);
        this.props.setCommentFirstMoji(this.props.token);
        this.props.setReplyFirstMoji(this.props.token);
    }

    setMojiTypeHandler(type) {
        this.props.setMojiType(type);
        this.props.navigation.push('Mojis');
    }

    render() {
        return (
            <View>
              <TouchableOpacity onPress={() => this.setMojiTypeHandler('Popular')}>
                <Text style={styles.link}>Most Popular</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setMojiTypeHandler('Recent')}>
                <Text style={styles.link}>Recent</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setMojiTypeHandler('Following')}>
                <Text style={styles.link}>Recent Following</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('SearchMoji')}>
                <Text style={styles.link}>Search Moji</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('Images')}>
                <Text style={styles.link}>Upload Moji</Text>
              </TouchableOpacity>
              
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
    },
    link: {
        fontSize: 30,
        color: '#00a9ff'
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
export default connect(mapStateToProps, mapDispatchToProps)(MojiChoose);
