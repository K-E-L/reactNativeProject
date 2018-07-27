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
    Switch,
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
        this.uploadHandler = this.uploadHandler.bind(this);
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

    uploadHandler() {
        // FormData() is fine, no syntax error
        let data = new FormData();
        data.append('name', this.props.image_name_body);
        data.append('private', this.props.image_private);
        data.append('photo', {
            uri: this.props.selec_image.image.uri,
            type: 'image/jpeg',
            name: this.props.image_name_body
        });

        this.props.upload(this.props.token, data);
    }
    
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
              <Text style={styles.h3}>Selected Image: </Text>
                            
              {this.props.image_loaded && <Image
                  style={{
                      width: 100,
                      height: 100,
                  }}
                                           source={{ uri: this.props.selec_image.image.uri }}/>}

              <Text style={styles.h3}>Name: </Text>
              
              <TextInput
                onChangeText={(text) => this.props.setImageNameBody(text)}
                value={this.props.image_name_body}
                placeholder='name'/>

              <Text style={styles.h3}>Make Private?</Text>

              <Switch
                onValueChange = {this.props.toggleImagePrivate}
                value = {this.props.image_private}/>

              <TouchableOpacity
                onPress={() => this.uploadHandler()}>
                <Text style={styles.link}>Upload</Text>
              </TouchableOpacity>

              
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
    console.log('images', state.navReducer.selec_image);
    return {
        token: state.authReducer.token,
        
        images: state.navReducer.images,
        selec_image: state.navReducer.selec_image,        
        image_loaded: state.navReducer.image_loaded,
        image_name_body: state.navReducer.image_name_body,
        image_private: state.navReducer.image_private
    };
}

// Pass: redux actions to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

// Connect: everything
export default connect(mapStateToProps, mapDispatchToProps)(Images);
