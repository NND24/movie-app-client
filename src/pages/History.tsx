import { Link } from "react-router-dom";
import Heading from "../components/Heading";
import { FaHome } from "react-icons/fa";
import { useEffect } from "react";
import Footer from "../components/Footer";
import HistoryMovieCard from "../components/Movie/HistoryMovieCard";
import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import { RootState } from "../features/store";

const History = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  return (
    <div>
      <Heading title={`Lịch sử xem phim của bạn`} description='' keywords='' icon='../../public/favicon.ico' />
      <Header />

      <div className='w-[90%] m-auto mt-[60px] flex items-center text-white font-semibold'>
        <Link to='/' className='flex items-center gap-1 hover:text-[#1cc749]'>
          <FaHome /> <span>Trang chủ</span>
        </Link>
        <span className='px-2'>/</span>
        <Link to='' className='flex items-center gap-1 hover:text-[#1cc749]'>
          <span>Lịch sử xem</span>
        </Link>
      </div>

      {user ? (
        <>
          {user?.history?.length > 0 ? (
            <div className='w-[90%] m-auto grid grid-cols-12 gap-[35px] mt-2'>
              <div className='col-span-12'>
                <div className='grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-[20px] grid-cols-2 gap-[5px]'>
                  {user?.history?.map((movie, index: number) => (
                    <div key={index}>
                      <HistoryMovieCard slug={movie?.movie_slug} lasted_ep={movie.lasted_ep} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className='w-[90%] m-auto flex items-center justify-center h-[83vh]'>
              <span className='text-white font-bold text-[30px]'>Chưa có phim đã xem</span>
            </div>
          )}
        </>
      ) : (
        <div className='w-[90%] m-auto flex items-center justify-center h-[83vh]'>
          <span className='text-white font-bold text-[30px]'>Vui lòng đăng nhập để xem lịch sử xem phim</span>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default History;
