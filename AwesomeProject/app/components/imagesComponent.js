// import: basics
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Button,
    CameraRoll,
    FlatList,
    Image,
    ListItem,
    ScrollView,
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

// import: dumb components
import ImageItem from'./imageItemComponent';

class Images extends Component {
    constructor(props) {
        super(props);
        this.backHandler = this.backHandler.bind(this);
        this.loadImages = this.loadImages.bind(this);
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Images', header: null
    });

    componentDidMount() {
        this.loadImages();
    }
    
    refresh = () => {
        this.loadImages();
    }

    backHandler() {
        this.props.navigation.pop();
    }

    loadImages() {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'All',
        })
            .then(r => {
                this.props.setImages(r.edges);
            })
            .catch((err) => {
                console.log('error');
            });
    };

    render() {
        return (
            <PTRView onRefresh={this.refresh}>
              <TouchableOpacity onPress={() => this.backHandler()}>
                <Text style={styles.h3}>Back</Text>
              </TouchableOpacity>
              
              <FlatList
                data={this.props.images}
                horizontal={true}
                renderItem={({item, index}) =>
                            <ImageItem
                                  item={item}
                                  index={index}
                              />}
                              keyExtractor={(item, index) => index.toString()}/>

                              
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
    console.log('images', state.navReducer.images);
    return {
        token: state.authReducer.token,
        images: state.navReducer.images
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Images);
