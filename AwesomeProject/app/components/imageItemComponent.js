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

class ImageItem extends Component {
    constructor(props) {
        super(props);
        this.uploadHandler = this.uploadHandler.bind(this);
    }

    uploadHandler(file) {
        // FormData() is fine, no syntax error
        let data = new FormData();
        // data.append('name', 'someName');
        data.append('photo', {
            uri: file.image.uri,
            type: 'image/jpeg',
            name: 'someOtherName'
        });

        this.props.upload(this.props.token, data);
    }

    render() {
        return (
            <View>              
              <TouchableOpacity onPress={() => this.uploadHandler(this.props.item.node)}>
                <Image
                  key={this.props.index}
                  style={{
                      width: 100,
                      height: 100,
                  }}
                  source={{ uri: this.props.item.node.image.uri }}
                  keyExtractor={() => this.props.item.node.image.timestamp.toString()}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(ImageItem);
