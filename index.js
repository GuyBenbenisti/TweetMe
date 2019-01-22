/**
 * TweetMe intergrates with twitter services and allows us to tweet and get tweet.
 * It serves as a proxy server in a way that the client does not need to access Twitter directly but it is done through the TweetMe server.
 *
 * Written by Guy Benbenisti in use for ironSource student code challenge.
 */

// Requiring configurations and modules.
const express = require('express'),
    Twitter = require('twitter'),
    UserSettings = require('./UserSettings.js'),
    TweetMe = require('./TweetMeFeatures'),
    fs = require('fs');

// Connecting to twitter and setting up the server
const application = express();
const port = process.env.PORT || 8080;
const twitterAPI = new Twitter(UserSettings.keysAndTokens);

application.get('/post', function (request, response) {
    var tweetContent = request.query.content;
    TweetMe.postTweet(response, twitterAPI, tweetContent);
});

application.get('/getRecentTweets', function (request, response) {
    var count = request.query.count;
    TweetMe.getRecentTweets(response, twitterAPI, count);
});

application.get('/searchTweetsNearMe', function(request, response){
    var query = request.query.q;
    var location = {
        "latitude": request.query.lat,
        "longitude": request.query.long,
        "radius": request.query.rad};
    TweetMe.TweetsNextToMe(response, twitterAPI, query, location)
})

application.get('*', (request, response) => {
    fs.readFile('./LandingPage.html', function (err, html) {
        if (err) {
            throw err;
        }
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    });
});

application.listen(port, () => {
    console.log("Server is listening on port: %s", port);
});