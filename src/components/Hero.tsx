import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { FC } from "react";

interface HeroProps {
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
}

const Hero: FC<HeroProps> = ({ items = [] }) => {
  return (
    <div className='max-h-screen !h-[52vw]'>
      <div className='relative overflow-hidden max-h-screen !h-[52vw] cursor-pointer mb-[-15.5%]'>
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
          {items?.map((movie, index) => (
            <SwiperSlide key={index}>
              <img src={movie.poster_url} alt='Movie Thumbnail' className='w-full h-full object-cover' />

              <div className='absolute top-0 left-0 right-0 h-[60px] bg-gradient-to-b from-[#303030bb] to-transparent z-[10]' />
              <div className='absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-[#303030bb] to-transparent z-[10]' />
              <div className='absolute top-0 bottom-0 left-0 h-full w-[70px] bg-gradient-to-r from-[#303030bb] to-transparent z-[10]' />
              <div className='absolute top-0 bottom-0 right-0 h-full w-[70px] bg-gradient-to-l from-[#303030bb] to-transparent z-[10]' />

              <div className='absolute left-[64px] bottom-[calc(10%+24px+3.5vw)] flex flex-col items-start w-[50%] z-[20]'>
                <h5 className='font-medium text-[35px] w-full text-left text-white'>{movie.name}</h5>
                <div className='text-white'>
                  <span>{movie.time}</span>
                  <span className='px-2'>|</span>
                  <span>{movie.current_episode}</span>
                </div>
                <div className='flex gap-[8px] mt-[12px] flex-wrap w-full'>
                  {movie.casts.split(",").map((name, id) => (
                    <span
                      key={id}
                      className='px-[6px] rounded-[2px] color-[#ececec] bg-[#ffffff5b] text-[14px] font-medium text-white w-max h-full shadow-[rgba(0,0,0,0.5)_0px_1px_2px]'
                    >
                      {name}
                    </span>
                  ))}
                </div>
                <p className='text-left mt-[12px] text-white line-clamp-3'>{movie.description}</p>
              </div>

              <div className='absolute bottom-[10%] left-[64px] flex justify-between gap-[20px] z-[20]'>
                <button className='w-[36px] h-[36px] rounded-full bg-[#1cc749] hover:bg-[#3bf56d] flex items-center justify-center'>
                  <FaPlay className='text-white' size={15} />
                </button>
                <button className='w-[36px] h-[36px] rounded-full bg-[#e4e0d9] hover:bg-[#ffffff] flex items-center justify-center'>
                  <MdOutlineBookmarkAdd className='text-[#111319]' size={21} />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
