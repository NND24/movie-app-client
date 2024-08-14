import { FC } from "react";
import { Movie } from "../../utils/interfaces";
import DetailHero from "./DetailHero";

interface Props {
  movie: Movie;
}

const HeroDetailMovie: FC<Props> = ({ movie }) => {
  return (
    <div className='max-h-screen !h-[52vw]'>
      <div className='relative overflow-hidden max-h-screen !h-[52vw] mb-[-15.5%]'>
        <DetailHero slug={movie.slug} />
      </div>
    </div>
  );
};

export default HeroDetailMovie;
