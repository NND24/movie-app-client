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
    _id: number;
    name: string;
    origin_name: string;
    poster_url: string;
    slug: string;
    thumb_url: string;
    year: number;
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
          {items?.map((movie) => (
            <SwiperSlide key={movie._id}>
              <img src={movie.thumb_url} alt='Movie Thumbnail' className='w-full h-full object-cover' />

              <div className='absolute left-[64px] bottom-[calc(10%+24px+3.5vw)] flex flex-col items-start w-[50%]'>
                <h5 className='font-medium text-[35px] w-full text-left text-white'>{movie.name}</h5>
                <div className='text-white'>
                  <span>{movie.year}</span>
                  <span className='px-2'>|</span>
                  {/* <span>{movie.episode_current}</span> */}
                </div>
                <div className='flex gap-[8px] mt-[12px] flex-wrap w-full'>
                  {/* {movie.category.map((cat) => (
                    <span
                      key={cat.id}
                      className='px-[6px] rounded-[2px] color-[#ececec] bg-[#ffffff5b] text-[14px] font-medium text-white w-max h-full shadow-[rgba(0,0,0,0.5)_0px_1px_2px]'
                    >
                      {cat.name}
                    </span>
                  ))} */}
                </div>
                <p className='line-clamp-2 text-left mt-[12px] text-white'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam tempora cum autem beatae pariatur
                  accusamus eius suscipit corporis placeat molestias error veritatis est, odio amet consequatur et nisi
                  provident rerum!
                </p>
              </div>

              <div className='absolute bottom-[10%] left-[64px] flex justify-between gap-[20px]'>
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
