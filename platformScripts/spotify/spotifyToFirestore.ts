import SpotifyWebApi = require('spotify-web-api-node');

import { SpotifyClientID, SpotifyClientSecret} from '../serviceKeys';
import { IPlaylistFBMeta } from './spotifyTypes';

const spotifyApi: SpotifyWebApi = new SpotifyWebApi({
  clientId: SpotifyClientID,
  clientSecret: SpotifyClientSecret
});

const setNewAccessToken = async (showToken = false) => {
  await spotifyApi.clientCredentialsGrant().then(
    (data: any) => {
      if (showToken) {
        console.log('token:', data.body.access_token);
      }
      spotifyApi.setAccessToken(data.body.access_token);
      console.log('token set');
    },
    (err: any) => {
      throw new Error(`something went wrong when retrieving an access token \nErr:${err}`);
    }
  );
};

const getAllPlaylistIDs = async (): Promise<string[]> => {
  const playlistIDs: string[] = [];

  for (let i = 0; i < 3; i++) { // Capped at 90 playlists, up to 4 if you need 120
    await spotifyApi.getUserPlaylists('115bwm', {limit: 30, offset: i * 30}).then(
      (data: any) => {
        for (const playlist of data.body.items) {
          playlistIDs.push(playlist.id);
        }
      },
      (err: any) => {
        throw new Error(`something went wrong getting playlists in range ${i * 30} to ${i * 30 + 30} \nErr:${err}`);
      }
    );
  }

  return playlistIDs;
};

const getFolder = ((disc: string): string | undefined => {
  if (disc.indexOf('dir:') > -1) {
    return disc.split(':')[1];
  }
  return undefined;
});

const playlistIDsToFullMeta = (async (allPlaylistIDs: string[]): Promise<IPlaylistFBMeta[]> => {
  const allPlaylistsFBMeta: IPlaylistFBMeta[] = [];

  for (const playlistID of allPlaylistIDs) {
    await spotifyApi.getPlaylist(playlistID).then(
      (data: any) => {
        allPlaylistsFBMeta.push({
          folder: getFolder(data.body.description),
          followers: data.body.followers.total,
          id: data.body.id,
          isOwner: data.body.owner.id === '115bwm',
          name: data.body.name
        });
      },
      (err: any) => {
        throw new Error(`Something went wrong when getting playlist ${playlistID} \nErr:${err}`);
      }
    );
  }

  return allPlaylistsFBMeta;
});

// Get all spotify info to populate firebase
(async () => {
  await setNewAccessToken();
  const allPlaylistIDs: string[] = await getAllPlaylistIDs();
  console.log(`getting FBMeta data for all ${allPlaylistIDs.length} public playlists...`);
  const allPublicPlaylistsFBMeta: IPlaylistFBMeta[] = await playlistIDsToFullMeta(allPlaylistIDs);
  const myPlaylistsToPublish: IPlaylistFBMeta[] = allPublicPlaylistsFBMeta.filter((playlist) => playlist.folder);
  const followedPlaylistsToPublish: IPlaylistFBMeta[] = allPublicPlaylistsFBMeta.filter((playlist) => !playlist.isOwner);
  console.log(`you have ${myPlaylistsToPublish.length} tagged playlists and ${followedPlaylistsToPublish.length} public follows`);
})();

// TODO: Is still for each playlist ID get image links? links to bucket?

// Call delete everything from Firebase + Images Bucket

// Create firestore playlist sub-directories from playlist descriptions and populate

// Populate bucket with resized images for each playlist by name

// Make sure Firestore reflects that list / add spotify URLs to the respective doc