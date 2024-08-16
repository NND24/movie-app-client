import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";
import MovieCard from "./MovieCard";
import { Movie } from "../../utils/interfaces";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  slug: string;
  items?: Movie[];
};

const MovieSlider: FC<Props> = ({ title, slug, items = [] }) => {
  return (
    <div className='w-full relative'>
      <div className='w-[90%] m-auto py-3'>
        <Link to={`/danh-sach/${slug}?page=1`} className='text-[22px] font-bold text-white leading-[45px]'>
          {title}
        </Link>
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
              <MovieCard slug={movie.slug} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieSlider;
