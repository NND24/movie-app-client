import { FC, useState } from "react";
import { BiSearch, BiUser } from "react-icons/bi";
import { FaHistory, FaRegBookmark } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { RiUserLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import NavItems from "./NavItems";
import { IoMdList } from "react-icons/io";

type Props = {
  user: any;
  openSideBar: boolean;
  setOpenSideBar: (openSideBar: boolean) => void;
  openLogin: boolean;
  setOpenLogin: (openLogin: boolean) => void;
  setOpenSignUp: (open: boolean) => void;
  handleLogout: any;
};

const Sidebar: FC<Props> = ({
  user,
  openSideBar,
  setOpenSideBar,
  openLogin,
  setOpenLogin,
  setOpenSignUp,
  handleLogout,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const handleSearch = () => {
    navigate(`/tim-kiem/${search}?page=1`);
  };

  return (
    <>
      <div
        className='bg-[#0a0c0f7a] w-[35%] sm:w-[50%] h-full fixed top-0 bottom-0 left-0 z-[1001]'
        onClick={() => setOpenSideBar(!openSideBar)}
      ></div>
      <div className='fixed top-0 bottom-0 right-0 w-[65%] sm:w-[50%] bg-[#0a0c0f] z-[1005]'>
        <div className='h-full overflow-x-hidden overflow-auto small-scrollbar'>
          <IoMdList
            className='text-white cursor-pointer mx-2 my-3'
            size={30}
            onClick={() => setOpenSideBar(!openSideBar)}
          />
          <Link
            to='/'
            className='block text-[17px] font-Poppins font-medium px-2 text-[#e0e0e0] h-[35px] cursor-pointer'
          >
            <span className='pl-1'>Trang chủ</span>
          </Link>

          <NavItems isMobileTablet={true} />

          <div className='w-full h-[36px] relative flex rounded-[4px] px-2 my-2'>
            <input
              type='search'
              className='w-full h-full pr-[40px] pl-[12px] rounded-[4px] bg-[#bebebe42] text-white size-[14px] overflow-hidden whitespace-nowrap text-ellipsis outline-none'
              autoComplete='off'
              placeholder='Tìm kiếm...'
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <BiSearch
              className='absolute right-[10px] top-[8px] flex align-center justify-center cursor-pointer'
              size={24}
              fill='#d8d2d1'
              onClick={handleSearch}
            />
          </div>

          {user ? (
            <div className='absolute bottom-0 right-0 left-0 border-t-[1px] border-[#00DC5A] py-2 bg-[#0a0c0f] px-2'>
              <div className='flex items-center gap-2 cursor-pointer' onClick={() => setOpenModal(!openModal)}>
                <img
                  src={user?.avatar?.url ? user?.avatar?.url : "../../public/defaultAvatar.png"}
                  alt='avatar'
                  className='w-[30px] h-[30px] object-cover rounded-full'
                />
                <span className='text-[17px] font-Poppins font-medium text-[#e0e0e0]'>{user?.name}</span>
              </div>

              {openModal && (
                <ul
                  className='absolute top-[-172px] left-[0px] sm:left-[10px] w-[220px] sm:w-[250px] py-1 bg-[#1a191f] flex flex-col'
                  style={{
                    borderTopColor: "#00dc5a",
                    borderTopWidth: "3px",
                    boxShadow: "inset 0 0 70px rgba(0, 0, 0, .3), 0 0 20px rgba(0, 0, 0, .5)",
                  }}
                >
                  <Link
                    to='/lich-su'
                    className='text-[16px] font-Poppins font-medium text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] hover:text-[#00dc5a] hover:border-l-[3px] hover:border-[#00DC5A] p-2 flex items-center gap-2 hover:bg-[#96969633]'
                  >
                    <FaHistory size={18} />
                    <span>Lịch sử xem phim</span>
                  </Link>
                  <Link
                    to={`/theo-doi`}
                    className='text-[16px] font-Poppins font-medium text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] hover:text-[#00dc5a] hover:border-l-[3px] hover:border-[#00DC5A] p-2 flex items-center gap-2 hover:bg-[#96969633]'
                  >
                    <FaRegBookmark />
                    <span>Phim đã lưu</span>
                  </Link>
                  <Link
                    to={`/trang-ca-nhan`}
                    className='text-[16px] font-Poppins font-medium text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] hover:text-[#00dc5a] hover:border-l-[3px] hover:border-[#00DC5A] p-2 flex items-center gap-2 hover:bg-[#96969633]'
                  >
                    <RiUserLine />
                    <span> Tài khoản của tôi</span>
                  </Link>
                  <div
                    className='text-[16px] font-Poppins font-medium text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] hover:text-[#00dc5a] hover:border-l-[3px] hover:border-[#00DC5A] p-2 flex items-center gap-2 hover:bg-[#96969633] cursor-pointer'
                    onClick={handleLogout}
                  >
                    <FaArrowRightFromBracket />
                    <span>Đăng xuất</span>
                  </div>
                </ul>
              )}
            </div>
          ) : (
            <div className='absolute bottom-0 right-0 left-0 border-t-[1px] border-[#00DC5A] py-2 bg-[#0a0c0f]'>
              <BiUser
                className='mx-4 text-white hover:text-[#00dc5a] cursor-pointer'
                size={30}
                onClick={() => {
                  setOpenSignUp(false);
                  setOpenLogin(!openLogin);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
