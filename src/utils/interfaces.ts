export interface Category {
  id: string;
  name: string;
}

export interface EpisodeItem {
  name: string;
  slug: string;
}

export interface Server {
  server_name: string;
  items: EpisodeItem[];
}

export interface Movie {
  name: string;
  slug: string;
  original_name: string;
  thumb_url: string;
  poster_url: string;
  created: string;
  modified: string;
  description: string;
  total_episodes: number;
  current_episode: string;
  time: string;
  quality: string;
  language: string;
  director: string;
  casts: string;
  category?: Category;
  episodes?: Server[];
}
