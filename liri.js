
var request = require('request');
var moment = require('moment');

// read and set any environment variables with the dotenv package
require("dotenv").config();

// import the `keys.js` file and store it in a variable.
var Keys = require("./keys")

// Spotify
var Spotify = require("node-spotify-api");
var spotify = new Spotify(Keys.spotify);

// Makes it so that it can take inputs
var userCommand = process.argv[2];
var userInput = process.argv[3];

if (userCommand === "spotify-this-song" && process.argv.length === 4) {

    spotify.search({ type: 'track', query: userInput }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("\nSONG INFO\n");
        console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name + "\n");
    });
}
else if (userCommand === "spotify-this-song" && process.argv.length === 3) {
    spotify.search({ type: 'track', query: "The Sign" }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // for (var i = 0; i < data.tracks.items.length; i++) {
        //     console.log(i + " " + data.tracks.items[i].name);
        // }
        // console.log(data.tracks.items[7]);
        console.log("\nSONG INFO\n");
        console.log("Artist(s): " + data.tracks.items[7].artists[0].name);
        console.log("Song Name: " + data.tracks.items[7].name);
        console.log("Preview Link: " + data.tracks.items[7].preview_url);
        console.log("Album: " + data.tracks.items[7].album.name + "\n");
    });
}

if (userCommand === "concert-this" && process.argv.length === 4) {

    request("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp", function (error, response) {
        if (error) {
            console.log('error:', error);
        }

        var info = JSON.parse(response.body);
        // console.log(info);
        console.log("\nCONCERT INFO\n");

        for (var i = 0; i < info.length; i++) {
            console.log("Venue: " + info[i].venue.name);
            if (info[i].venue.region === '') {
                console.log("City: " + info[i].venue.city + ", " + info[i].venue.country)
            }
            else {
                console.log("City: " + info[i].venue.city + ", " + info[i].venue.region);
            }
            console.log(moment(info[i].datetime).format("MMMM Do YYYY") + "\n");
        }
    });
}
else if (userCommand === "concert-this" && process.argv.length === 3) {
    console.log("\nOops! Looks like you forgot to include which artist/band you're searching for.\n")
}

if (userCommand === "movie-this" && process.argv.length === 4) {

    request("http://www.omdbapi.com/?apikey=trilogy&r=json&t=" + userInput, function (error, response) {
        if (error) {
            console.log('error:', error);
        }

        var info = JSON.parse(response.body);
        console.log("\nMovie INFO\n");
        console.log("Title: " + info.Title);
        console.log("Year: " + info.Year);
        console.log("IMBD Rating: " + info.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + info.Ratings[1].Value);
        console.log("Produced In: " + info.Country);
        console.log("Language: " + info.Language);
        console.log("Plot: " + info.Plot);
        console.log("Actors: " + info.Actors + "\n");
    });
}
else if (userCommand === "movie-this" && process.argv.length === 3){
    request("http://www.omdbapi.com/?apikey=trilogy&r=json&t=mr+nobody", function (error, response) {
        if (error) {
            console.log('error:', error);
        }

        var info = JSON.parse(response.body);
        console.log("\nMovie INFO\n");
        console.log("Title: " + info.Title);
        console.log("Year: " + info.Year);
        console.log("IMBD Rating: " + info.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + info.Ratings[1].Value);
        console.log("Produced In: " + info.Country);
        console.log("Language: " + info.Language);
        console.log("Plot: " + info.Plot);
        console.log("Actors: " + info.Actors + "\n");
    });
}

