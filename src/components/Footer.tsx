import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='w-full relative pt-5'>
      <div className='dark:bg-[#0a0c0f] bg-white border border-[#0000000e] dark:border-[#ffffff1e] sticky bottom-0 left-0 right-0'>
        <br />
        <div className='w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 ms:px-6 lg-px-8'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4'>
            <div className='space-y-3'>
              <h3 className='text-[18px] font-[600] text-black dark:text-white'>About</h3>
              <ul className='space-y-4'>
                <li>
                  <Link to='' className='text-[14px] text-black dark:text-gray-300 dark:hover:text-white'>
                    About us
                  </Link>
                </li>
                <li>
                  <Link to='' className='text-[14px] text-black dark:text-gray-300 dark:hover:text-white'>
                    Products and Service
                  </Link>
                </li>
                <li>
                  <Link to='' className='text-[14px] text-black dark:text-gray-300 dark:hover:text-white'>
                    Ways to Watch
                  </Link>
                </li>
              </ul>
            </div>

            <div className='space-y-3'>
              <h3 className='text-[18px] font-[600] text-black dark:text-white'>Cooperation</h3>
              <ul className='space-y-4'>
                <li>
                  <Link to='' className='text-[14px] text-black dark:text-gray-300 dark:hover:text-white'>
                    Advertise
                  </Link>
                </li>
                <li>
                  <Link to='' className='text-[14px] text-black dark:text-gray-300 dark:hover:text-white'>
                    Corporate relations
                  </Link>
                </li>
              </ul>
            </div>

            <div className='space-y-3'>
              <h3 className='text-[18px] font-[600] text-black dark:text-white'>Help and support</h3>
              <ul className='space-y-4'>
                <li>
                  <Link to='' className='text-[14px] text-black dark:text-gray-300 dark:hover:text-white'>
                    Feedback
                  </Link>
                </li>
                <li>
                  <Link to='' className='text-[14px] text-black dark:text-gray-300 dark:hover:text-white'>
                    Security Response Center
                  </Link>
                </li>
                <li>
                  <Link to='' className='text-[14px] text-black dark:text-gray-300 dark:hover:text-white'>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className='space-y-3'>
              <h3 className='text-[18px] font-[600] text-black dark:text-white'>Terms of Service</h3>
              <ul className='space-y-4'>
                <li>
                  <Link to='' className='text-[14px] text-black dark:text-gray-300 dark:hover:text-white'>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to='' className='text-[14px] text-black dark:text-gray-300 dark:hover:text-white'>
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <br />
      </div>
    </footer>
  );
};

export default Footer;
