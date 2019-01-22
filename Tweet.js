/**
 * This moudle contains the implementation of posting a new tweet to Twitter service.
 *
 * @type {{}}
 */
const DEF_MESSAGE = "Hello, this is default tweet posted by TweetMe."
const DEF_TWEETS_TO_FETCH = 20;
const DEF_LOCATION = {
    "latitude": "32.0763813",
    "longitude": "34.7748321",
    "radius": "5km"};
const DEF_SEARCH_WORD = "ironSource";

module.exports = {

    /**
     * this method receives a connection to twitterAPI, a tweet content to post and a response object.
     * It posts a default message in case content is an empty string, and response to the client 200 with the content of the post if posting was successful.
     * If posting fail it will respond with status 400.
     * @param response
     * @param twitterAPI
     * @param tweetContent
     */
    postTweet : function(response, twitterAPI, tweetContent) {
        if(typeof tweetContent == 'undefined') {
            tweetContent = DEF_MESSAGE;
        }
        let params = {status: tweetContent};
        twitterAPI.post('statuses/update', params, function(error, content, res){
            if (!error) {
                var msg = `Tweet was posted: ${content.text}`;
                response.status(200).send(msg);
                console.log("Tweet was posted: %s", content.text)
            } else {
                response.status(400).send("Unable to post tweet.");
                console.log("Unable to post tweet.")
            }
        })
    },

    /**
     * This method fetches 'count' tweets from the users time line.
     * @param response
     * @param twitterAPI
     * @param count - amount of tweets to fetch
     */
    getRecentTweets : function (response, twitterAPI, count) {
        if(isNaN(count) || count < 1 || count > 200)
        {
            count = DEF_TWEETS_TO_FETCH;
        }
        let params = {count: count};
        twitterAPI.get('statuses/home_timeline', params, function (error, content, res) {
            if (!error) {
                response.status(200).header("Content-Type", 'application/json');
                response.send(JSON.stringify(content, null, 4));
            }
        });
    },

    /**
     * This method get's a client, a query that represents a search word , and a location.
     * It finds all the tweets relevant to the search word and that were twitted by users near by the location.     
     */
    TweetsNextToMe: function(response, twitterAPI, query, location){
        if(typeof query == "undefined" || typeof location != "object")
        {
            query = DEF_SEARCH_WORD;
            location = DEF_LOCATION;
        }
        let params = {q: query, geocode: location};
        twitterAPI.get('tweets', params, function(error, data, res){
            if(!error){
                response.status(200).header("Content-Type", 'application/json');
                response.send(JSON.stringify(data, null, 4));
            }
            else{
                response.status(400).send("Cannot find any tweets next to you");
                Console.log("Cannot find any tweets next to you")
            }
        });
    }
}