import { FaRegClone } from "react-icons/fa";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Hero from "../components/Hero/Hero";
import MovieSlider from "../components/MovieSlider";
import { useGetMovieByCategoryQuery, useGetNewUpdatedMovieQuery } from "../features/movie/movieApi";
import Loader from "../components/Loader/Loader";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { genreItemsData, navItemsData } from "../components/NavItems";

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  if (isLoading && tvShowsLoading && phimLeLoading && phimBoLoading && phimDangChieuLoading) return <Loader />;

  return (
    <div>
      <Heading title='dMOVIE' description='' keywords='' icon='../../public/favicon.ico' />
      <Header />
      <Hero items={movieData?.items || []} />
      <MovieSlider
        slug={tvShowsData?.data?.type_list}
        title={tvShowsData?.data?.titlePage}
        items={tvShowsData?.data?.items || []}
      />

      <div className='w-full relative'>
        <ul className='w-[90%] pt-5 m-auto flex flex-wrap gap-[12px]'>
          <Link
            to={`/danh-sach/phim-moi?page=1`}
            className='flex items-center font-[14px] h-[36px] px-[17px] bg-[#23252b] text-white rounded-[4px] gap-2 cursor-pointer'
          >
            <FaRegClone /> <span>Tất Cả</span>
          </Link>
          {navItemsData.map((nav) => (
            <Link
              to={`/danh-sach/${nav.slug}?page=1`}
              className='flex items-center font-[14px] h-[36px] px-[17px] bg-[#23252b] text-white rounded-[4px] gap-2'
            >
              {nav.name}
            </Link>
          ))}
          {genreItemsData.map((genre) => (
            <Link
              to={`/the-loai/${genre.slug}?page=1`}
              className='flex items-center font-[14px] h-[36px] px-[17px] bg-[#23252b] text-white rounded-[4px] gap-2'
            >
              {genre.name}
            </Link>
          ))}
        </ul>
      </div>

      <MovieSlider
        slug={tvShowsData?.data?.type_list}
        title={phimLeData?.data?.titlePage}
        items={phimLeData?.data?.items || []}
      />
      <MovieSlider
        slug={tvShowsData?.data?.type_list}
        title={phimBoData?.data?.titlePage}
        items={phimBoData?.data?.items || []}
      />
      <MovieSlider
        slug={tvShowsData?.data?.type_list}
        title={phimDangChieuData?.data?.titlePage}
        items={phimDangChieuData?.data?.items || []}
      />
      <Footer />
    </div>
  );
};

export default Home;
