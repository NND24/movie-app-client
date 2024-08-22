import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Heading from "../components/Heading";
import HeroDetailMovie from "../components/Hero/HeroDetailMovie";
import Loader from "../components/Loader/Loader";
import { useGetDetailMovieQuery } from "../features/movie/movieApi";
import Footer from "../components/Footer";
import { Episode, Movie, ServerData } from "../utils/interfaces";
import { useEffect } from "react";
import Comment from "../components/Comment";
import { useAddToHistoryMutation } from "../features/user/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";

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
    addToHistory({ movie_slug: slug, ep });
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
                      to={`/phim/${slug}/${e.name}?server-name=${encodeURIComponent(serverName)}`}
                      className={`rounded-[4px] py-1 text-white font-semibold cursor-pointer text-center ${
                        watchedMovieItem?.watched_eps.includes(e.name) ? "!bg-[#8a8a8ac7]" : "bg-[#0A0C0F]"
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
