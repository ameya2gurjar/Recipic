import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';


import config from '../config'

class RecipePage extends React.Component {
  static navigationOptions = {
    title: 'Burger',

  };

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <View>
        <View style={{flexDirection: 'row', alignSelf: 'center', borderWidth: 1,
        borderRadius: 75, marginTop: 20}}>
        <Image
            style={{width: 500, height: 200}}
            source={{uri: 'https://cbsnews2.cbsistatic.com/hub/i/r/2012/03/30/cc26a85a-d26f-11e2-a43e-02911869d855/thumbnail/620x350/c0a45b5d426bb465b160c6fdbce12124/whopper.jpg'}}
          />
       </View>
      </View>
    );
  }

}

export default RecipePage;
