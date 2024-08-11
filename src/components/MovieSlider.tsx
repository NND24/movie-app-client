import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";
import MovieCard from "./MovieCard";

type Props = {
  titlePage: string;
};

const MovieSlider: FC<Props> = ({ titlePage }) => {
  return (
    <div className='w-full relative'>
      <div className='w-[90%] m-auto pt-5'>
        <h4 className='text-[22px] font-bold text-white pb-3'>{titlePage}</h4>
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
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
          <SwiperSlide>
            <MovieCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default MovieSlider;
