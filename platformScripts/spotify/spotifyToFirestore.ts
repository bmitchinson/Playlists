import { IPlaylistFBMeta } from './spotifyTypes';

import {
  fetchAllPlaylistIDs,
  fetchFBMeta,
  setNewAccessToken,
} from './spotifyServices';

import {
  addToFollowPlaylists,
  addToMyPlaylists,
  deleteAllDocumentsInCollection
} from './firebaseServices';

// Get all spotify info to populate firebase
(async () => {
  await setNewAccessToken();
  const allPlaylistIDs: string[] = await fetchAllPlaylistIDs();
  console.log(`getting FBMeta data for all ${allPlaylistIDs.length} public playlists...`);
  const allPublicPlaylistsFBMeta: IPlaylistFBMeta[] = await fetchFBMeta(allPlaylistIDs.slice(0, 10));
  const myPlaylistsToPublish: IPlaylistFBMeta[] = allPublicPlaylistsFBMeta.filter((playlist) => playlist.folder);
  const followedPlaylistsToPublish: IPlaylistFBMeta[] = allPublicPlaylistsFBMeta.filter((playlist) => !playlist.isOwner);
  console.log(`you have ${myPlaylistsToPublish.length} tagged playlists and ${followedPlaylistsToPublish.length} public follows`);

  //console.log(`\nClearing existing collections`);
  //await deleteAllDocumentsInCollection('myPlaylists');
  for (const playlist of myPlaylistsToPublish.splice(0, 2)) {
    await addToMyPlaylists(playlist);
  }
  //await deleteAllDocumentsInCollection('followPlaylists');
  for (const playlist of followedPlaylistsToPublish.splice(0, 1)) {
    await addToFollowPlaylists(playlist);
  }

  console.log('***finished***');
})();

// Call delete everything from Firebase

// Create firestore playlist sub-directories from playlist descriptions and populate

// Populate bucket with resized images for each playlist by name

// Make sure Firestore reflects that list / add spotify URLs to the respective doc