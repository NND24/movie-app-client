import { FC, useState } from "react";
import { FaChevronRight, FaPlay } from "react-icons/fa";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { getEpisodeStatus, removePTags } from "../utils/functions";
import { Movie } from "../utils/interfaces";

type Props = {
  movie: Movie;
};

const MovieCard: FC<Props> = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`bg-[#111319] cursor-pointer transition-transform duration-300 ${
        isHovered ? "transform scale-105" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered ? (
        <div className='bg-[#1b1e27] rounded-[4px] overflow-hidden'>
          <div className='rounded-[4px] overflow-hidden relative transition-all max-h-[120px] duration-300'>
            <img
              src={movie.poster_url}
              alt=''
              className='object-cover h-full w-full max-h-[120px] transition-opacity duration-300'
            />
            <div className='absolute top-[90px] right-[5px] flex justify-start gap-[10px]'>
              <button className='w-[26px] h-[26px] rounded-full bg-[#1cc749] hover:bg-[#3bf56d] flex items-center justify-center transition-colors duration-300'>
                <FaPlay className='text-white' size={11} />
              </button>
              <button className='w-[26px] h-[26px] rounded-full bg-[#e4e0d9] hover:bg-[#ffffff] flex items-center justify-center transition-colors duration-300'>
                <MdOutlineBookmarkAdd className='text-[#111319]' size={16} />
              </button>
            </div>
          </div>
          <div className='p-2'>
            <h5 className='text-[14px] font-bold w-full text-left text-white line-clamp-2 h-[41px] transition-all duration-300  drop-shadow-[1px_1px_1px_#000]'>
              {movie.name}
            </h5>
            <div className='text-[13px] text-[#e0e0e0] text-left drop-shadow-[1px_1px_1px_#000] my-1'>
              <span className='mr-[4px] font-medium'>{movie.created.split("-")[0]}</span>
              <span className='mr-[4px]'>•</span>
              <span className='mr-[4px] font-medium border-[#e0e0e0] border-[1px] border-solid rounded-[30px] px-[8px]'>
                {getEpisodeStatus(movie)}
              </span>
            </div>
            <p className='line-clamp-4 text-justify mt-[12px] text-white text-[12px] h-[71px] transition-all duration-300'>
              {removePTags(movie.description)}
            </p>
            <p className='text-[#00dc5a] flex text-[12px] items-center justify-end pt-2'>
              more info <FaChevronRight />
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className='relative transition-all duration-300'>
            <img
              src={movie.thumb_url}
              alt=''
              className='object-cover h-full w-full max-h-[280px] transition-opacity duration-300'
            />
            <div
              className='absolute bottom-0 left-0 right-0 z-[300] h-[60px]'
              style={{
                backgroundImage:
                  "linear-gradient(0deg, rgba(10, 12, 15, 0.8) 0%, rgba(10, 12, 15, 0.74) 4%, rgba(10, 12, 15, 0.59) 17%, rgba(10, 12, 15, 0.4) 34%, rgba(10, 12, 15, 0.21) 55%, rgba(10, 12, 15, 0.06) 78%, rgba(10, 12, 15, 0) 100%)",
              }}
            ></div>
          </div>
          <p className='text-white text-[16px] text-left line-clamp-1 pt-2 hover:text-[#00dc5a] transition-all duration-300'>
            {movie.name}
          </p>
        </>
      )}
    </div>
  );
};

export default MovieCard;
