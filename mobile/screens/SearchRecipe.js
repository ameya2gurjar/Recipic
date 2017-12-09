import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import config from '../config'

class SearchRecipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: 'This is the Search Recipes Page lol',
      searchterm: ""
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <View>
      <TextInput
        value={this.state.searchterm}
        multiline= {false}
        placeholder="Search for something"
        onChangeText={(searchterm) => this.setState({searchterm})}
        style={{flex:1}}
      />
        <Text>{this.state.message}</Text>

      </View>
    );
  }

}

export default SearchRecipe;
