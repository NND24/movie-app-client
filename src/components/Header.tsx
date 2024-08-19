import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiHistory, BiSearch, BiUser } from "react-icons/bi";
import NavItems from "./NavItems";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import { FaRegBookmark, FaSortUp } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { RiUserLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useLogoutQuery } from "../features/auth/authApi";

type Props = {
  isProfile?: boolean;
};

const Header: FC<Props> = ({ isProfile }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [logout, setLogout] = useState(false);

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 80);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [user]);

  const handelSearch = () => {
    navigate(`/tim-kiem/${search}?page=1`);
  };

  console.log(user.avatar.length);

  return (
    <>
      <header className='w-full relative'>
        <div
          className={`${
            active || isProfile
              ? "bg-[#0a0c0f] fixed top-0 left-0 w-full h-[60px] z-[1000] transition duration-500 ease-in-out"
              : "w-full fixed top-0 left-0 h-[60px] z-[1000]"
          }`}
        >
          <div className='w-[95%] 800px:w-[92%] m-auto h-full'>
            <div className='w-full h-[60px] flex items-center justify-between p-3'>
              <div className='flex items-center gap-[20px]'>
                <Link
                  to='/'
                  className={`text-[25px] leading-none font-Poppins font-bold drop-shadow-[1px_1px_1px_#000] text-[#00dc5a] pb-[6px]`}
                >
                  dMovie
                </Link>

                <NavItems />
              </div>

              <div className='flex items-center'>
                <div className='w-[240px] h-[36px] relative flex rounded-[4px]'>
                  <input
                    type='search'
                    className='w-full h-full pr-[40px] pl-[12px] rounded-[4px] bg-[#bebebe42] text-white size-[14px] overflow-hidden whitespace-nowrap text-ellipsis outline-none'
                    autoComplete='off'
                    placeholder='Tìm kiếm...'
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handelSearch();
                      }
                    }}
                  />
                  <BiSearch
                    className='absolute right-[10px] top-[8px] flex align-center justify-center cursor-pointer'
                    size={24}
                    fill='#d8d2d1'
                    onClick={handelSearch}
                  />
                </div>

                <Link to='/lich-su'>
                  <BiHistory className='mx-4 text-white hover:text-[#00dc5a] cursor-pointer' size={30} />
                </Link>
                {isLogged ? (
                  <div className='relative'>
                    <img
                      src={
                        user.avatar && user.avatar.url
                          ? user.avatar.url
                          : "https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png"
                      }
                      alt='avatar'
                      className='w-[30px] h-[30px] object-cover rounded-full cursor-pointer'
                      onClick={() => setOpenModal(!openModal)}
                    />

                    {openModal && (
                      <>
                        <FaSortUp className='absolute top-[32px] left-[8px]' fill='#00dc5a' />
                        <ul
                          className='absolute top-[39px] right-[-50px] w-[250px] py-1 bg-[#1a191f] flex flex-col'
                          style={{
                            borderTopColor: "#00dc5a",
                            borderTopWidth: "3px",
                            boxShadow: "inset 0 0 70px rgba(0, 0, 0, .3), 0 0 20px rgba(0, 0, 0, .5)",
                          }}
                        >
                          <Link
                            to={``}
                            className='text-[16px] font-Poppins font-medium text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] hover:text-[#00dc5a] hover:border-l-[3px] hover:border-[#00DC5A] p-2 flex items-center gap-2 hover:bg-[#96969633]'
                          >
                            <FaRegBookmark />
                            <span>Phim đã lưu</span>
                          </Link>
                          <Link
                            to={``}
                            className='text-[16px] font-Poppins font-medium text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] hover:text-[#00dc5a] hover:border-l-[3px] hover:border-[#00DC5A] p-2 flex items-center gap-2 hover:bg-[#96969633]'
                          >
                            <RiUserLine />
                            <span> Tài khoản của tôi</span>
                          </Link>
                          <div
                            className='text-[16px] font-Poppins font-medium text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] hover:text-[#00dc5a] hover:border-l-[3px] hover:border-[#00DC5A] p-2 flex items-center gap-2 hover:bg-[#96969633] cursor-pointer'
                            onClick={() => setLogout(true)}
                          >
                            <FaArrowRightFromBracket />
                            <span>Đăng xuất</span>
                          </div>
                        </ul>
                      </>
                    )}
                  </div>
                ) : (
                  <BiUser
                    className='mx-4 text-white hover:text-[#00dc5a] cursor-pointer'
                    size={30}
                    onClick={() => {
                      setOpenSignUp(false);
                      setOpenLogin(!openLogin);
                    }}
                  />
                )}
                {/* <ThemeSwitcher /> */}
              </div>
            </div>
          </div>
        </div>
      </header>
      {openLogin && (
        <div className='fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px]  bg-[#f8f8f8] rounded-[8px] shadow p-4 outline-none z-[2000]'>
          <Login setOpenLogin={setOpenLogin} setOpenSignUp={setOpenSignUp} />
        </div>
      )}
      {openSignUp && (
        <div className='fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px]  bg-[#f8f8f8] rounded-[8px] shadow p-4 outline-none z-[2000]'>
          <SignUp setOpenLogin={setOpenLogin} setOpenSignUp={setOpenSignUp} />
        </div>
      )}
    </>
  );
};

export default Header;
