import Tidal = require('tidal-api-wrapper');
import { TidalPass, TidalUser } from '../PlatformKeys';

const tidal = new Tidal();

let playlistID: String = '075a2d08-d988-4bd3-b943-bdd870b50dfe';

let whitelistNames: String[] = ['soft indie', 'two'];

(async () => {
  const result = await tidal.login(TidalUser, TidalPass);
  const playlists = await tidal.getPlaylists();
  const toDelete = playlists.filter(playlist => {
    return !whitelistNames.includes(playlist.title);
  });
  // toDelete.forEach(async (playlist) => {
  //   await tidal.deletePlaylist(playlist.uuid);
  // });

  // console.log("playlist:", playlist);
  // await new Promise((r) => setTimeout(r, 1000));
  // console.log('Attempting Delete');
  // await tidal.deletePlaylist(playlistID);
  // console.log('Playlist Deleted');
})();
