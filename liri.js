// Make a JavaScript file named liri.js.
// At the top of the liri.js file, add code to read and set any environment variables with the dotenv package:
// require("dotenv").config();

// Add the code required to import the keys.js file and store it in a variable.
// var keys = require("./keys.js");
// You should then be able to access your keys information like so
// var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var fs = require("fs");
var Spotify = require('node-spotify-api');
//module.exports = CastMember ???


var action = process.argv[2];
var value = process.argv[3];

// Spotify Variables
var trackName = value;


// node liri.js spotify-this-song '<song name here>'
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// If no song is provided then your program will default to "The Sign" by Ace of Base.

var hitSpotify = function (_trackName) {

    // Set fefault song if _trackName is empty.
    if (!_trackName) _trackName = "The Sign";

    var spotify = new Spotify({
        //     SPOTIFY_ID=1cece788870c44dd93ee1ba75313f349
        // SPOTIFY_SECRET=53c0e77758c44504936fc412612bd454
        id: "1cece788870c44dd93ee1ba75313f349",
        secret: "53c0e77758c44504936fc412612bd454"
    });

    spotify.search({
        type: 'track',
        query: _trackName
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);

        // console.log(data);
        console.log(data.tracks.items[0]);

    });
}


if (action) {

    switch (action) {
        case 'spotify-this-song':
            hitSpotify(trackName);
            break;
        case 'concert-this':
            // hitSpotify();
            break;
        case 'movie-this':
            // hitSpotify();
            break;
        case 'do-what-it-says':
            // hitSpotify();
            break;
    }
} else {
    printHelp();
}

var help = function printHelp() {
    console.log(`
                            Incorrect command format.Here are some samples:
                            node liri.js spotify - this - song 'Take This Waltz'
                            node liri.js concert - this 'Dave Matthews Band'
                            node liri.js movie - this 'You Have Mail'
                            node liri.js do -what - it - says `);
};



var hitAxios = function () {

    // axios.get('http://img.omdbapi.com/?i=tt3896198&r=json&apikey=90c3533d')
    axios.get('http://omdbapi.com/?i=tt3896198&r=json&apikey=90c3533d')
        .then(function (response) {
            console.log("SUCCESSFUL AXE");
            console.log(response.data);
            console.log(response.status);
            console.log(response.headers);


            // resultElement.innerHTML = generateSuccessHTMLOutput(response);
        })
        .catch(function (error) {
            console.log("UNSUCCESSFUL AXE");
            console.log(error);
            // resultElement.innerHTML = generateErrorHTMLOutput(error);
        });
}



// GET request for remote image
// axios({
//         method: 'get',
//         // url: 'http://bit.ly/2mTM3nY',
//         url: 'http://img.omdbapi.com/?t=Rookie+of+the+Year&apikey=90c3533d',
//         // http://www.omdbapi.com/?i=tt3896198&apikey=90c3533d
//         // responseType: 'stream'
//     })
//     .then(function (response) {
//         console.log(response);
//         // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
//     });




// Make it so liri.js can take in one of the following commands:

// concert-this

// spotify-this-song

// movie-this

// do-what-it-says

// What Each Command Should Do
// node liri.js concert-this <artist/band name here>

// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:

// Name of the venue

// Venue location

// Date of the Event (use moment to format this as "MM/DD/YYYY")


// node liri.js movie-this '<movie name here>'

// This will output the following information to your terminal/bash window:

//   * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Rotten Tomatoes Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/

// It's on Netflix!

// You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.

// node liri.js do-what-it-says

// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

// Edit the text in random.txt to test out the feature for movie-this and concert-this.

// BONUS
// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.

// Make sure you append each command you run to the log.txt file.

// Do not overwrite your file each time you run a command.

// Reminder: Submission on BCS
// Please submit the link to the Github Repository!
// Minimum Requirements
// Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed. Adding a README.md as well as adding this homework to your portfolio are required as well and more information can be found below.

// Create a README.md
// Add a README.md to your repository describing the project. Here are some resources for creating your README.md. Here are some resources to help you along the way:

// About READMEs

// Mastering Markdown

// Add To Your Portfolio
// After completing the homework please add the piece to your portfolio. Make sure to add a link to your updated portfolio in the comments section of your homework so the TAs can easily ensure you completed this step when they are grading the assignment. To receive an 'A' on any assignment, you must link to it from your portfolio.

// One More Thing
// If you have any questions about this project or the material we have covered, please post them in the community channels in slack so that your fellow developers can help you! If you're still having trouble, you can come to office hours for assistance from your instructor and TAs.

// Good Luck!