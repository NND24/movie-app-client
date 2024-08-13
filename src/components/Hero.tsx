import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { FC } from "react";
import { getEpisodeStatus, Movie, removePTags } from "../utils/functions";

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
          {items?.map((movie, index) => (
            <SwiperSlide key={index}>
              <img src={movie.poster_url} alt='Movie Thumbnail' className='w-full h-full object-cover' />

              <div className='absolute top-0 left-0 right-0 h-[60px] bg-gradient-to-b from-[#303030bb] to-transparent z-[10]' />
              <div className='absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-[#303030bb] to-transparent z-[10]' />
              <div className='absolute top-0 bottom-0 left-0 h-full w-[70px] bg-gradient-to-r from-[#303030bb] to-transparent z-[10]' />
              <div className='absolute top-0 bottom-0 right-0 h-full w-[70px] bg-gradient-to-l from-[#303030bb] to-transparent z-[10]' />

              <div className='absolute left-[64px] bottom-[calc(10%+24px+3.5vw)] flex flex-col items-start w-[50%] z-[20]'>
                <h1 className='font-bold text-[30px] text-[#e0e0e0] text-left drop-shadow-[1px_1px_1px_#000]'>
                  {movie.name}
                </h1>
                <p className='font-bold text-[#e0e0e0] mb-1 drop-shadow-[1px_1px_1px_#000]'>{movie.original_name}</p>
                <div className='text-[14px] text-[#e0e0e0] text-left drop-shadow-[1px_1px_1px_#000] my-1'>
                  <span className='mr-[6px] font-medium'>{movie.created.split("-")[0]}</span>
                  <span className='mr-[6px]'>•</span>
                  <span className='mr-[6px] font-medium border-[#e0e0e0] border-[1px] border-solid rounded-[30px] px-[8px]'>
                    {getEpisodeStatus(movie)}
                  </span>
                  <span className='mr-[6px]'>•</span>
                  <span className='mr-[6px] font-medium'>{movie.time}</span>
                  <span className='mr-[6px]'>•</span>
                  <span className='mr-[6px] font-medium'>{movie.language}</span>
                </div>
                <div className='mt-[4px]'>
                  {movie.director && movie.director.length > 0 && (
                    <p className='text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] text-left line-clamp-1'>
                      Đạo diễn: {movie.director}
                    </p>
                  )}
                  {movie.casts && movie.casts.length > 0 && (
                    <p className='text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] text-left line-clamp-1'>
                      Diễn viên: {movie.casts}
                    </p>
                  )}
                </div>
                <p className='text-justify mt-[4px] text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] line-clamp-3 leading-[22px]'>
                  {removePTags(movie.description)}
                </p>
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
