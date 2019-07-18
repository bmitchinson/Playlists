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
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.getUserPlaylists('115bwm').then(
      (data: any) => {
        console.log("********************************");
        console.log("here's all of your playlists:")
        console.log("********************************");
        for (let playlist of data.body.items){
          console.log(`${playlist.name} has ${playlist.tracks.total} tracks`);
        }
      },
      (err: any) => {
        console.log('Something went wrong when getting all playlists');
      }
    );
  },
  (err: any) => {
    console.log('Something went wrong when retrieving an access token', err);
  }
);

// Make sure Firestore reflects that list / add spotify URLs to the respective doc