import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import config from '../config'

class RecipePage extends React.Component {
  static navigationOptions = {
    title: 'Recipe Page',
  };

  constructor(props) {
    super(props);
    this.state = {
      message: 'This is the Recipe Page',
    }
  }



  render() {
    return (
      <View>
        <Text>message: {this.state.message}</Text>
      </View>
    );
  }

}

export default RecipePage;
