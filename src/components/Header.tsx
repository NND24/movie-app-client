import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiHistory, BiSearch, BiUser } from "react-icons/bi";
import NavItems from "./NavItems";

const Header = () => {
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 80);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handelSearch = () => {
    navigate(`/tim-kiem/${search}?page=1`);
  };

  return (
    <header className='w-full relative'>
      <div
        className={`${
          active
            ? "bg-[#0a0c0f] fixed top-0 left-0 w-full h-[60px] z-[9999] transition duration-500 ease-in-out"
            : "w-full fixed top-0 left-0 h-[60px] z-[1000]"
        }`}
      >
        <div className='w-[95%] 800px:w-[92%] m-auto h-full'>
          <div className='w-full h-[60px] flex items-center justify-between p-3'>
            <div className='flex items-center gap-[20px]'>
              <Link
                to='/'
                className={`text-[25px] font-Poppins font-bold drop-shadow-[1px_1px_1px_#000] text-[#00dc5a]`}
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
                  placeholder='Search...'
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

              <BiHistory className='mx-4 text-white hover:text-[#00dc5a] cursor-pointer' size={25} />
              <BiUser className='mx-4 text-white hover:text-[#00dc5a] cursor-pointer' size={25} />
              {/* <ThemeSwitcher /> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
