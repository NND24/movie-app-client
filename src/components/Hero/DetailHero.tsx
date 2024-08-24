import { FC, useEffect } from "react";
import { useGetDetailMovieQuery } from "../../features/movie/movieApi";
import { removeHTMLTags } from "../../utils/functions";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { Movie } from "../../utils/interfaces";
import { Link } from "react-router-dom";
import { FaEye, FaStar, FaPlay } from "react-icons/fa6";
import { useAddFollowedMovieMutation } from "../../features/user/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import toast from "react-hot-toast";

type Props = {
  slug: string;
};

const DetailHero: FC<Props> = ({ slug }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data } = useGetDetailMovieQuery(slug);
  const [addFollowedMovie, { isSuccess, error }] = useAddFollowedMovieMutation();

  const movie = data?.movie as Movie;

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
        const errorData = error;
        if (errorData.data.message === "Movie already followed") {
          toast.success("Phim đã được lưu!");
        }
      }
    }
  }, [isSuccess, error]);

  return (
    <>
      <Link to={`/phim/${slug}`}>
        <img src={movie?.poster_url} alt={movie?.name} className='w-full h-full object-cover bg-[#303030bb]' />
      </Link>

      <div className='absolute top-0 left-0 right-0 h-[80px] bg-gradient-to-b from-[#0a0c0f] to-transparent z-[10]' />
      <div className='absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-[#0a0c0f] to-transparent z-[10]' />
      {/* <div className='absolute top-0 bottom-0 left-0 h-full w-[80px] bg-gradient-to-r from-[#0a0c0f] to-transparent z-[10]' />
      <div className='absolute top-0 bottom-0 right-0 h-full w-[80px] bg-gradient-to-l from-[#0a0c0f] to-transparent z-[10]' /> */}

      <div className='absolute left-[35px] mobile-m:left-[38px] mobile-l:left-[38px] mobile-xl:left-[50px] sm:left-[65px] bottom-[calc(6%+24px+3.5vw)] sm:bottom-[calc(10%+24px+3.5vw)] flex flex-col items-start w-[79%] mobile-m:w-[82%] mobile-l:w-[84%] sm:w-[70%] md:w-[60%] lg:w-[50%] z-[20]'>
        <h1 className='font-bold text-[22px] mobile-m:text-[25px] sm:text-[30px] text-[#e0e0e0] text-left drop-shadow-[1px_1px_1px_#000]'>
          {movie?.name}
        </h1>
        <p className='font-bold text-[14px] mobile-m:text-[16px] sm:text-[18px] text-[#e0e0e0] mb-1 drop-shadow-[1px_1px_1px_#000]'>
          {movie?.origin_name}
        </p>
        <div className='text-[13px] sm:text-[14px] text-[#e0e0e0] text-left drop-shadow-[1px_1px_1px_#000] my-1 flex items-center flex-wrap gap-[4px] sm:gap-[6px]'>
          <div className=' font-medium inline-flex items-center gap-1'>
            <FaStar className='text-[#1cc749]' />
            <span>{movie?.tmdb?.vote_average}</span>
          </div>
          <span className=''>•</span>
          <Link to={`/danh-sach/phim-moi?page=1&year=${movie?.year}`} className=' font-medium'>
            {movie?.year}
          </Link>
          <span className='hidden mobile-l:block'>•</span>
          <span className='hidden mobile-l:block font-medium border-[#e0e0e0] border-[1px] border-solid rounded-[30px] px-[8px] w-max'>
            {movie?.status === "completed" ? "Hoàn tất" : "Đang chiếu"}
          </span>
          <span className=''>•</span>
          <span className=' font-medium'>{movie?.time}</span>
          <span className=''>•</span>
          <div className=' font-medium inline-flex items-center gap-1'>
            <FaEye />
            <span>{movie?.view}</span>
          </div>

          {movie?.country && movie.country.length > 0 && (
            <div className='hidden mobile-l:block'>
              <span className='mr-[4px] sm:mr-[6px]'>•</span>
              {movie?.country.map((country) => (
                <Link
                  to={`/quoc-gia/${country.slug}?page=1`}
                  className='mr-[4px] sm:mr-[6px] font-medium border-[#e0e0e0] border-[1px] border-solid rounded-[30px] px-[8px]'
                  key={country.id}
                >
                  {country.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {movie?.category && movie.category.length > 0 && (
          <div className='hidden mobile-l:block'>
            <div className='flex gap-[8px] mt-[4px] flex-wrap w-full'>
              {movie?.category.map((cat) => (
                <Link
                  to={`/the-loai/${cat.slug}?page=1`}
                  className='px-[6px] rounded-[2px] color-[#ececec] bg-[#33333341] text-[14px] font-medium text-white w-max h-full shadow-[rgba(0,0,0,0.5)_0px_1px_2px]'
                  key={cat.id}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className='mt-[4px] hidden sm:block'>
          {movie?.director && movie.director[0].length > 0 && (
            <p className='text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] text-left line-clamp-1'>
              Đạo diễn:{" "}
              {movie?.director.map((name, index) => (
                <Link to={`/tim-kiem/${name}?page=1`} key={index}>{`${name}, `}</Link>
              ))}
            </p>
          )}
          {movie?.actor && movie.actor[0].length > 0 && (
            <p className='text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] text-left line-clamp-1'>
              Diễn viên:{" "}
              {movie?.actor.map((name, index) => (
                <Link to={`/tim-kiem/${name}?page=1`} key={index}>{`${name}, `}</Link>
              ))}
            </p>
          )}
        </div>
        <p className='text-[16px] sm:text-[18px] text-justify mt-[4px] text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] line-clamp-2 mobile-l:line-clamp-3 leading-[18px] sm:leading-[22px]'>
          {removeHTMLTags(movie?.content)}
        </p>
      </div>

      <div className='absolute left-[35px] mobile-m:left-[38px] mobile-l:left-[38px] mobile-xl:left-[50px] sm:left-[65px] bottom-[6%] sm:bottom-[10%] flex justify-between gap-[10px] sm:gap-[20px] z-[20]'>
        <Link
          to={`/phim/${slug}`}
          className='w-[28px] sm:w-[38px] h-[28px] sm:h-[38px] rounded-full bg-[#1cc749] hover:bg-[#3bf56d] flex items-center justify-center'
        >
          <FaPlay className='text-white' size={15} />
        </Link>
        <button
          className='w-[28px] sm:w-[38px] h-[28px] sm:h-[38px] rounded-full bg-[#e4e0d9] hover:bg-[#ffffff] flex items-center justify-center'
          onClick={() => addToFollowed()}
        >
          <MdOutlineBookmarkAdd className='text-[#111319]' size={21} />
        </button>
      </div>
    </>
  );
};

export default DetailHero;
