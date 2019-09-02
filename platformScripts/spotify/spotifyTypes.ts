export interface PlaylistFBMeta {
    // if (isOwner && !folder): playlist is excluded from firebase
    artists: string[];
    folder: string | null;
    followers: number;
    image: string;
    id: string;
    isOwner: boolean;
    isSpotify: boolean;
    links: Links | null;
    name: string;
}

export interface Links {
    spotify: string;
    apple: string | null;
    amazon: string | null;
    soundcloud: string | null;
    tidal: string | null;
    youtube: string | null;
}
