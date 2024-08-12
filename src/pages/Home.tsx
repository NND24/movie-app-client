import { FaRegClone } from "react-icons/fa";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Hero from "../components/Hero";
import MovieSlider from "../components/MovieSlider";
import { useGetMovieByCategoryQuery, useGetNewUpdatedMovieQuery } from "../features/movie/movieApi";
import Loader from "../components/Loader/Loader";

const Home = () => {
  const { data: movieData, isLoading } = useGetNewUpdatedMovieQuery(1);
  const { data: tvShowsData, isLoading: tvShowsLoading } = useGetMovieByCategoryQuery({
    category: "tv-shows",
    page: 1,
  });
  const { data: phimLeData, isLoading: phimLeLoading } = useGetMovieByCategoryQuery({
    category: "phim-le",
    page: 1,
  });
  const { data: phimBoData, isLoading: phimBoLoading } = useGetMovieByCategoryQuery({
    category: "phim-bo",
    page: 1,
  });
  const { data: phimDangChieuData, isLoading: phimDangChieuLoading } = useGetMovieByCategoryQuery({
    category: "phim-dang-chieu",
    page: 1,
  });

  if (isLoading && tvShowsLoading && phimLeLoading && phimBoLoading && phimDangChieuLoading) return <Loader />;

  return (
    <div>
      <Heading title='dMOVIE' description='' keywords='' icon='../../public/favicon.ico' />
      <Header />
      <Hero items={phimDangChieuData.items || []} />
      <MovieSlider title={tvShowsData?.cat.title} items={tvShowsData.items || []} />

      <div className='w-full relative'>
        <ul className='w-[90%] pt-5 m-auto flex flex-wrap gap-[12px]'>
          <li className='flex items-center font-[14px] h-[36px] px-[17px] bg-[#23252b] text-white rounded-[4px] gap-2 cursor-pointer'>
            <FaRegClone /> <span>Tất Cả</span>
          </li>
          <li className='flex items-center font-[14px] h-[36px] px-[17px] bg-[#23252b] text-white rounded-[4px] gap-2'>
            <span>Hoạt hình</span>
          </li>
        </ul>
      </div>

      <MovieSlider title={phimLeData?.cat.title} items={phimLeData.items || []} />
      <MovieSlider title={phimBoData?.cat.title} items={phimBoData.items || []} />
      <MovieSlider title={phimDangChieuData?.cat.title} items={phimDangChieuData.items || []} />
      <Footer />
    </div>
  );
};

export default Home;
