import Tidal = require('tidal-api-wrapper');
// Using bmitchinson fork https://github.com/bmitchinson/tidal-api/tree/delete-playlist
import { TidalPass, TidalUser } from '../serviceKeys';

const tidal = new Tidal();

const whitelistPlaylistNames: string[] = []; // ['soft indie'];

const deleteAll = async () => {
  await tidal.login(TidalUser, TidalPass);
  try {
    const playlists = await tidal.getPlaylists();

    const toDelete = playlists.filter((playlist) => {
      return !whitelistPlaylistNames.includes(playlist.title);
    });

    toDelete.forEach(async (playlist) => {
      console.log('Removing ' + playlist.title + ' from Tidal:');
      await tidal.deletePlaylist(playlist.uuid);
    });

  } catch (e) {
    console.log('Error with Tidal');
  }
};
