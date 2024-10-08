import Footer from "../components/Footer";
import Heading from "../components/Heading";
import Hero from "../components/Hero/Hero";
import {
  useGetMovieByCategoryQuery,
  useGetMovieByGenreQuery,
  useGetMovieByNationQuery,
  useGetMovieBySearchQuery,
} from "../features/movie/movieApi";
import Loader from "../components/Loader/Loader";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import MovieCard from "../components/Movie/MovieCard";
import { Movie } from "../utils/interfaces";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { FaFilter, FaPlay, FaRegCirclePlay } from "react-icons/fa6";
import Header from "../components/Header/Header";
import { genreItemsData, nationItemsData, navItemsData } from "../components/Header/NavItems";

const ListMovie = () => {
  const [sortFieldItem, setSortFieldItem] = useState("");
  const [filterCatItem, setFilterCatItem] = useState("");
  const [filterGenreItem, setFilterGenreItem] = useState("");
  const [countryItem, setCountryItem] = useState("");
  const [yearItem, setYearItem] = useState("");

  const { category, genre, nation, search } = useParams<{
    category: string;
    genre: string;
    nation: string;
    search: string;
  }>();
  const location = useLocation();
  const navigate = useNavigate();

  const { data: phimSapChieuData, isLoading: phimSapChieuLoading } = useGetMovieByCategoryQuery({
    category: "sap-chieu",
    page: 1,
    sortField: "",
    filterGenre: "",
    country: "",
    year: "",
  });
  const { data: phimLeData, isLoading: phimLeLoading } = useGetMovieByCategoryQuery({
    category: "phim-le",
    page: 1,
    sortField: "",
    filterGenre: "",
    country: "",
    year: "",
  });
  const { data: phimBoData, isLoading: phimBoLoading } = useGetMovieByCategoryQuery({
    category: "phim-bo",
    page: 1,
    sortField: "",
    filterGenre: "",
    country: "",
    year: "",
  });

  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page") || "1", 10);
  const sortField = queryParams.get("sortField") || "";
  const filterGenre = queryParams.get("category") || "";
  const country = queryParams.get("country") || "";
  const year = queryParams.get("year") || "";

  const [page, setPage] = useState(currentPage);

  const categoryQuery = useGetMovieByCategoryQuery({
    category: category || "",
    page: currentPage,
    sortField: sortField || "",
    filterGenre: filterGenre || "",
    country: country || "",
    year: year || "",
  });
  const genreQuery = useGetMovieByGenreQuery({
    genre: genre || "",
    page: currentPage,
  });
  const nationQuery = useGetMovieByNationQuery({
    nation: nation || "",
    page: currentPage,
  });
  const searchQuery = useGetMovieBySearchQuery({
    search: search || "",
    page: currentPage,
  });

  let queryResult;
  if (category) {
    queryResult = categoryQuery;
  } else if (genre) {
    queryResult = genreQuery;
  } else if (nation) {
    queryResult = nationQuery;
  } else if (search) {
    queryResult = searchQuery;
  } else {
    queryResult = categoryQuery;
  }

  const { data, isLoading } = queryResult;

  useEffect(() => {
    setSortFieldItem(sortField || "");
    setFilterCatItem(category || "");
    setFilterGenreItem(filterGenre || "");
    setCountryItem(country || "");
    setYearItem(year || "");
  }, [sortField, category, filterGenre, country, year]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (isLoading && phimSapChieuLoading && phimLeLoading && phimBoLoading) return <Loader />;

  const { totalItems, totalItemsPerPage } = data?.data?.params?.pagination || { totalItems: 0, totalItemsPerPage: 1 };

  const totalPages = Math.ceil(totalItems / totalItemsPerPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    navigate(
      `?page=${newPage}&sortField=${sortFieldItem}&category=${sortFieldItem}&country=${countryItem}&year=${yearItem}`
    );
  };

  const handleFilter = () => {
    navigate(
      `/danh-sach/${filterCatItem}?page=1&sortField=${sortFieldItem}&category=${filterGenreItem}&country=${countryItem}&year=${yearItem}`
    );
  };

  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const delta = 2;

    const left = Math.max(page - delta, 1);
    const right = Math.min(page + delta, totalPages);

    for (let i = 1; i <= 2 && i <= totalPages; i++) {
      if (!pageNumbers.includes(i)) {
        pageNumbers.push(i);
      }
    }

    if (left > 3) {
      pageNumbers.push("...");
    }

    for (let i = left; i <= right; i++) {
      if (!pageNumbers.includes(i)) {
        pageNumbers.push(i);
      }
    }

    if (right < totalPages - 2) {
      pageNumbers.push("...");
    }

    for (let i = totalPages - 1; i <= totalPages && i > 2; i++) {
      if (!pageNumbers.includes(i)) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div>
      <Heading title={data?.data?.titlePage} description='' keywords='' icon='../../public/favicon.ico' />
      <Header />
      {data?.data?.items.length > 0 && <Hero items={data?.data?.items || []} />}

      <div className={`w-[90%] m-auto ${data?.data?.items.length === 0 && "pt-[70px]"}`}>
        {data?.data?.items.length > 0 && (
          <h4 className='text-[22px] font-bold text-white py-3'>
            {data?.data?.titlePage} Trang {currentPage}
          </h4>
        )}

        <div className='grid grid-cols-12 gap-[35px]'>
          <div className='xl:col-span-9 lg:col-span-8 col-span-12'>
            <div
              className='w-full px-2 py-1 text-[#fff] bg-[#19181d] rounded-md mb-3'
              style={{
                boxShadow: "inset 0 0 70px rgba(0, 0, 0, .3), 0 0 20px rgba(0, 0, 0, .5)",
              }}
            >
              <div className='flex flex-col gap-2 items-center justify-center'>
                <span className='p-2 font-bold w-full text-left'>Lọc phim:</span>
                <div className='grid grid-cols-2 mobile-l:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 flex-1 w-full'>
                  <select
                    name='sort_field'
                    id=''
                    className='bg-[#212026] py-2 px-1 rounded-md outline-none small-scrollbar'
                    onChange={(e) => setSortFieldItem(e.target.value)}
                    value={sortFieldItem}
                  >
                    <option value='_id'>Thời gian đăng</option>
                    <option value='modified.time'>Thời gian cập nhật</option>
                    <option value='year'>Năm sản xuất</option>
                  </select>

                  <select
                    name='filter_cat'
                    id=''
                    className='bg-[#212026] py-2 px-1 rounded-md outline-none small-scrollbar'
                    onChange={(e) => setFilterCatItem(e.target.value)}
                    value={filterCatItem}
                  >
                    <option value=''>Phim mới</option>
                    {navItemsData.map((nav, index) => (
                      <option key={index} value={nav.slug}>
                        {nav.name}
                      </option>
                    ))}
                  </select>

                  <select
                    name='filter_genre'
                    id=''
                    className='bg-[#212026] py-2 px-1 rounded-md outline-none small-scrollbar'
                    onChange={(e) => setFilterGenreItem(e.target.value)}
                    value={filterGenreItem}
                  >
                    <option value=''>Toàn bộ thể loại</option>
                    {genreItemsData.map((nav, index) => (
                      <option key={index} value={nav.slug}>
                        {nav.name}
                      </option>
                    ))}
                  </select>

                  <select
                    name='country'
                    id=''
                    className='bg-[#212026] py-2 px-1 rounded-md outline-none small-scrollbar'
                    onChange={(e) => setCountryItem(e.target.value)}
                    value={countryItem}
                  >
                    <option value=''>Toàn bộ quốc gia</option>
                    {nationItemsData.map((nav, index) => (
                      <option key={index} value={nav.slug}>
                        {nav.name}
                      </option>
                    ))}
                  </select>

                  <select
                    name='year'
                    id=''
                    className='bg-[#212026] py-2 px-1 rounded-md outline-none small-scrollbar'
                    onChange={(e) => setYearItem(e.target.value)}
                    value={yearItem}
                  >
                    <option value=''>Toàn bộ năm</option>
                    {[...Array(new Date().getFullYear() + 2 - 2000).keys()].map((_, index) => {
                      const year = new Date().getFullYear() + 1 - index;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div
                  className={`bg-[#00DC5A] py-2 px-4 rounded-md font-bold cursor-pointer flex gap-2 items-center`}
                  onClick={() => handleFilter()}
                >
                  <span>Lọc</span>
                  <FaFilter />
                </div>
              </div>
            </div>

            {data?.data?.items.length > 0 ? (
              <>
                <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-3 sm:gap-[20px] grid-cols-2 gap-[15px]'>
                  {data?.data?.items?.map((movie: Movie, index: number) => (
                    <div key={index}>
                      <MovieCard slug={movie?.slug} />
                    </div>
                  ))}
                </div>

                <div className='mt-5 w-full flex items-center justify-center'>
                  {page > 1 && (
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      className='px-3 py-2 mr-2 text-[#e0e0e0] border-[#e0e0e0] border-[1px] border-solid rounded-[6px] h-[40px]'
                    >
                      <FaChevronLeft />
                    </button>
                  )}
                  {pageNumbers.map((pageNumber, index) =>
                    pageNumber === "..." ? (
                      <span key={index} className='px-3 py-2 mr-2 text-[#e0e0e0]'>
                        ...
                      </span>
                    ) : (
                      <button
                        key={index}
                        className={
                          page === pageNumber
                            ? "px-3 py-2 mr-2 bg-[#00DC5A] text-[#e0e0e0] border-[#e0e0e0] border-[1px] border-solid rounded-[6px] h-[40px]"
                            : "px-3 py-2 mr-2 text-[#e0e0e0] border-[#e0e0e0] border-[1px] border-solid rounded-[6px] h-[40px]"
                        }
                        onClick={() => handlePageChange(pageNumber as number)}
                      >
                        {pageNumber}
                      </button>
                    )
                  )}
                  {page < totalPages && (
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      className='px-3 py-2 mr-2 text-[#e0e0e0] border-[#e0e0e0] border-[1px] border-solid rounded-[6px] h-[40px]'
                    >
                      <FaChevronRight />
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className='text-white font-bold text-[30px]'>
                <p>Rất tiếc</p> <p>Chúng tôi không có phim cho mục này...</p>
              </div>
            )}
          </div>

          <div className='xl:col-span-3 lg:col-span-4 hidden lg:block'>
            <div
              className='rounded-md mb-6 bg-[#212026] text-[#818083] overflow-hidden'
              style={{
                boxShadow: "inset 0 0 70px rgba(0, 0, 0, .3), 0 0 20px rgba(0, 0, 0, .5)",
              }}
            >
              <h3 className='text-white text-[20px] bg-[#19181d] text-center px-4 py-3 font-semibold'>Sắp Chiếu</h3>
              <ul className='py-1 max-h-[215px] overflow-auto small-scrollbar'>
                {phimSapChieuData &&
                  phimSapChieuData?.data?.items.map((movie: Movie) => (
                    <li
                      key={movie?._id}
                      className='px-3 flex items-center justify-between leading-10 hover:shadow-[inset_0_0_70px_rgba(0,0,0,0.2)] hover:border-l-[3px] hover:border-[#00DC5A] hover:text-[#00DC5A]'
                    >
                      <Link to={`/phim/${movie?.slug}`} className='flex items-center gap-2'>
                        <FaRegCirclePlay /> <span className='w-[175px] line-clamp-1'>{movie?.name}</span>
                      </Link>
                      <span className='text-[14px]'>{movie.year}</span>
                    </li>
                  ))}
              </ul>
            </div>

            <div
              className='rounded-md mb-6 bg-[#212026] text-[#818083] overflow-hidden'
              style={{
                boxShadow: "inset 0 0 70px rgba(0, 0, 0, .3), 0 0 20px rgba(0, 0, 0, .5)",
              }}
            >
              <h3 className='text-white text-[20px] bg-[#19181d] text-center px-4 py-3 font-semibold'>Top Phim Lẻ</h3>
              <ul className='py-3 px-2 max-h-[540px] overflow-auto small-scrollbar'>
                {phimLeData &&
                  phimLeData?.data?.items.map((movie: Movie, index: number) => (
                    <li className='relative pl-[68px] min-h-[90px] mb-4' key={movie?._id}>
                      <Link to={`/phim/${movie?.slug}`} className='group'>
                        <p className='text-[16px] font-bold text-white mb-[4px] z-10 hover:text-[#00DC5A] line-clamp-1'>
                          {movie?.name}
                        </p>

                        <span className='absolute top-0 left-0 rounded-t-[4px] rounded-b-[4px] font-bold w-[20px] h-[20px] bg-[#1cc749] text-center text-white text-[0.65rem] leading-[1.2rem] z-10'>
                          {index + 1}
                        </span>

                        <div className='absolute top-0 left-0 w-[60px] p-[2px] rounded-[4px] bg-[#1cc749] z-0'>
                          <div className='pt-[86px] relative overflow-hidden rounded-[4px]'>
                            <img
                              className='absolute top-0 left-0 w-full h-full object-cover object-top rounded-[4px] overflow-hidden z-10'
                              src={`https://img.ophim.live/uploads/movies/${movie?.thumb_url}`}
                              alt={movie?.name}
                            />

                            <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[4px] z-20'>
                              <div
                                className='w-[35px] h-[35px] rounded-full flex items-center justify-center'
                                style={{
                                  border: "2px solid #1cc749",
                                }}
                              >
                                <FaPlay className='text-white text-lg' />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className='text-white font-bold text-[12px]'>
                        <div className='flex items-center mb-[6px]'>
                          <span className='px-2 bg-[#1cc749] rounded-2xl mr-[6px]'>{movie?.lang}</span>
                          <span className='px-2 bg-[#1cc749] rounded-2xl mr-[6px]'>{movie?.quality}</span>
                          <div className='inline-flex items-center gap-1'>
                            <FaStar className='text-[#1cc749]' />
                            <span>{movie?.tmdb?.vote_average}</span>
                          </div>
                        </div>
                        <div className='flex items-center text-[#818083] font-bold text-[12px] '>
                          <span className='mr-[6px]'>{movie?.year}</span>
                          <span className='mr-[6px]'>{movie?.time}</span>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>

            <div
              className='rounded-md mb-6 bg-[#212026] text-[#818083] overflow-hidden'
              style={{
                boxShadow: "inset 0 0 70px rgba(0, 0, 0, .3), 0 0 20px rgba(0, 0, 0, .5)",
              }}
            >
              <h3 className='text-white text-[20px] bg-[#19181d] text-center px-4 py-3 font-semibold'>Top Phim Bộ</h3>
              <ul className='py-3 px-2 max-h-[540px] overflow-auto small-scrollbar'>
                {phimBoData &&
                  phimBoData?.data?.items.map((movie: Movie, index: number) => (
                    <li className='relative pl-[68px] min-h-[90px] mb-4' key={movie?._id}>
                      <Link to={`/phim/${movie?.slug}`}>
                        <p className='text-[16px] font-bold text-white mb-[4px] z-10 hover:text-[#00DC5A] line-clamp-1'>
                          {movie?.name}
                        </p>

                        <span className='absolute top-0 left-0 rounded-t-[4px] rounded-b-[4px] font-bold w-[20px] h-[20px] bg-[#1cc749] text-center text-white text-[0.65rem] leading-[1.2rem] z-10'>
                          {index}
                        </span>
                        <div className='absolute top-0 left-0 w-[60px] p-[2px] rounded-[4px] bg-[#1cc749]'>
                          <div className='pt-[86px] relative overflow-hidden rounded-[4px]'>
                            <img
                              className='absolute top-0 left-0 w-full h-full object-cover object-top rounded-[4px] overflow-hidden z-10'
                              src={`https://img.ophim.live/uploads/movies/${movie?.thumb_url}`}
                              alt={movie?.name}
                            />

                            <div className='absolute left-0 right-0 top-0 bottom-0 w-[3rem] h-[3rem] m-auto rounded-full text-center leading-[3rem] text-2xl scale-0 duration-200 bg-[#000000b3] shadow-[inset_0_0_0_2px_#fff] z-20'>
                              <FaPlay />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className='text-white font-bold text-[12px]'>
                        <div className='flex items-center mb-[6px]'>
                          <span className='px-2 bg-[#1cc749] rounded-2xl mr-[6px]'>{movie?.lang}</span>
                          <span className='px-2 bg-[#1cc749] rounded-2xl mr-[6px]'>{movie?.quality}</span>
                          <div className='inline-flex items-center gap-1'>
                            <FaStar className='text-[#1cc749]' />
                            <span>{movie?.tmdb?.vote_average}</span>
                          </div>
                        </div>
                        <div className='flex items-center text-[#818083] font-bold text-[12px] '>
                          <span className='mr-[6px]'>{movie?.year}</span>
                          <span className='mr-[6px]'>{movie?.time}</span>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ListMovie;
