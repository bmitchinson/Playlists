// Fetch all public playlist names from Spotify

// import { SpotifyWebApi } from 'spotify-web-api-node';
import { SpotifyClientID, SpotifyClientSecret} from '../serviceKeys';

var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId: SpotifyClientID,
  clientSecret: SpotifyClientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant().then(
  (data: any) => {
    console.log('token:', data.body.access_token);
    spotifyApi.setAccessToken(data.body.access_token);
    spotifyApi.getPlaylist('6aFBA1ODFaFFkRsPTlt3mo').then(
      (data: any) => {
        console.log(data.body.description);
      },
      (err: any) => {
        console.log('Something went wrong when getting that playlist');
        console.log(err);
      }
    );
    // spotifyApi.getUserPlaylists('115bwm', {limit: 1, offset: 0, fields: 'description'}).then(
    //   (data: any) => {
    //     console.log("********************************");
    //     console.log("here's all of your playlists:")
    //     console.log("********************************");
    //     let count: number = 70;
    //     console.log(data.body.items);
    //     for (let playlist of data.body.items){
    //       console.log(`${++count}.) "${playlist.name}" has ${playlist.tracks.total} tracks`);
    //     }
    //   },
    //   (err: any) => {
    //     console.log('Something went wrong when getting all playlists');
    //   }
    // );
  },
  (err: any) => {
    console.log('Something went wrong when retrieving an access token', err);
  }
);

// Call delete everything from Firebase + Images Bucket

// Get all playlist IDs

// For each playlist ID get description, link, image links? links to bucket?

// Create firestore playlist sub-directories from playlist descriptions and populate

// Populate bucket with resized images for each playlist by name

// Make sure Firestore reflects that list / add spotify URLs to the respective doc