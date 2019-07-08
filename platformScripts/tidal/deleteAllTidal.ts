import Tidal = require('tidal-api-wrapper');
import { TidalPass, TidalUser } from '../serviceKeys';

const tidal = new Tidal();

const whitelistNames: string[] = []; // ['soft indie'];

(async () => {
  const result = await tidal.login(TidalUser, TidalPass);
  const playlists = await tidal.getPlaylists();
  const toDelete = playlists.filter((playlist) => {
    return !whitelistNames.includes(playlist.title);
  });
  toDelete.forEach(async (playlist) => {
    console.log('Removing ' + playlist.title + ' from Tidal:');
    await tidal.deletePlaylist(playlist.uuid);
  });
})();
