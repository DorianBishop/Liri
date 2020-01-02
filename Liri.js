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
            spotifyThis("Meek Mill");
        }
        break;
        case "movie-this":
        if (input) {
            getMovie(input);
        } else {
            getMovie("Friday");
        }
        break;
        case "do-thing":
            doThing();
            break;
        default:
            console.log("Try again.")
    }
    function concert(artist) {
        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (response) {
            var songData = response.data[0];
            console.log(`
            \nVenue Name: ${songData.venue.name}
            \nVenue Location: ${songData.venue.city}, ${songData.venue.region}
            \nDate of Event: ${ moment(response.data[0].datetime).format("MM/DD/YYYY")}
            `);
    
        })
    }
 