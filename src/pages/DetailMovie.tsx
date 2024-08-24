import { Link, useParams } from "react-router-dom";
import Heading from "../components/Heading";
import HeroDetailMovie from "../components/Hero/HeroDetailMovie";
import Loader from "../components/Loader/Loader";
import { useGetDetailMovieQuery } from "../features/movie/movieApi";
import Footer from "../components/Footer";
import { Episode, Movie, ServerData } from "../utils/interfaces";
import { useEffect } from "react";
import { useAddToHistoryMutation } from "../features/user/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import Header from "../components/Header/Header";
import Comment from "../components/Movie/Comment";
import { FaEye, FaStar } from "react-icons/fa6";
import { removeHTMLTags } from "../utils/functions";

const DetailMovie = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useGetDetailMovieQuery(slug as string);

  const user = useSelector((state: RootState) => state.auth.user);
  const [addToHistory] = useAddToHistoryMutation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) return <Loader />;

  const movie = data?.movie as Movie;

  const separatedData = data?.episodes.reduce((acc: Record<string, ServerData[]>, server: Episode) => {
    acc[server.server_name] = server.server_data;
    return acc;
  }, {} as Record<string, ServerData[]>);

  // const genreQueries = movie.category.map((cat) => ({
  //   cat,
  //   query: useGetMovieByGenreQuery({
  //     genre: cat.slug,
  //     page: 1,
  //   }),
  // }));

  const addHistory = (ep) => {
    if (user) {
      addToHistory({ movie_slug: slug, ep });
    }
  };

  const getItemBySlug = () => {
    return user?.history?.find((item) => item.movie_slug === slug);
  };

  const watchedMovieItem = getItemBySlug();

  return (
    <div>
      <Heading title={`Phim ${movie?.name}`} description='' keywords='' icon='../../public/favicon.ico' />
      <Header />
      <HeroDetailMovie movie={movie} />

      <div className='w-[90%] m-auto pt-2'>
        {separatedData &&
          Object.entries(separatedData).map(([serverName, episodes]) => (
            <div key={serverName} className='py-3'>
              <p className='text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] text-[18px] font-semibold pb-2'>
                Danh sách tập: {serverName}
              </p>

              <div className='max-h-[160px] scroll-auto overflow-auto small-scrollbar'>
                <div className='grid gap-2' style={{ gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))" }}>
                  {episodes?.map((e: ServerData, index: number) => (
                    <Link
                      to={`/phim/${slug}/${e.name}?server-name=${encodeURIComponent(serverName)}&server=1`}
                      className={`rounded-[4px] py-1 text-white font-semibold cursor-pointer text-center ${
                        watchedMovieItem?.watched_eps.includes(e.name) ? "!bg-[#4a4a4aab]" : "bg-[#0A0C0F]"
                      } hover:bg-[#1cc749]`}
                      key={index}
                      onClick={() => addHistory(e.name)}
                    >
                      {e.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className='w-[90%] mx-auto h-[1px] bg-[#26252a] my-2 block sm:hidden'></div>

      <div className='w-[90%] m-auto block sm:hidden'>
        <h1 className='font-bold text-[30px] text-[#e0e0e0] text-left drop-shadow-[1px_1px_1px_#000]'>{movie?.name}</h1>
        <p className='font-bold text-[#e0e0e0] pb-1 drop-shadow-[1px_1px_1px_#000]'>{movie?.origin_name}</p>
        <div className='text-[14px] text-[#e0e0e0] text-left drop-shadow-[1px_1px_1px_#000] my-2 flex flex-wrap items-center gap-[4px] sm:gap-[6px]'>
          <div className='font-medium inline-flex items-center gap-1'>
            <FaStar className='text-[#1cc749]' />
            <span>
              {movie?.tmdb?.vote_average} / {movie?.tmdb?.vote_count} đánh giá
            </span>
          </div>
          <span className=''>•</span>
          <Link to={`/danh-sach/phim-moi?page=1&year=${movie?.year}`} className='font-medium'>
            {movie?.year}
          </Link>
          <span className=''>•</span>
          <span className='font-medium border-[#e0e0e0] border-[1px] border-solid rounded-[30px] px-[8px]'>
            {movie?.status === "completed" ? "Hoàn tất" : "Đang chiếu"}
          </span>
          <span className=''>•</span>
          <span className='font-medium'>{movie?.time}</span>
          <span className=''>•</span>
          <div className='font-medium inline-flex items-center gap-1'>
            <FaEye />
            <span>{movie?.view}</span>
          </div>

          {movie?.country && movie.country.length > 0 && (
            <>
              <span className=''>•</span>
              {movie?.country.map((country) => (
                <Link
                  to={`/quoc-gia/${country.slug}?page=1`}
                  className='mr-[4px] sm:mr-[6px] font-medium border-[#e0e0e0] border-[1px] border-solid rounded-[30px] px-[8px]'
                  key={country.id}
                >
                  {country.name}
                </Link>
              ))}
            </>
          )}
        </div>

        {movie?.category && movie.category.length > 0 && (
          <div className='flex gap-[8px] py-2 flex-wrap w-full'>
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
            <p className='text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] text-left'>
              Đạo diễn:{" "}
              {movie?.director.map((name, index) => (
                <Link to={`/tim-kiem/${name}?page=1`} key={index}>{`${name}, `}</Link>
              ))}
            </p>
          )}
          {movie?.actor && movie.actor[0].length > 0 && (
            <p className='text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] text-left'>
              Diễn viên:{" "}
              {movie?.actor.map((name, index) => (
                <Link to={`/tim-kiem/${name}?page=1`} key={index}>{`${name}, `}</Link>
              ))}
            </p>
          )}
        </div>
        <p className='text-justify mt-[4px] text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] leading-[22px]'>
          {removeHTMLTags(movie?.content)}
        </p>
      </div>

      <div className='w-[90%] mx-auto h-[1px] bg-[#26252a] my-2'></div>

      <Comment slug={slug} />

      <div className='w-[90%] mx-auto h-[1px] bg-[#26252a] my-2'></div>

      {/* {genreQueries.map(({ cat, query }) => {
        if (query.isLoading || !query.data) return null;

        return (
          <MovieSlider
            key={cat.slug}
            title={query.data.data?.titlePage}
            slug={query.data.data?.type_list}
            items={query.data.data?.items || []}
          />
        );
      })} */}

      <Footer />
    </div>
  );
};

export default DetailMovie;
