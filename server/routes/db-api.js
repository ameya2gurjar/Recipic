var express = require('express');
var router = express.Router();
var request = require('request');
const cheerio = require('cheerio');

const checkJwt = require('../auth').checkJwt;
const fetch = require('node-fetch');

// simple API call, no authentication or user info
router.get('/unprotected', function(req, res, next) {

  req.db.collection('max_todo').find().toArray(function(err, results) {
    if (err) {
      next(err);
    }

    res.json({
      todos: results
    });
  });

});

router.post('/search', function(req, res, next){

  var searchterm = req.body.searchterm;
  // var searchterm = "ham sandwich"
  console.log(searchterm);
  var recipes = [];
  var link = "http://allrecipes.com/search/results/?wt=" + searchterm;

    request(link, function (error, response, body) {
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', body); // Print the HTML for the Google homepage.

      if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      $('article.grid-col--fixed-tiles').each(function(i, element){
        if(!($(this).hasClass('hub-card') || $(this).hasClass('video-card')) && !($(this).next().hasClass('article-card'))){
          var recipe = new Object();
	        var a = $(this).find('h3').text();
          var imageurl = $(this).find('img').attr("data-original-src");
          var text = $(this).find('div.rec-card__description').text();
          var recipeby = $(this).find('ul.cook-details').find('li').find('h4').text();
          var nextlink = "allrecipes.com" + $(this).find('a').attr("href");
          //console.log(imageurl);
          //console.log(text);
          //console.log(recipeby);
          //console.log(nextlink);

          if(!!a && !!imageurl && !!text && !!recipeby && !!nextlink){
            recipe.name = a.trim();
            recipe.imageurl = imageurl.trim();
            recipe.text = text.trim();
            recipe.recipeby = recipeby.substring(10).trim();
            recipe.nextlink = nextlink.trim();
	          recipes.push(recipe);
          }
        }
      });
      //console.log(recipes);
          res.json({'recipes':recipes});
    }
    });
});


// checkJwt middleware will enforce valid authorization token
router.get('/protected', checkJwt, function(req, res, next) {

  req.db.collection('max_todo').find().toArray(function(err, results) {
    if (err) {
      next(err);
    }

    res.json({
      todos: results
    });
  });

  // the auth0 user identifier for connecting users with data
  console.log('auth0 user id:', req.user.sub);

  // fetch info about the user (this isn't useful here, just for demo)
  const userInfoUrl = req.user.aud[1];
  const bearer = req.headers.authorization;
  fetch(userInfoUrl, {
  	headers: { 'authorization': bearer },
  })
    .then(res => res.json())
    .then(userInfoRes => console.log('user info res', userInfoRes))
    .catch(e => console.error('error fetching userinfo from auth0'));

});

module.exports = router;
