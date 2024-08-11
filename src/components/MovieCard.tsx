import { useState } from "react";
import { FaChevronRight, FaPlay } from "react-icons/fa";
import { MdOutlineBookmarkAdd } from "react-icons/md";

type Props = {};

const MovieCard = (props: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className='bg-[#111319] cursor-pointer' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isHovered ? (
        <div className='bg-[#1b1e27] rounded-[4px] overflow-hidden'>
          <div className='rounded-[4px] overflow-hidden relative'>
            <img
              src='https://phimimg.com/upload/vod/20240808-1/d080182abb8da532869983d928372d58.jpg'
              alt=''
              className='object-cover h-full w-full'
            />
            <div className='absolute top-[95px] right-[5px] flex justify-start gap-[10px]'>
              <button className='w-[26px] h-[26px] rounded-full bg-[#1cc749] hover:bg-[#3bf56d] flex items-center justify-center'>
                <FaPlay className='text-white' size={11} />
              </button>
              <button className='w-[26px] h-[26px] rounded-full bg-[#e4e0d9] hover:bg-[#ffffff] flex items-center justify-center'>
                <MdOutlineBookmarkAdd className='text-[#111319]' size={16} />
              </button>
            </div>
          </div>
          <div className='p-2'>
            <h5 className='text-[14px] w-full text-left text-white line-clamp-2 h-[42px]'>Tom & Jerry In New York</h5>
            <div className='text-white text-[14px] text-left'>
              <span>2024</span>
              <span className='px-2'>|</span>
              <span>18</span>
            </div>
            <div className='h-[55px] overflow-hidden'>
              <div className='flex gap-[8px] mt-[12px] flex-wrap w-full'>
                <span className='px-[4px] rounded-[2px] color-[#ececec] bg-[#ffffff3a] text-[12px] font-medium text-white w-max h-full shadow-[rgba(0,0,0,0.5)_0px_1px_2px]'>
                  Hành động
                </span>
                <span className='px-[4px] rounded-[2px] color-[#ececec] bg-[#ffffff3a] text-[12px] font-medium text-white w-max h-full shadow-[rgba(0,0,0,0.5)_0px_1px_2px]'>
                  Phiêu lưu
                </span>
                <span className='px-[4px] rounded-[2px] color-[#ececec] bg-[#ffffff3a] text-[12px] font-medium text-white w-max h-full shadow-[rgba(0,0,0,0.5)_0px_1px_2px]'>
                  Hài hước
                </span>
                <span className='px-[4px] rounded-[2px] color-[#ececec] bg-[#ffffff3a] text-[12px] font-medium text-white w-max h-full shadow-[rgba(0,0,0,0.5)_0px_1px_2px]'>
                  asdasd
                </span>
                <span className='px-[4px] rounded-[2px] color-[#ececec] bg-[#ffffff3a] text-[12px] font-medium text-white w-max h-full shadow-[rgba(0,0,0,0.5)_0px_1px_2px]'>
                  asdasd
                </span>
                <span className='px-[4px] rounded-[2px] color-[#ececec] bg-[#ffffff3a] text-[12px] font-medium text-white w-max h-full shadow-[rgba(0,0,0,0.5)_0px_1px_2px]'>
                  asdasd
                </span>
                <span className='px-[4px] rounded-[2px] color-[#ececec] bg-[#ffffff3a] text-[12px] font-medium text-white w-max h-full shadow-[rgba(0,0,0,0.5)_0px_1px_2px]'>
                  asdasd
                </span>
                <span className='px-[4px] rounded-[2px] color-[#ececec] bg-[#ffffff3a] text-[12px] font-medium text-white w-max h-full shadow-[rgba(0,0,0,0.5)_0px_1px_2px]'>
                  asdasd
                </span>
                <span className='px-[4px] rounded-[2px] color-[#ececec] bg-[#ffffff3a] text-[12px] font-medium text-white w-max h-full shadow-[rgba(0,0,0,0.5)_0px_1px_2px]'>
                  asdasd
                </span>
              </div>
            </div>
            <p className='line-clamp-4 text-left mt-[12px] text-white text-[12px] h-[72px]'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor
            </p>
            <p className='text-[#00dc5a] flex text-[12px] items-center justify-end pt-2'>
              more info <FaChevronRight />
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className='rounded-[4px] overflow-hidden relative'>
            <img
              src='https://phimimg.com/upload/vod/20240808-1/9df941c2dbd6d695d0f8d35b6296ecb9.jpg'
              alt=''
              className='object-cover h-full w-full'
            />
            <div
              className='absolute bottom-0 left-0 right-0 z-[300] h-[60px] '
              style={{
                backgroundImage:
                  "linear-gradient(0deg, rgba(10, 12, 15, 0.8) 0%, rgba(10, 12, 15, 0.74) 4%, rgba(10, 12, 15, 0.59) 17%, rgba(10, 12, 15, 0.4) 34%, rgba(10, 12, 15, 0.21) 55%, rgba(10, 12, 15, 0.06) 78%, rgba(10, 12, 15, 0) 100%)",
              }}
            ></div>
          </div>
          <p className='text-white text-[16px] text-left line-clamp-1 pt-2 hover:text-[#00dc5a]'>
            Phàm Nhân Tu Tiên (Phần 1)
          </p>
        </>
      )}
    </div>
  );
};

export default MovieCard;
