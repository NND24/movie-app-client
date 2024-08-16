import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Heading from "../components/Heading";
import { FaChevronLeft, FaChevronRight, FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  useGetMovieByCategoryQuery,
  useGetMovieByGenreQuery,
  useGetMovieByNationQuery,
  useGetMovieBySearchQuery,
} from "../features/movie/movieApi";
import Loader from "../components/Loader/Loader";
import { Movie } from "../utils/interfaces";
import Footer from "../components/Footer";
import FollowedMovieCard from "../components/Movie/FollowedMovieCard";

type Props = {};

const FollowedMovie = (props: Props) => {
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
  });
  const { data: phimLeData, isLoading: phimLeLoading } = useGetMovieByCategoryQuery({
    category: "phim-le",
    page: 1,
  });
  const { data: phimBoData, isLoading: phimBoLoading } = useGetMovieByCategoryQuery({
    category: "phim-bo",
    page: 1,
  });

  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page") || "1", 10);

  const [page, setPage] = useState(currentPage);

  const categoryQuery = useGetMovieByCategoryQuery({ category: category || "", page: currentPage });
  const genreQuery = useGetMovieByGenreQuery({ genre: genre || "", page: currentPage });
  const nationQuery = useGetMovieByNationQuery({ nation: nation || "", page: currentPage });
  const searchQuery = useGetMovieBySearchQuery({ search: search || "", page: currentPage });

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (isLoading && phimSapChieuLoading && phimLeLoading && phimBoLoading) return <Loader />;

  const { totalItems, totalItemsPerPage } = data?.data?.params?.pagination || { totalItems: 0, totalItemsPerPage: 1 };

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
      <Heading title={`Tủ phim bạn đang theo dõi`} description='' keywords='' icon='../../public/favicon.ico' />
      <Header />

      <div className='w-[90%] m-auto mt-[60px] flex items-center text-white font-semibold'>
        <Link to='/' className='flex items-center gap-1 hover:text-[#1cc749]'>
          <FaHome /> <span>Trang chủ</span>
        </Link>
        <span className='px-2'>/</span>
        <Link to='' className='flex items-center gap-1 hover:text-[#1cc749]'>
          <span>Phim bạn đang theo dõi</span>
        </Link>
      </div>

      <div className='w-[90%] m-auto grid grid-cols-12 gap-[35px] mt-2'>
        <div className='col-span-12'>
          <div className='grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-3 sm:gap-[20px] grid-cols-2 gap-[15px]'>
            {data?.data?.items?.map((movie: Movie, index: number) => (
              <div key={index}>
                <FollowedMovieCard slug={movie?.slug} />
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
      </div>

      <Footer />
    </div>
  );
};

export default FollowedMovie;
