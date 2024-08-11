import { FaRegClone } from "react-icons/fa";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Hero from "../components/Hero";
import MovieSlider from "../components/MovieSlider";
import { useGetNewUpdatedMovieQuery } from "../features/movie/movieApi";
import Loader from "../components/Loader/Loader";

const Home = () => {
  const { data: movieData, isLoading } = useGetNewUpdatedMovieQuery(1);

  if (isLoading) return <Loader />;

  const items = movieData?.items || [];

  return (
    <div>
      <Heading title='MOVIE APP' description='' keywords='' />
      <Header />
      <Hero items={items} />
      <MovieSlider titlePage='Hoạt hình' />

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

      <MovieSlider titlePage='Hoạt hình' />
      <Footer />
    </div>
  );
};

export default Home;
