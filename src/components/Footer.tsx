import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className='dark:bg-[#0a0c0f] bg-white border border-[#0000000e] dark:border-[#ffffff1e]'>
        <br />
        <div className='w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 ms:px-6 lg-px-8'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4'>
            <div className='space-y-3'>
              <h3 className='text-[20px] font-[600] text-black dark:text-white'>About</h3>
              <ul className='space-y-4'>
                <li>
                  <Link to='/about' className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link to='/privacy-policy' className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to='/faq' className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className='space-y-3'>
              <h3 className='text-[20px] font-[600] text-black dark:text-white'>Quick Links</h3>
              <ul className='space-y-4'>
                <li>
                  <Link to='/courses' className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                    Courses
                  </Link>
                </li>
                <li>
                  <Link to='/profile' className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to='/course-dashboard'
                    className='text-base text-black dark:text-gray-300 dark:hover:text-white'
                  >
                    Course Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div className='space-y-3'>
              <h3 className='text-[20px] font-[600] text-black dark:text-white'>Social Links</h3>
              <ul className='space-y-4'>
                <li>
                  <Link to='' className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                    Youtube
                  </Link>
                </li>
                <li>
                  <Link to='' className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link to='' className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                    Github
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-[20px] font-[600] text-black dark:text-white pb-2'>Contact Info</h3>
              <p className='text-base text-black dark:text-gray-300 dark:hover:text-white pb-2'>Call us: 0123456789</p>
              <p className='text-base text-black dark:text-gray-300 dark:hover:text-white pb-2'>Address: 0123456789</p>
              <p className='text-base text-black dark:text-gray-300 dark:hover:text-white pb-2'>Mail us: 0123456789</p>
            </div>
          </div>
        </div>
        <br />
      </div>
    </footer>
  );
};

export default Footer;
