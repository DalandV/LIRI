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

        console.log("\n" + "SONG INFO" + "\n");
        console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name + "\n");
    });
}
else {
    spotify.search({ type: 'track', query: "The Sign" }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // for (var i = 0; i < data.tracks.items.length; i++) {
        //     console.log(i + " " + data.tracks.items[i].name);
        // }
        // console.log(data.tracks.items[7]);
        console.log("\n" + "SONG INFO" + "\n");
        console.log("Artist(s): " + data.tracks.items[7].artists[0].name);
        console.log("Song Name: " + data.tracks.items[7].name);
        console.log("Preview Link: " + data.tracks.items[7].preview_url);
        console.log("Album: " + data.tracks.items[7].album.name + "\n");
    });
}
