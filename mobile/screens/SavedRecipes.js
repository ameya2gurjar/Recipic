import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import config from '../config'

class SavedRecipes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: 'This is the Saved Recipes Page',
	  noRecipeYet: true
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <View>
		
		{this.state.noRecipeYet && <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
		padding: 50,
			marginTop: 150
      }}>
			
		<Image style ={{width:200, height:200}}
          source={require('../images/save-burger.png')}
        />
		<Text style={{fontSize:18, textAlign: 'center'}}>{"You've not saved any recipes yet. Click on the star on any recipe you like :)"}</Text>
				</View>}
		
        
      </View>
    );
  }

}

export default SavedRecipes;
//
//<Button
//          onPress={() => this.props.navigation.navigate('RecipePage')}
//          title="Go to Recipe"
//        />