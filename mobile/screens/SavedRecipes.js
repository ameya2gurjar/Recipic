import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import config from '../config'

class SavedRecipes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: 'This is the Saved Recipes Page',
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <View>
        <Text>{this.state.message}</Text>
        <Button
          onPress={() => this.props.navigation.navigate('RecipePage')}
          title="Go to Recipe"
        />
      </View>
    );
  }

}

export default SavedRecipes;
