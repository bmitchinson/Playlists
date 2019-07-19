export interface IPlaylistFBMeta {
  folder: string | undefined; // if folder is null, it's excluded from FB
  followers: number;
  // TODO: image url?
  id: string;
  isOwner: boolean;
  name: string;
}
