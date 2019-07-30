import { IPlaylistFBMeta } from './spotifyTypes';
import { fetchAllPlaylistIDs, fetchFBMeta, setNewAccessToken } from './spotifyServices';
import { addToFollowPlaylists, addToMyPlaylists, deleteAllDocumentsInCollection } from './firebaseServices';

// Get all spotify info to populate firebase
(async () => {
    await setNewAccessToken();
    const allPlaylistIDs: string[] = await fetchAllPlaylistIDs();
    console.log(`getting FBMeta data for all ${allPlaylistIDs.length} public playlists...`);
    const allPublicPlaylistsFBMeta: IPlaylistFBMeta[] = await fetchFBMeta(allPlaylistIDs);
    const myPlaylistsToPublish: IPlaylistFBMeta[] = allPublicPlaylistsFBMeta.filter(playlist => playlist.folder);
    const followedPlaylistsToPublish: IPlaylistFBMeta[] = allPublicPlaylistsFBMeta.filter(playlist => !playlist.isOwner);
    console.log(`you have ${myPlaylistsToPublish.length} tagged playlists and ${followedPlaylistsToPublish.length} public follows`);

    console.log(`clearing existing collections...`);
    await deleteAllDocumentsInCollection('myPlaylists');
    await deleteAllDocumentsInCollection('followPlaylists');

    console.log('pushing to myPlaylists...');
    myPlaylistsToPublish.forEach(async playlist => await addToMyPlaylists(playlist));
    console.log('pushing to followedPlaylists..');
    followedPlaylistsToPublish.forEach(async playlist => await addToMyPlaylists(playlist));

    console.log('***finished***');
})();
