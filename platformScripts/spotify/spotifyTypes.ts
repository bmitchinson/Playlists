export interface IPlaylistFBMeta {
  artists: string[];
  folder: string | undefined; // if folder is null, it's completely excluded from FB
  followers: number;
  image: string;
  id: string;
  isOwner: boolean;
  name: string;
}
