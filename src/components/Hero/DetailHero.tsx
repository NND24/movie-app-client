import { FC } from "react";
import { useGetDetailMovieQuery } from "../../features/movie/movieApi";
import { removeHTMLTags } from "../../utils/functions";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { Movie } from "../../utils/interfaces";
import { Link } from "react-router-dom";
import { FaEye, FaStar, FaPlay } from "react-icons/fa6";

type Props = {
  slug: string;
};

const DetailHero: FC<Props> = ({ slug }) => {
  const { data } = useGetDetailMovieQuery(slug);

  const movie = data?.movie as Movie;

  return (
    <>
      <Link to={`/phim/${slug}`}>
        <img src={movie?.poster_url} alt={movie?.name} className='w-full h-full object-cover bg-[#303030bb]' />
      </Link>

      <div className='absolute top-0 left-0 right-0 h-[60px] bg-gradient-to-b from-[#303030bb] to-transparent z-[10]' />
      <div className='absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-[#303030bb] to-transparent z-[10]' />
      <div className='absolute top-0 bottom-0 left-0 h-full w-[70px] bg-gradient-to-r from-[#303030bb] to-transparent z-[10]' />
      <div className='absolute top-0 bottom-0 right-0 h-full w-[70px] bg-gradient-to-l from-[#303030bb] to-transparent z-[10]' />

      <div className='absolute left-[64px] bottom-[calc(10%+24px+3.5vw)] flex flex-col items-start w-[50%] z-[20]'>
        <h1 className='font-bold text-[30px] text-[#e0e0e0] text-left drop-shadow-[1px_1px_1px_#000]'>{movie?.name}</h1>
        <p className='font-bold text-[#e0e0e0] mb-1 drop-shadow-[1px_1px_1px_#000]'>{movie?.origin_name}</p>
        <div className='text-[14px] text-[#e0e0e0] text-left drop-shadow-[1px_1px_1px_#000] my-1 flex items-center'>
          <div className='mr-[6px] font-medium inline-flex items-center gap-1'>
            <FaStar className='text-[#1cc749]' />
            <span>{movie?.tmdb?.vote_average}</span>
          </div>
          <span className='mr-[6px]'>•</span>
          <Link to='' className='mr-[6px] font-medium'>
            {movie?.year}
          </Link>
          <span className='mr-[6px]'>•</span>
          <span className='mr-[6px] font-medium border-[#e0e0e0] border-[1px] border-solid rounded-[30px] px-[8px]'>
            {movie?.status === "completed" ? "Hoàn tất" : "Đang chiếu"}
          </span>
          <span className='mr-[6px]'>•</span>
          <span className='mr-[6px] font-medium'>{movie?.time}</span>
          <span className='mr-[6px]'>•</span>
          <div className='mr-[6px] font-medium inline-flex items-center gap-1'>
            <FaEye />
            <span>{movie?.view}</span>
          </div>

          {movie?.country && movie.country.length > 0 && (
            <>
              <span className='mr-[6px]'>•</span>
              {movie?.country.map((country) => (
                <Link
                  to={`/quoc-gia/${country.slug}?page=1`}
                  className='mr-[6px] font-medium border-[#e0e0e0] border-[1px] border-solid rounded-[30px] px-[8px]'
                  key={country.id}
                >
                  {country.name}
                </Link>
              ))}
            </>
          )}
        </div>

        {movie?.category && movie.category.length > 0 && (
          <div className='flex gap-[8px] mt-[4px] flex-wrap w-full'>
            {movie?.category.map((cat) => (
              <Link
                to={`/the-loai/${cat.slug}?page=1`}
                className='px-[6px] rounded-[2px] color-[#ececec] bg-[#ffffff14] text-[14px] font-medium text-white w-max h-full shadow-[rgba(0,0,0,0.5)_0px_1px_2px]'
                key={cat.id}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        <div className='mt-[4px]'>
          {movie?.director && movie.director[0].length > 0 && (
            <p className='text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] text-left line-clamp-1'>
              Đạo diễn:{" "}
              {movie?.director.map((name, index) => (
                <Link to='' key={index}>{`${name}, `}</Link>
              ))}
            </p>
          )}
          {movie?.actor && movie.actor[0].length > 0 && (
            <p className='text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] text-left line-clamp-1'>
              Diễn viên:{" "}
              {movie?.actor.map((name, index) => (
                <Link to='' key={index}>{`${name}, `}</Link>
              ))}
            </p>
          )}
        </div>
        <p className='text-justify mt-[4px] text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] line-clamp-3 leading-[22px]'>
          {removeHTMLTags(movie?.content)}
        </p>
      </div>

      <div className='absolute bottom-[10%] left-[64px] flex justify-between gap-[20px] z-[20]'>
        <Link
          to={`/phim/${slug}`}
          className='w-[36px] h-[36px] rounded-full bg-[#1cc749] hover:bg-[#3bf56d] flex items-center justify-center'
        >
          <FaPlay className='text-white' size={15} />
        </Link>
        <button className='w-[36px] h-[36px] rounded-full bg-[#e4e0d9] hover:bg-[#ffffff] flex items-center justify-center'>
          <MdOutlineBookmarkAdd className='text-[#111319]' size={21} />
        </button>
      </div>
    </>
  );
};

export default DetailHero;
