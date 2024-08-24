import { Link } from "react-router-dom";
import Heading from "../components/Heading";
import { FaHome } from "react-icons/fa";
import { useEffect } from "react";
import Footer from "../components/Footer";
import FollowedMovieCard from "../components/Movie/FollowedMovieCard";
import { useSelector } from "react-redux";
import { RootState } from "../features/store";
import Header from "../components/Header/Header";

const FollowedMovie = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  return (
    <div>
      <Heading title={`Tủ phim bạn đang theo dõi`} description='' keywords='' icon='../../public/favicon.ico' />
      <Header />

      <div className='w-[90%] m-auto mt-[60px] flex flex-wrap items-center text-white font-semibold'>
        <Link to='/' className='flex items-center gap-1 hover:text-[#1cc749]'>
          <FaHome /> <span>Trang chủ</span>
        </Link>
        <span className='px-2'>/</span>
        <Link to='' className='flex items-center gap-1 hover:text-[#1cc749]'>
          <span>Phim bạn đang theo dõi</span>
        </Link>
      </div>

      {user ? (
        <>
          {user?.followedMovie?.length > 0 ? (
            <div className='w-[90%] m-auto grid grid-cols-12 gap-[35px] mt-2'>
              <div className='col-span-12'>
                <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 sm:gap-[20px] grid-cols-2 gap-[15px]'>
                  {user?.followedMovie?.map((slug: string, index: number) => (
                    <div key={index}>
                      <FollowedMovieCard slug={slug} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className='w-[90%] m-auto flex items-center justify-center h-[83vh]'>
              <span className='text-white font-bold text-[30px]'>Chưa có phim đang theo dõi</span>
            </div>
          )}
        </>
      ) : (
        <div className='w-[90%] m-auto flex items-center justify-center h-[83vh]'>
          <span className='text-white font-bold text-[30px]'>Vui lòng đăng nhập để xem phim đang theo dõi</span>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default FollowedMovie;
