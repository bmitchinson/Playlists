import { Firestore } from '@google-cloud/firestore';

import { PlaylistFBMeta } from './spotifyTypes';

const firestore = new Firestore({
    keyFilename: 'platformScripts/playlistAdmin.json',
    projectId: 'playlists-245820'
});

export const addToFirebase = async (collectionName: string, playlist: PlaylistFBMeta) => {
    const docTitle = `${playlist.name.replace(/[^a-zA-Z0-9 -]/g, '')} ${playlist.id.slice(-5)}`;
    try {
        await firestore
            .collection(collectionName)
            .doc(docTitle)
            .set(playlist);
    } catch (e) {
        console.log(`something went wrong when posting playlist "${playlist.name}" to "${collectionName}"`);
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
