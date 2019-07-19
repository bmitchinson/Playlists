export interface IPlaylistFBMeta {
  folder: string | undefined; // if folder is null, it's excluded from FB
  followers: number;
  // TODO: image url? string[]? how do sizes work what do I get.
  // TODO: artists: string[]
  id: string;
  isOwner: boolean;
  name: string;
}
