import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiHistory, BiSearch, BiUser } from "react-icons/bi";
import { FaSortDown } from "react-icons/fa";

type Props = {};

const Header = (props: Props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 80);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <header className='w-full relative'>
      <div
        className={`${
          active
            ? "dark:bg-[#0a0c0f] bg-white fixed top-0 left-0 w-full h-[60px] z-[9999] transition duration-500 ease-linear"
            : "w-full fixed top-0 left-0 h-[60px] z-[9999]"
        }`}
      >
        <div className='w-[95%] 800px:w-[92%] m-auto h-full overflow-hidden'>
          <div className='w-full h-[60px] flex items-center justify-between p-3 overflow-hidden'>
            <div className='flex items-center gap-[24px]'>
              <Link to='/' className={`text-[25px] font-Poppins font-[500] text-[#00dc5a]`}>
                MOVIEAPP
              </Link>

              <Link to='/' className='text-[18px] font-Poppins text-white hover:text-[#00dc5a]'>
                For You
              </Link>
              <Link to='/' className='text-[18px] font-Poppins text-white hover:text-[#00dc5a]'>
                Drama
              </Link>
              <div className='flex items-center relative cursor-pointer text-[18px] font-Poppins text-white'>
                <span>More</span>
                <FaSortDown />
              </div>
            </div>

            <div className='flex items-center'>
              <div className='w-[240px] h-[36px] relative flex rounded-[4px]'>
                <input
                  type='search'
                  className='w-full h-full pr-[54px] pl-[12px] rounded-[4px] bg-[#ffffff33] text-[#ffffff99] size-[14px] overflow-hidden whitespace-nowrap text-ellipsis'
                  autoComplete='off'
                  placeholder='Search...'
                />
                <BiSearch
                  className='absolute right-[11px] top-[5px] flex align-center justify-center cursor-pointer'
                  size={24}
                  fill='#d8d2d1'
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
