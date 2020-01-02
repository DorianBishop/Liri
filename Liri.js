require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
const input = process.argv.slice(3).join();
var choice = process.argv[2];

switch (choice) {
    case "concert-this":
        concert(input);
        break;
    case "spotify-this":
        if (input) {
            spotifyThis(input);
        } else {
            spotifyThis("Low Life");
        }
        break;