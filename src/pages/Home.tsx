import { FaRegClone } from "react-icons/fa";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Hero from "../components/Hero/Hero";
import MovieSlider from "../components/Movie/MovieSlider";
import {
  useGetMovieByCategoryQuery,
  useGetMovieByGenreQuery,
  useGetNewUpdatedMovieQuery,
} from "../features/movie/movieApi";
import Loader from "../components/Loader/Loader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { genreItemsData, navItemsData } from "../components/NavItems";

const Home = () => {
  const { data: movieData, isLoading } = useGetNewUpdatedMovieQuery(1);

  const initialSliders = 2;
  const incrementSliders = 2;

  const catQueries = navItemsData.map((cat) => ({
    cat,
    query: useGetMovieByCategoryQuery({
      category: cat.slug,
      page: 1,
    }),
  }));

  const [visibleCategorySliders, setVisibleCategorySliders] = useState(initialSliders);
  const [visibleGenreSliders, setVisibleGenreSliders] = useState(initialSliders);

  const genreQueries = genreItemsData.map((cat) => ({
    cat,
    query: useGetMovieByGenreQuery({
      genre: cat.slug,
      page: 1,
    }),
  }));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) return <Loader />;

  const loadMoreCategorySliders = () => {
    setVisibleCategorySliders((prev) => prev + incrementSliders);
  };

  const loadMoreGenreSliders = () => {
    setVisibleGenreSliders((prev) => prev + incrementSliders);
  };

  const hideCategorySliders = () => {
    setVisibleCategorySliders(initialSliders);
  };

  const hideGenreSliders = () => {
    setVisibleGenreSliders(initialSliders);
  };

  return (
    <div>
      <Heading title='dMOVIE' description='' keywords='' icon='../../public/favicon.ico' />
      <Header />
      <Hero items={movieData?.items || []} />

      {catQueries.slice(0, visibleCategorySliders).map(({ cat, query }) => {
        if (query.isLoading || !query.data) return null;

        return (
          <MovieSlider
            key={cat.slug}
            title={query.data.data?.titlePage}
            slug={query.data.data?.type_list}
            items={query.data.data?.items || []}
          />
        );
      })}

      <div className='text-center my-4'>
        {visibleCategorySliders < catQueries.length && (
          <button onClick={loadMoreCategorySliders} className='px-4 py-2 bg-[#23252b] text-white rounded-lg font-bold'>
            Xem Thêm
          </button>
        )}
        {visibleCategorySliders > initialSliders && (
          <button onClick={hideCategorySliders} className='px-4 py-2 bg-[#23252b] text-white rounded-lg font-bold ml-2'>
            Ẩn Bớt
          </button>
        )}
      </div>

      <div className='w-[90%] mx-auto h-[1px] bg-[#26252a] my-2'></div>

      <ul className='w-[90%] py-3 m-auto flex flex-wrap gap-[10px] text-white font-medium'>
        <Link
          to={`/danh-sach/phim-moi?page=1`}
          className='flex items-center h-[36px] px-[17px] bg-[#23252b] rounded-[4px] gap-2 cursor-pointer'
        >
          <FaRegClone /> <span>Tất Cả</span>
        </Link>
        {navItemsData.map((nav) => (
          <Link
            key={nav.slug}
            to={`/danh-sach/${nav.slug}?page=1`}
            className='flex items-center h-[36px] px-[17px] bg-[#23252b] rounded-[4px] gap-2'
          >
            {nav.name}
          </Link>
        ))}
        {genreItemsData.map((genre) => (
          <Link
            key={genre.slug}
            to={`/the-loai/${genre.slug}?page=1`}
            className='flex items-center h-[36px] px-[17px] bg-[#23252b] rounded-[4px] gap-2'
          >
            {genre.name}
          </Link>
        ))}
      </ul>

      <div className='w-[90%] mx-auto h-[1px] bg-[#26252a] my-2'></div>

      {genreQueries.slice(0, visibleGenreSliders).map(({ cat, query }) => {
        if (query.isLoading || !query.data) return null;

        return (
          <MovieSlider
            key={cat.slug}
            title={query.data.data?.titlePage}
            slug={query.data.data?.type_list}
            items={query.data.data?.items || []}
          />
        );
      })}

      <div className='text-center my-4'>
        {visibleGenreSliders < genreQueries.length && (
          <button onClick={loadMoreGenreSliders} className='px-4 py-2 bg-[#23252b] text-white rounded-lg font-bold'>
            Xem Thêm
          </button>
        )}
        {visibleGenreSliders > initialSliders && (
          <button onClick={hideGenreSliders} className='px-4 py-2 bg-[#23252b] text-white rounded-lg font-bold ml-2'>
            Ẩn Bớt
          </button>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
