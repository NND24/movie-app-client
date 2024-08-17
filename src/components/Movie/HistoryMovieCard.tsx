import { FC } from "react";
import { useGetDetailMovieQuery } from "../../features/movie/movieApi";
import { Movie } from "../../utils/interfaces";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

type Props = {
  slug: string;
  lasted_ep: string;
};

const HistoryMovieCard: FC<Props> = ({ slug, lasted_ep }) => {
  const { data } = useGetDetailMovieQuery(slug);

  const movie = data?.movie as Movie;

  return (
    <div className={`relative cursor-pointer p-[6px] rounded-[4px]`}>
      <Link to={`/phim/${slug}`} className='group'>
        <div className='relative'>
          <img
            src={movie?.poster_url}
            alt={movie?.name}
            className='object-cover w-full h-[120px] rounded-[4px] font-bold text-white z-0'
          />

          <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[4px] z-20 w-full h-full'>
            <div className='w-[35px] h-[35px] bg-[#00dc5a] rounded-full flex items-center justify-center'>
              <FaPlay className='text-white text-lg' />
            </div>
          </div>
        </div>
        <p className='text-white text-[16px] text-left line-clamp-1 pt-[6px] hover:text-[#00dc5a]'>{movie?.name}</p>
        <p className='text-[#ffffff9a] text-[14px]'>Bạn đang xem tập {lasted_ep}</p>
      </Link>
    </div>
  );
};

export default HistoryMovieCard;
