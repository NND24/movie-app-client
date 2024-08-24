import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { Link, useLocation, useParams } from "react-router-dom";
import { useGetDetailMovieQuery } from "../features/movie/movieApi";
import Loader from "../components/Loader/Loader";
import { Episode, Movie, ServerData } from "../utils/interfaces";
import { removeHTMLTags } from "../utils/functions";
import { FaEye, FaHome, FaStar } from "react-icons/fa";
import { useAddToHistoryMutation } from "../features/user/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import Header from "../components/Header/Header";
import Comment from "../components/Movie/Comment";

const WatchMovie = () => {
  const { slug, episode } = useParams<{ slug: string; episode: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serverNameFromUrl = queryParams.get("server-name");
  const decodedServerName = serverNameFromUrl ? decodeURIComponent(serverNameFromUrl) : "";

  const { data, isLoading } = useGetDetailMovieQuery(slug as string);

  const [selectedServerName, setSelectedServerName] = useState<string>(decodedServerName);

  const user = useSelector((state: RootState) => state.auth.user);
  const [addToHistory] = useAddToHistoryMutation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) return <Loader />;

  const movie = data?.movie as Movie;

  const separatedData = data.episodes.reduce((acc: Record<string, ServerData[]>, server: Episode) => {
    acc[server.server_name] = server.server_data;
    return acc;
  }, {} as Record<string, ServerData[]>);

  const episodesForServer = separatedData[selectedServerName] || [];
  const selectedEpisode = episodesForServer.find((ep) => ep.name === episode);

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

      <div className='w-[90%] m-auto mt-[60px] flex flex-wrap items-center text-white font-semibold'>
        <Link to='/' className='flex items-center gap-1 hover:text-[#1cc749]'>
          <FaHome /> <span>Trang chủ</span>
        </Link>
        <span className='px-2'>/</span>
        <Link to={`/phim/${movie?.slug}`} className='flex items-center gap-1 hover:text-[#1cc749]'>
          <span>{movie?.name}</span>
        </Link>
      </div>

      <div className='w-[90%] m-auto flex items-center justify-center pt-2'>
        <iframe
          src={`${selectedEpisode?.link_embed}?autoplay=1`}
          className='h-[84vh] w-full'
          frameBorder='0'
          allowFullScreen
          title='Video Player'
        ></iframe>
      </div>

      <div className='w-[90%] m-auto flex justify-center pt-5'>
        <div className='border-[1px] border-slate-50 rounded-[4px] p-2'>
          <span className='py-1 px-2 text-white font-semibold text-center mr-2'>Đổi Server:</span>
          {separatedData &&
            Object.keys(separatedData).map((serverName) => (
              <Link
                to={`/phim/${slug}/${episode}?server-name=${encodeURIComponent(serverName)}`}
                className={`
                  rounded-[4px] py-1 px-1 bg-[#0A0C0F] hover:bg-[#1cc749] text-white font-semibold cursor-pointer text-center mr-2 ${
                    serverName === selectedServerName ? "!bg-[#1cc749]" : ""
                  }`}
                onClick={() => setSelectedServerName(serverName)}
              >
                {serverName}
              </Link>
            ))}
        </div>
      </div>

      <div className='w-[90%] m-auto'>
        {separatedData &&
          Object.entries(separatedData).map(([serverName, episodes]) => (
            <div key={serverName}>
              {selectedServerName === serverName && (
                <div className='py-3'>
                  <p className='text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] text-[18px] font-semibold pb-2'>
                    Danh sách tập: {serverName}
                  </p>

                  <div className='max-h-[160px] scroll-auto overflow-auto small-scrollbar'>
                    <div className='grid gap-2' style={{ gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))" }}>
                      {episodes?.map((e: ServerData, index: number) => (
                        <Link
                          to={`/phim/${slug}/${e.name}?server-name=${encodeURIComponent(serverName)}`}
                          className={`rounded-[4px] py-1 text-white font-semibold cursor-pointer text-center ${
                            e.name === episode
                              ? "!bg-[#1cc749]"
                              : watchedMovieItem?.watched_eps.includes(e.name)
                              ? "!bg-[#8a8a8ac7]"
                              : "bg-[#0A0C0F]"
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
              )}
            </div>
          ))}
      </div>

      <div className='w-[90%] mx-auto h-[1px] bg-[#26252a] my-2'></div>

      <div className='w-[90%] m-auto'>
        <h1 className='font-bold text-[30px] text-[#e0e0e0] text-left drop-shadow-[1px_1px_1px_#000]'>{movie?.name}</h1>
        <p className='font-bold text-[#e0e0e0] pb-1 drop-shadow-[1px_1px_1px_#000]'>{movie?.origin_name}</p>
        <div className='text-[14px] text-[#e0e0e0] text-left drop-shadow-[1px_1px_1px_#000] my-2 flex flex-wrap items-center gap-[4px] sm:gap-[6px]'>
          <div className=' font-medium inline-flex items-center gap-1'>
            <FaStar className='text-[#1cc749]' />
            <span>
              {movie?.tmdb?.vote_average} / {movie?.tmdb?.vote_count} đánh giá
            </span>
          </div>
          <span className=''>•</span>
          <Link to={`/danh-sach/phim-moi?page=1&year=${movie?.year}`} className=' font-medium'>
            {movie?.year}
          </Link>
          <span className=''>•</span>
          <span className=' font-medium border-[#e0e0e0] border-[1px] border-solid rounded-[30px] px-[8px]'>
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
    </div>
  );
};

export default WatchMovie;
