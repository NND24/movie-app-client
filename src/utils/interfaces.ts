export interface Tmdb {
  type: string;
  id: string;
  season: string | null;
  vote_average: number;
  vote_count: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Country {
  id: string;
  name: string;
  slug: string;
}

export interface Created {
  time: string;
}

export interface Modified {
  time: string;
}

export interface Imdb {
  id: string;
}

export interface ServerData {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

export interface Episode {
  server_name: string;
  server_data: ServerData[];
}

export interface Movie {
  tmdb: Tmdb;
  actor: string[];
  category: Category[];
  country: Country[];
  chieurap: boolean;
  content: string;
  created: Created;
  director: string[];
  episode_current: string;
  episode_total: string;
  imdb: Imdb;
  is_copyright: boolean;
  lang: string;
  modified: Modified;
  name: string;
  notify: string;
  origin_name: string;
  poster_url: string;
  quality: string;
  showtimes: string;
  slug: string;
  status: string;
  sub_docquyen: boolean;
  thumb_url: string;
  time: string;
  trailer_url: string;
  type: string;
  view: number;
  year: number;
  _id: string;
  episodes: Episode[];
}

export interface DetailMovieResponse {
  movie: Movie;
  episodes: Episode[];
}

export interface Avatar {
  public_id: string;
  url: string;
}

export interface User {
  _id: string;
  avatar: Avatar;
  email: string;
  name: string;
  role: string;
}

export interface CommentReply {
  _id: string;
  user: User;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentInt {
  _id: string;
  user: User;
  comment: string;
  commentReplies: CommentReply[];
  createdAt: string;
  updatedAt: string;
}

export interface HistoryMovie {
  movie_slug: string;
  lasted_ep: string;
}
