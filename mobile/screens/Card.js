import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  Image,
  ListItem,
  View,
} from 'react-native';

import { Card } from 'react-native-elements';

import config from '../config'

class RecipeCard extends React.Component {

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
<Card flexDirection='row' >
  <View style={{flex: 1, flexDirection:'row', marginRight:110}}>
				<Image
				style={{height: 100, width: 100, borderRadius:10, marginRight:10}}
				source={{uri: this.props.data.imageurl}}
				/>
				<View>
				<Text numberOfLines={3} ellipsizeMode ={'tail'} style={{fontSize:18, marginBottom:10}}>
				  {this.props.data.name}
				</Text>
			<Text style={{color:'#777'}}>
				By: {this.props.data.recipeby}
			</Text>
			</View>
</View>
			</Card>
      
    );
  }

}

export default RecipeCard;