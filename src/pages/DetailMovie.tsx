import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Heading from "../components/Heading";
import HeroDetailMovie from "../components/Hero/HeroDetailMovie";
import Loader from "../components/Loader/Loader";
import { useGetDetailMovieQuery, useGetMovieByCategoryQuery } from "../features/movie/movieApi";
import Footer from "../components/Footer";
import { Episode, Movie, ServerData } from "../utils/interfaces";
import { styles } from "../styles/style";
import { useEffect, useState } from "react";
import { BiMessage } from "react-icons/bi";
import MovieSlider from "../components/MovieSlider";

const DetailMovie = () => {
  const [question, setQuestion] = useState("");

  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useGetDetailMovieQuery(slug as string);
  const { data: phimLeData, isLoading: phimLeLoading } = useGetMovieByCategoryQuery({
    category: "phim-le",
    page: 1,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  if (isLoading && phimLeLoading) return <Loader />;

  const movie = data?.movie as Movie;

  const separatedData = data.episodes.reduce((acc: Record<string, ServerData[]>, server: Episode) => {
    acc[server.server_name] = server.server_data;
    return acc;
  }, {} as Record<string, ServerData[]>);

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

              <div className='max-h-[150px] scroll-auto overflow-auto episodes-wrapper'>
                <div className='flex gap-2 flex-wrap'>
                  {episodes?.map((episode: ServerData, index: number) => (
                    <span
                      className='rounded-[4px] px-[16px] py-[2px] bg-[#0A0C0F] text-white font-semibold cursor-pointer'
                      key={index}
                    >
                      {episode.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className='w-[90%] mx-auto h-[1px] bg-[#26252a] my-2'></div>

      <div className='w-[90%] m-auto py-3'>
        <p className='text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] text-[18px] font-semibold pb-2'>Bình luận:</p>
        <div>
          <div className='flex w-full'>
            <img
              src='https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png'
              alt=''
              className='w-[50px] h-[50px] object-cover rounded-full'
            />
            <textarea
              name=''
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=''
              cols={40}
              rows={5}
              placeholder='Write your question...'
              className='outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins text-white'
            ></textarea>
          </div>
          <div className='w-full flex justify-end'>
            <div
              className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 text-white
              }`}
            >
              Gửi
            </div>
          </div>

          <div className='w-full my-2'>
            <div className='flex mb-1'>
              <div>
                <img
                  src='https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png'
                  alt=''
                  className='w-[40px] h-[40px] object-cover rounded-full'
                />
              </div>
              <div className='pl-3 dark:text-white text-black'>
                <h5 className='text-[20px]'>Đạt Nguyễn</h5>
                <p>Phim hay</p>
              </div>
            </div>
            <div className='flex w-full items-center'>
              <span className='800px:pl-12 text-[#000000b8] dark:text-[#ffffff83] cursor-pointer mr-2'>Phản hồi</span>
              <BiMessage className='cursor-pointer' size={20} fill='#ffffff83' />
              <span className='pl-1 mt-[-4px] cursor-pointer text-[#000000b8] dark:text-[#ffffff83]'>0</span>
            </div>
          </div>
        </div>
      </div>

      <div className='w-[90%] mx-auto h-[1px] bg-[#26252a] my-2'></div>

      <MovieSlider title={phimLeData?.data?.titlePage} items={phimLeData?.data?.items || []} />

      <Footer />
    </div>
  );
};

export default DetailMovie;
