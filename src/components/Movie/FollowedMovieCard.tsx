import { FC } from "react";
import { useGetDetailMovieQuery } from "../../features/movie/movieApi";
import { Movie } from "../../utils/interfaces";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

type Props = {
  slug: string;
};

const FollowedMovieCard: FC<Props> = ({ slug }) => {
  const { data } = useGetDetailMovieQuery(slug);

  const movie = data?.movie as Movie;

  return (
    <div className={`relative bg-[#0A0C0F] cursor-pointer p-[6px] rounded-[4px]`}>
      <Link to={`/phim/${slug}`}>
        <div className='relative transition-all duration-300'>
          <img
            src={movie?.thumb_url}
            alt={movie?.name}
            className='object-cover w-full max-h-[280px] h-[280px] transition-opacity duration-300 rounded-[4px] font-bold text-white'
          />
          <div
            className='absolute bottom-0 left-0 right-0 z-2 h-[60px]'
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

      <div className='absolute top-[6px] right-[6px] w-[22px] h-[22px] bg-[#0A0C0F] flex items-center justify-center z-10 hover:bg-[#1cc749]'>
        <IoClose className='text-[20px] font-bold text-white' />
      </div>

      <div className='absolute bottom-[45px] right-[10px] px-2 z-10 bg-[#1cc749] text-white font-semibold rounded-sm'>
        {movie?.tmdb.vote_average}
      </div>

      <div className='absolute top-[10px] left-[10px] z-10 flex gap-1'>
        <span className=' px-2 bg-[#1cc749] text-white font-semibold rounded-sm'>{movie?.lang}</span>
        <span className=' px-2 bg-[#1cc749] text-white font-semibold rounded-sm'>{movie?.quality}</span>
      </div>
    </div>
  );
};

export default FollowedMovieCard;
