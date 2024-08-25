import { FC, useEffect, useState } from "react";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { removeHTMLTags } from "../../utils/functions";
import { useGetDetailMovieQuery } from "../../features/movie/movieApi";
import { Movie } from "../../utils/interfaces";
import { Link } from "react-router-dom";
import { FaEye, FaStar, FaPlay, FaChevronRight } from "react-icons/fa6";
import { useAddFollowedMovieMutation } from "../../features/user/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type Props = {
  slug: string;
};

const MovieCard: FC<Props> = ({ slug }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isHovered, setIsHovered] = useState(false);

  const { data } = useGetDetailMovieQuery(slug);
  const [addFollowedMovie, { isSuccess, error }] = useAddFollowedMovieMutation();

  const movie = data?.movie as Movie;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const addToFollowed = async () => {
    if (user) {
      await addFollowedMovie({ slug });
    } else {
      toast.error("Vui lòng đăng nhập để lưu phim!");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Lưu phim thành công!");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as FetchBaseQueryError;
        if (errorData.data && typeof errorData.data === "object" && "message" in errorData.data) {
          const message = (errorData.data as { message: string }).message;
          if (message === "Movie already followed") {
            toast.success("Phim đã được lưu!");
          }
        }
      }
    }
  }, [isSuccess, error]);

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
            <Link to={`/phim/${slug}`}>
              <img
                src={movie?.poster_url}
                alt={movie?.name}
                className='object-cover w-full h-[120px] transition-opacity duration-300 bg-[#303030bb] font-bold text-white'
              />
            </Link>
            <div className='absolute top-[90px] right-[5px] flex justify-start gap-[10px]'>
              <Link
                to={`/phim/${slug}`}
                className='w-[26px] h-[26px] rounded-full bg-[#1cc749] hover:bg-[#3bf56d] flex items-center justify-center transition-colors duration-300'
              >
                <FaPlay className='text-white' size={11} />
              </Link>
              <button
                className='w-[26px] h-[26px] rounded-full bg-[#e4e0d9] hover:bg-[#ffffff] flex items-center justify-center transition-colors duration-300'
                onClick={() => addToFollowed()}
              >
                <MdOutlineBookmarkAdd className='text-[#111319]' size={16} />
              </button>
            </div>
          </div>
          <Link to={`/phim/${slug}`} className='p-2 block'>
            <h5 className='text-[14px] font-bold w-full text-left text-white line-clamp-2 h-[41px] transition-all duration-300  drop-shadow-[1px_1px_1px_#000]'>
              {movie?.name}
            </h5>
            <div className='text-[13px] text-[#e0e0e0] text-left drop-shadow-[1px_1px_1px_#000] my-1 flex items-center'>
              <div className='mr-[4px] font-medium inline-flex items-center gap-1'>
                <FaStar className='text-[#1cc749]' />
                <span>{movie?.tmdb?.vote_average}</span>
              </div>
              <span className='mr-[4px]'>•</span>
              <Link to={`/danh-sach/phim-moi?page=1&year=${movie?.year}`} className='mr-[4px] font-medium'>
                {movie?.year}
              </Link>
              <span className='mr-[4px]'>•</span>
              <div className='mr-[4px] font-medium inline-flex items-center gap-1'>
                <FaEye />
                <span>{movie?.view}</span>
              </div>
            </div>
            {movie?.content.length > 0 && (
              <p className='line-clamp-4 text-justify mt-[12px] text-white text-[12px] h-[71px] transition-all duration-300'>
                {removeHTMLTags(movie?.content)}
              </p>
            )}
            <p className='text-[#00dc5a] flex text-[12px] items-center justify-end pt-2'>
              Chi tiết <FaChevronRight />
            </p>
          </Link>
        </div>
      ) : (
        <Link to={`/phim/${slug}`}>
          <div className='relative transition-all duration-300'>
            <img
              src={movie?.thumb_url}
              alt={movie?.name}
              className='object-cover w-full max-h-[200px] mobile-m:max-h-[230px] mobile-xl:max-h-[250px] sm:max-h-[280px] h-[200px] mobile-m:h-[230px] mobile-xl:h-[250px] sm:h-[280px] transition-opacity duration-300 rounded-[4px] font-bold text-white'
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
            {movie?.name}
          </p>
        </Link>
      )}
    </div>
  );
};

export default MovieCard;
