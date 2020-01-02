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
            getMovie("Mr .Nobody");
        }
        break;
        case "do-thing":
            doThing();
            break;
        default:
            console.log("Sorry please try again.")
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
    function spotifyThis(song) {
        spotify.search({
            type: "track",
            query: song
        }, function (err, data) {
            if (err) {
                return console.log("Error occurred: " + err);
            }
            console.log(
                `
                \nArtist: ${data.tracks.items[0].artists[0].name}
                \nSong: ${data.tracks.items[0].name} 
                \nLink: ${data.tracks.items[0].external_urls.spotify} 
                \nAlbum: ${data.tracks.items[0].album.name} 
                `)
        })
    };

    function getMovie(movie) {
        axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log(`
                Title:  ${response.data.Title}
                Year:  ${ response.data.Year}
                IMDB Rating:  ${ response.data.imdbRating}
                Rotten Tomatoes Rating:  ${ response.data.Ratings[2].Value}
                Country:  ${ response.data.Country}
                Language:  ${ response.data.Language}
                Plot:  ${ response.data.Plot}
                Actors:  ${ response.data.Actors}
                `)
            })
    
    }
    function doThing() {
        fs.readFile("random.txt", "utf-8", function (err, data) {
            if (err) {
                return console.log(error);
            }
            var random = data.split(",");
            spotifyThis(random[1]);
        });
    
    }
    