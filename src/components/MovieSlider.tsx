import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";
import MovieCard from "./MovieCard";

type Props = {
  title: string;
  items?: {
    name: string;
    slug: string;
    origin_name: string;
    thumb_url: string;
    poster_url: string;
    description: string;
    total_episodes: number;
    current_episode: string;
    time: string;
    quality: string;
    language: string;
    director: string;
    casts: string;
  }[];
};

const MovieSlider: FC<Props> = ({ title, items = [] }) => {
  return (
    <div className='w-full relative'>
      <div className='w-[90%] m-auto pt-5'>
        <h4 className='text-[22px] font-bold text-white pb-3'>{title}</h4>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className='movie-slider'
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 25,
            },
          }}
        >
          {items?.map((movie, index) => (
            <SwiperSlide key={index}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieSlider;
