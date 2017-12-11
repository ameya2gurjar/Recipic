import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import config from '../config'
import { Share } from 'react-native'
import { Card } from 'react-native-elements';
import { CheckBox } from 'react-native-elements'
import { List, ListItem } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';


class RecipePage extends React.Component {

  static navigationOptions = {
    title: 'Burger'
  };


  _shareTextMessage () {
    Share.share({
      message: 'I found a cool recipe on:  http://google.com'
    })
    .then(this._showResult)
    .catch(err => console.log(err))
  }

  _showResult (result) {
    console.log(result)
  }

  constructor(props) {
    super(props);
    this.state = {isFavourite : false};
    this.addToFavourites = this.addToFavourites.bind(this);
    this.removeFromFavourites = this.removeFromFavourites.bind(this);
  }

  addToFavourites (){
    this.setState({isFavourite : true});
  }

  removeFromFavourites (){
    this.setState({isFavourite : false});
  }


  componentDidMount(){

    let myRequest = new Request(`${config.API_BASE}/api/db/getRecipe`, {
    method: 'POST',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'link': "http://allrecipes.com/recipe/214947/perfect-summer-fruit-salad/",
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
		      console.log(json);

      })
      .catch(error => {
        this.setState({ 'authStatus': 'broken; are you logged in? check logs.' });
      });
  }

  renderItem({ item, index }) {
      return <Text style={{textAlign: 'center'}}>{index + 1}. {item}</Text>;
   }

  render() {

  console.log(this.state.isFavourite);

    if(!this.state.isFavourite){
      icon = <Ionicons name="md-heart-outline" size={40} style={{width: 50, height: 40, marginTop: 5}} onPress={this.addToFavourites}/>
    }
    else {
      icon = <Ionicons name="md-heart" size={40} style={{width: 50, height: 40, marginTop: 5}} onPress={this.removeFromFavourites}/>
    }

  return (
    <View>
      <View style={{flexDirection: 'row', alignSelf: 'center', borderWidth: 1,
        borderRadius: 75, marginTop: 20}}>
        <Image
            style={{width: 500, height: 200}}
            source={{uri: 'https://cbsnews2.cbsistatic.com/hub/i/r/2012/03/30/cc26a85a-d26f-11e2-a43e-02911869d855/thumbnail/620x350/c0a45b5d426bb465b160c6fdbce12124/whopper.jpg'}}
          />
      </View>
      <View style={{flexDirection: 'row', width: 400, alignItems: 'center'}}>
         <Ionicons name="md-share" size={40} style={{width: 30, height: 40, marginTop: 5}} onPress={this._shareTextMessage}/>
        {icon}
      </View>
      <View>
      <Text style={{fontSize:18, textAlign: 'center', fontFamily:'sans-serif-condensed'}}>Name of the recipe</Text>
      </View>
      <View>
      <Text style={{fontSize:18, textAlign: 'center', fontFamily:'sans-serif-condensed'}}>Ingrediants</Text>
      <FlatList
          data={[ 'A', 'B', 'C', 'D']}
          renderItem={this.renderItem}
      />
      </View>
      <View>
      <Text style={{fontSize:18, textAlign: 'center', fontFamily:'sans-serif-condensed'}}>Directions</Text>
      <FlatList
          data={[ 'A', 'B', 'C', 'D']}
          renderItem={this.renderItem}
      />
      </View>
    </View>
    );
  }

}

export default RecipePage;
