# ironSource student code challenge

This is the backend infrastructure for "TweetMe", created by Guy Benbenisti for ironSource student code challenge.

# The service features includes:

1. Tweet a new message

2. Get a list of most recent tweets from the user's feed.

3. Search tweets using a key word, location and a radius. The service will respond with all tweets found, related to the keyword and in the radius of the location.

# Important Notes:

1. The service is using a test user that can be configered by replacing the  "access_token_key" and "the access_token_secret" attributes    in the file UserSettings.js.
   Currently defined for a test user I created - @Gbenenisti

2. Location has the attributes "latitude", "longitude","radius" radius can be either km or mi.

   Legal input example:

   {"latitude" : "32.0717552", "longitude" : "34.786993", "radius": "5km"} 

   This is the location of ironSource office in Tel Aviv.

# Useful link:

1. The service is deployed at heroku and can be found in the link: https://tweetme4ironsource.herokuapp.com/
   For testing, I created a simple html landing page that allows you to test the first and second featurs.

2. To test the third one simply use the following link and change the keyword to your desired keyword and latitude,longtitude and radius    to your desire location. If no values given the deafult is to search for tweets including the word 'ironSource' in 5km radius from      the ironSource offices building in Tel Aviv.
   https://tweetme4ironsource.herokuapp.com/searchTweetsNearMe?q=keyword&lat=latitude&long=longitude&rad=radius

Enjoy, 
Guy Benbenisti.
