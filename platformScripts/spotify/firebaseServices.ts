import { Firestore } from '@google-cloud/firestore';

import { IPlaylistFBMeta } from './spotifyTypes';

const firestore = new Firestore({
  keyFilename: './playlistAdmin.json',
  projectId: 'playlists-245820'
});

export const addToMyPlaylists = async (playlist: IPlaylistFBMeta) => {
  try {
    await firestore.collection('myPlaylists').doc(`${playlist.name}`).set(playlist);
  } catch (e) {
    console.log(`something went wrong when posting playlist "${playlist.name}" to myPlaylists`);
  }
};

export const addToFollowPlaylists = async (playlist: IPlaylistFBMeta) => {
  try {
    await firestore.collection('followPlaylists').doc(`${playlist.name}`).set(playlist);
  } catch (e) {
    console.log(`something went wrong when posting playlist "${playlist.name}" to followPlaylists`);
  }
};

export const deleteAllDocumentsInCollection = async (collectionName: string) => {
  try {
    const documentList = await firestore.collection(`${collectionName}`).listDocuments();
    for (const doc of documentList) {
      doc.delete();
    }
  } catch (e) {
    console.log(`something went wrong when deleting documents in collection "${collectionName}"`);
  }
};