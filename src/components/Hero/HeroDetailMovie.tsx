import { FC } from "react";
import { Movie } from "../../utils/interfaces";
import DetailHero from "./DetailHero";

interface Props {
  movie: Movie;
}

const HeroDetailMovie: FC<Props> = ({ movie }) => {
  return (
    <div className='max-h-screen sm:!h-[60vw] mobile-xl:!h-[65vw] mobile-l:!h-[70vw] mobile-m:!h-[75vw] mobile-s:!h-[90vw]'>
      <div className='relative overflow-hidden max-h-screen sm:!h-[60vw] mobile-xl:!h-[65vw] mobile-l:!h-[70vw] mobile-m:!h-[75vw] mobile-s:!h-[90vw] mb-[-15.5%]'>
        <DetailHero slug={movie.slug} />
      </div>
    </div>
  );
};

export default HeroDetailMovie;
