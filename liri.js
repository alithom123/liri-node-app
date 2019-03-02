// node liri.js spotify-this-song 'Take This Waltz'
// node liri.js concert-this 'Dave Matthews Band'
// node liri.js movie-this 'You Have Mail'
// node liri.js do-what-it-says 

var axios = require("axios");
var fs = require("fs");
var Spotify = require('node-spotify-api');
//module.exports = CastMember ???


var action = process.argv[2];
var value = process.argv[3];
var startParameters = [action, value];

var trackName = value;
var movieName = value;

var hitSpotify = function (_trackName) {

    // node liri.js spotify-this-song 'Sea of Heartbreak'
    if (!_trackName) _trackName = "The Sign";

    var spotify = new Spotify({
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

        var output =
            `
                Artist: ${data.tracks.items[0].artists[0].name}
                Album:    ${data.tracks.items[0].album.name}
                Song:   ${data.tracks.items[0].name}
                URL:    ${data.tracks.items[0].external_urls.spotify}
            `;

        console.log(output);
        fs.appendFile('log.txt', output, function (err) {
            if (err) throw err;
            console.log('Saved in log!');
        });
    });
}

var hitOmdb = function (movieName) {

    var movieParameter = movieName.split(' ').join('+');
    axios.get(`http://omdbapi.com/?t=${movieParameter}&r=json&apikey=90c3533d`)
        .then(function (response) {
            let output =
                `
                Title: ${
                    response.data.Title
                }
                Year: ${
                    response.data.Year
                }
                IMDB Rating: ${
                    response.data.Ratings[0].Value
                }
                Rotten Tomatoes Rating: ${
                    response.data.Ratings[1].Value
                }
                Country: ${
                    response.data.Country
                }
                Language: ${
                    response.data.Language
                }
                Actors: ${
                    response.data.Actors
                }
                Plot: ${
                    response.data.Plot
                }
                `;

            console.log(output);
            fs.appendFile('log.txt', output, function (err) {
                if (err) throw err;
                console.log('Saved in log!');
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

function runFromFile() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        console.log(data);
        var runParameters = data.split(",");
        run(runParameters);
    });
}

var run = function (parameters) {
    console.log("in run with parameters", parameters);
    var action = parameters[0];

    if (action) {

        switch (action) {
            case 'spotify-this-song':
                hitSpotify(parameters[1]);
                break;
            case 'concert-this':
                console.log("Sorry, I didn't finish that part yet!");
                break;
            case 'movie-this':
                hitOmdb(parameters[1]);
                break;
            case 'do-what-it-says':
                runFromFile();
                break;
        }
    } else {
        printHelp();
    }

    var help = function printHelp() {
        console.log(`
                Incorrect command format. Here are some samples:
                node liri.js spotify-this-song 'Take This Waltz'
                node liri.js concert-this 'Dave Matthews Band'
                node liri.js movie-this 'You Have Mail'
                node liri.js do-what-it-says `);
    };
}

run(startParameters);
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