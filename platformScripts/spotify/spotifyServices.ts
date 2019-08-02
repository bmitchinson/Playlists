require('dotenv').config();

import { IPlaylistFBMeta } from './spotifyTypes';

import SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi: SpotifyWebApi = new SpotifyWebApi({
    clientId: process.env.spotifyClientID,
    clientSecret: process.env.spotifyClientSecret
});

export const setNewAccessToken = async (showToken = false) => {
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

export const fetchAllPlaylistIDs = async (): Promise<string[]> => {
    const playlistIDs: string[] = [];

    for (let i = 0; i < 3; i++) {
        // Capped at 90 playlists, up to 4 if you need 120
        await spotifyApi.getUserPlaylists('115bwm', { limit: 30, offset: i * 30 }).then(
            (data: any) => {
                data.body.items.forEach(playlist => {
                    playlistIDs.push(playlist.id);
                });
            },
            (err: any) => {
                throw new Error(`something went wrong getting playlists in range ${i * 30} to ${i * 30 + 30} \nErr:${err}`);
            }
        );
    }

    return playlistIDs;
};

const getFolder = (disc: string): string | undefined => {
    if (disc.indexOf('dir:') > -1) {
        return disc.split(':')[1];
    }
    return null;
};

const getFiveArtists = (tracks: any): string[] => {
    const fiveArtists = [];

    tracks.items.array.forEach(trackObj => {
        if (fiveArtists.length < 5) {
            const artist = trackObj.track.artists[0].name;
            if (!fiveArtists.includes(artist)) {
                fiveArtists.push(artist);
            }
        }
    });

    return fiveArtists;
};

export const fetchFBMeta = async (allPlaylistIDs: string[]): Promise<IPlaylistFBMeta[]> => {
    const allPlaylistsFBMeta: IPlaylistFBMeta[] = [];
    let count = 0;

    allPlaylistIDs.forEach(async playlistID => {
        if (count % 20 === 0 && count !== 0) {
            console.log(`fetched ${count} playlists`);
        }
        await spotifyApi.getPlaylist(playlistID).then(
            (data: any) => {
                allPlaylistsFBMeta.push({
                    artists: getFiveArtists(data.body.tracks),
                    folder: getFolder(data.body.description),
                    followers: data.body.followers.total,
                    id: data.body.id,
                    image: data.body.images[0].url,
                    isOwner: data.body.owner.id === '115bwm',
                    isSpotify: data.body.owner.id === 'spotify',
                    name: data.body.name
                });
                count++;
            },
            (err: any) => {
                throw new Error(`something went wrong when getting playlist ${playlistID} \nErr:${err}`);
            }
        );
    });

    return allPlaylistsFBMeta;
};
