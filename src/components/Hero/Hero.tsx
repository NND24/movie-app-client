import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FC } from "react";
import DetailHero from "./DetailHero";
import { Movie } from "../../utils/interfaces";

interface HeroProps {
  items?: Movie[];
}

const Hero: FC<HeroProps> = ({ items = [] }) => {
  return (
    <div className='max-h-screen !h-[52vw]'>
      <div className='relative overflow-hidden max-h-screen !h-[52vw] mb-[-15.5%]'>
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className='mySwiper'
        >
          {items?.slice(0, 8).map((movie, index) => (
            <SwiperSlide key={index}>
              <DetailHero slug={movie.slug} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
