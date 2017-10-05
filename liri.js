var userInput = process.argv[2];
var Twitter = require("twitter");
var APIKeys = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

if(userInput === "my-tweets"){
	
	var twitter = new Twitter(APIKeys.twitterKeys);

	var params = {screen_name: 'sample_derek', count: 20};
		twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
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

	for(var i=3; i<process.argv.length; i++){
		songChoice.push(process.argv[i]);
	}

	if(!process.argv[3]){
		song = JSON.stringify("The Sign");
	}else{
		song = JSON.stringify(songChoice);
	}

	console.log(song);
	spotify.search({type: "track", query: song}, function(err, data){
		if(err){
			console.log('Error: occured: ' + err);
			return;
		}
		
		console.log("-----------------------------\n"+
			"Artist: " + data.tracks.items[0].artists[0].name + "\n"+
			"Song Name: " + song + "\n"+
			"Album: " + data.tracks.items[0].album.name + "\n"+
			"------------------------------\n");

		console.log();
	})
	//Artist
	//the song's name
	//A preview lin of the song from spotify
	//the album that the song is from
	//if no song is selected default to "the sign" by Ace of Base
	//will utilize the spotify node package
}
else if(userInput === "movie-this"){
	var movieChoice = [];
	var movie = "";

	for(var i=3; i<process.argv.length; i++){
		movieChoice.push(process.argv[i]);
	}

	if(!process.argv[3]){
		movie = JSON.stringify("Mr. Nobody");
	}else{
		movie = JSON.stringify(movieChoice);
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function(error, response, body){
		if(!error){
			console.log("----------------------\n"+
			"Title: " + JSON.parse(body).Title + "\n"+
			"Release Year: " + JSON.parse(body).Year + "\n"+
			"IMDB Rating: " + JSON.parse(body).imdbRating + "\n"+
			"Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value + "\n"+
			"Plot of the Movie: " + JSON.parse(body).Plot + "\n"+
			"Country where the movie was produced: " + JSON.parse(body).Country + "\n"+
			"Actors in the movie: " + JSON.parse(body).Actors + "\n"+
			"----------------------");
		}
	});
}
else if(userInput === "do-what-it-says"){

	fs.readFile("random.txt", "utf8", function(error, data){
		if (error){
			return console.log(error);
		}
		console.log(data);
	})
	//using fs node package take the text from inside random.txt
}
else if(!userInput){
	console.log("Please enter one of the following!\n"+
	"For tweets enter: my-tweets\n"+
	"For songs enter: spotify-this-song\n"+
	"For movies enter: movie-this\n"+
	"For random enter: do-what-it-says");
}