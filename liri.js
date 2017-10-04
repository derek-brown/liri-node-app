var userInput = process.argv[2];
var Twitter = require("twitter");
var APIKeys = require("./keys.js");
var Spotify = require("node-spotify-api");

if(userInput === "my-tweets"){
	
	var tKeys = new Twitter(APIKeys.twitterKeys);

	var params = {screen_name: 'sample_derek', count: 20};
		tKeys.get('statuses/user_timeline', params, function(error, tweets, response) {
  			if (!error) {
  				for(var i=0; i<tweets.length; i++){
  					console.log(tweets[i].text);
  				}
  			}
 		});
}
else if(userInput === "spotify-this-song"){

	var spotify = new Spotify(APIKeys.spotifyKeys);

	var songChoice = [];
	var song;

	if(userInput){
		for(var i=3; i<process.argv.length; i++){
			songChoice.push(process.argv[i]);
		}

		song = JSON.stringify(songChoice);

		console.log(song);
		spotify.search({type: "track", query: song}, function(err, data){
			if(err){
				console.log('Error: occured: ' + err);
				return;
			}
			
			console.log(data);
		})
	}
	//Artist
	//the song's name
	//A preview lin of the song from spotify
	//the album that the song is from
	//if no song is selected default to "the sign" by Ace of Base
	//will utilize the spotify node package
}
else if(userInput === "movie-this"){
	console.log("movies!");
	//title of movie
	//year the movie came out
	//IMDB rating of the movie
	//Rotten tomatoes rating
	//country where the movie was produced
	//Plot of the movie
	//Actors in the movie
	//default movie will be Mr. Nobody
	//use OMDB, api key is "40e9cece"
}
else if(userInput === "do-what-it-says"){
	console.log("random!");
	//using fs node package take the text from inside random.txt
}
else if(!userInput){
	console.log("Please enter one of the following!\n"+
	"For tweets enter: my-tweets\n"+
	"For songs enter: spotify-this-song\n"+
	"For movies enter: movie-this\n"+
	"For random enter: do-what-it-says");
}