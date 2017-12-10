import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
	Image
} from 'react-native';
import { ImagePicker } from 'expo';

import config from '../config'

class SearchRecipe extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
    	message: 'This is the Search Recipes Page',
		image: null,
		image_base64: "",
		searchterm: ""
    }
  }

  componentDidMount() {
  }
	startSearch = () => {
		console.log("Submitted: " + this.state.searchterm);
		let myRequest = new Request(`${config.API_BASE}/api/db/search`, {
      method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    'searchterm': this.state.searchterm,
  }),	
    });
    // console.log('request', myRequest);

    fetch(myRequest)
      .then(response => {
        // https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(res => res.json())
      .then(json => {
      })
      .catch(error => {
        this.setState({ 'authStatus': 'broken; are you logged in? check logs.' });
      });
	}
	

  render() {
	  let { image } = this.state;
	  
    return (
      <View>
      <TextInput
        value={this.state.searchterm}
        multiline= {false}
        placeholder={"Search for something"}
        onChangeText={(searchterm) => this.setState({searchterm})}
		onSubmitEditing={this.startSearch}
      />

<Button
          title="Pick an image from camera!"
          onPress={this._pickImageCamera}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
		}

<Button
          title="Pick an image from camera roll!"
          onPress={this._pickImageCameraRoll}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
		}
		
        <Text>{this.state.message}</Text>

      </View>
    );
  }

sendImage()
{
	
//	const file = {
//  uri: this.state.image,             // e.g. 'file:///path/to/file/image123.jpg'
//}
//
//const body = new FormData()
//body.append('file', file)
//console.log(body);
//let myRequest1 = new Request(`${config.API_BASE}/api/db/image`, {
//      method: 'POST',
//  headers: {
//    Accept: 'multipart/form-data',
//    'Content-Type': 'multipart/form-data',
//  },
//  body:body,	
//    });
//     console.log('request', myRequest1);
//
//    fetch(myRequest1)
//      .then(response => {
//		console.log(response);
//        // https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
//        if (!response.ok) {
//          throw Error(response.statusText);
//        }
//        return response;
//      }).then((error) => {
//        return Promise.reject(error);
//      })
//      .then(res => res.json())
//      .then(json => {
//      })
//      .catch(error => {
//        this.setState({ 'authStatus': 'broken; are you logged in? check logs.' });
//      });
	
	
	
	
	
	
//	let uri = this.state.image;
//	let apiUrl = `${config.API_BASE}/api/db/image`;
//  let uriParts = uri.split('.');
//  let fileType = uri[uri.length - 1];
//
//  let formData = new FormData();
//  formData.append('photo', {
//    uri,
//    name: `photo.${fileType}`,
//    type: `image/${fileType}`,
//  });
//
//  let options = {
//    method: 'POST',
//    body: formData,
//    headers: {
//      Accept: 'application/json',
//      'Content-Type': 'multipart/form-data',
//    },
//  };
//
//fetch(apiUrl, options);
	
	
	
	
	
	
	
	
	
	
//	console.log(this.state.image);
		const new_req = {
		"requests": [{
			"image": {
				"content": this.state.image_base64 },
			"features": [{
				"type": "LABEL_DETECTION",
				"maxResults": 5
			}]
		}]
	};	
	
		fetch("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyD85XfS8cndzKdDB6z_Qp4r05hGFbBSC-w",{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(new_req)
		})
		.then(res =>
			  console.log(res))
			 //JSON.parse(res.bodyInit))
		.then(body => {
			//this.setState({fromVisionAPI:})
			console.log(body);
		});
}
  
  _pickImageCamera = async () => {
	  
	  
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
		base64: true,
		quality: 0.5
    });

//    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri, image_base64: result.base64 });
		this.sendImage();
    }
	  
	  
  };

_pickImageCameraRoll = async () => {
	  
	  
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
		base64: true,
		quality: 0.5
    });

//    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri, image_base64: result.base64 });
	// send this to the server
		this.sendImage();
    }
	  
	  
  };
}

export default SearchRecipe;
