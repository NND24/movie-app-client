import Footer from "../components/Footer";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Hero from "../components/Hero/Hero";
import {
  useGetMovieByCategoryQuery,
  useGetMovieByGenreQuery,
  useGetMovieByNationQuery,
} from "../features/movie/movieApi";
import Loader from "../components/Loader/Loader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { Movie } from "../utils/interfaces";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ListMovie = () => {
  const { cat, genre, nation } = useParams<{ cat: string; genre: string; nation: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page") || "1", 10);

  const [page, setPage] = useState(currentPage);

  const categoryQuery = useGetMovieByCategoryQuery({ category: cat || "", page: currentPage });
  const genreQuery = useGetMovieByGenreQuery({ genre: genre || "", page: currentPage });
  const nationQuery = useGetMovieByNationQuery({ nation: nation || "", page: currentPage });

  let queryResult;
  if (cat) {
    queryResult = categoryQuery;
  } else if (genre) {
    queryResult = genreQuery;
  } else if (nation) {
    queryResult = nationQuery;
  } else {
    queryResult = categoryQuery;
  }

  const { data, isLoading } = queryResult;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (isLoading) return <Loader />;

  const { totalItems, totalItemsPerPage } = data.data.params.pagination;
  const totalPages = Math.ceil(totalItems / totalItemsPerPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    navigate(`?page=${newPage}`);
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
      <Heading title={data.data?.titlePage} description='' keywords='' icon='../../public/favicon.ico' />
      <Header />
      <Hero items={data.data?.items || []} />

      <div className='w-[90%] m-auto'>
        <h4 className='text-[22px] font-bold text-white py-3'>{data.data?.titlePage}</h4>
        <div className='grid grid-cols-5 gap-[25px]'>
          {data.data?.items?.map((movie: Movie, index: number) => (
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
      </div>

      <Footer />
    </div>
  );
};

export default ListMovie;
