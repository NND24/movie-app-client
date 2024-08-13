import { Movie } from "./interfaces";

export const getEpisodeStatus = (movie: Movie) => {
  const episodeMatch = movie.current_episode.match(/\d+/);
  const episodeNumber = episodeMatch ? parseInt(episodeMatch[0], 10) : 0;

  if (episodeNumber < movie.total_episodes) {
    return "Đang chiếu";
  } else {
    return movie.current_episode;
  }
};

export const removePTags = (str: string) => {
  if (str.includes("<p>")) {
    return str.replace(/<\/?p>/g, "");
  }
  return str;
};
