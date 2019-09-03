import { Firestore } from '@google-cloud/firestore';

import { PlaylistFBMeta } from './spotifyTypes';

const firestore = new Firestore({
    keyFilename: 'platformScripts/playlistAdmin.json',
    projectId: 'playlists-245820'
});

export const addToMyPlaylists = async (playlist: PlaylistFBMeta) => {
    try {
        await firestore
            .collection('myPlaylists')
            .doc(`${playlist.name.replace(/[^a-zA-Z0-9 -]/g, '')}`)
            .set(playlist);
    } catch (e) {
        console.log(`something went wrong when posting playlist "${playlist.name}" to myPlaylists`);
    }
};

export const addToFollowPlaylists = async (playlist: PlaylistFBMeta) => {
    try {
        await firestore
            .collection('followPlaylists')
            .doc(`${playlist.name.replace(/[^a-zA-Z0-9 -]/g, '')}`)
            .set(playlist);
    } catch (e) {
        console.log(`something went wrong when posting playlist "${playlist.name}" to followPlaylists`);
    }
};

export const deleteAllDocumentsInCollection = async (collectionName: string) => {
    try {
        const documentList = await firestore.collection(`${collectionName}`).listDocuments();
        documentList.forEach(async doc => {
            await doc.delete();
        });
    } catch (e) {
        console.log(`something went wrong when deleting documents in collection "${collectionName}"`);
    }
};
