export interface IPlaylistFBMeta {
  // if (isOwner && !folder): playlist is excluded from firebase
  artists: string[];
  folder: string | null;
  followers: number;
  image: string;
  id: string;
  isOwner: boolean;
  isSpotify: boolean;
  name: string;
}
