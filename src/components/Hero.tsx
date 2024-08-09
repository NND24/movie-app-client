import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { FaPlay } from "react-icons/fa";

type Props = {};

const Hero = (props: Props) => {
  const data = {
    status: true,
    msg: "",
    movie: {
      created: {
        time: "2023-09-07T01:03:10.000Z",
      },
      modified: {
        time: "2023-09-07T18:30:43.000Z",
      },
      _id: "1679091c5a880faf6fb5e6087eb1b2dc",
      name: "Khi Anh Chạy Về Phía Em",
      slug: "khi-anh-chay-ve-phia-em",
      origin_name: "When I Fly Towards You",
      content:
        "Vào đầu mùa thu năm 2012, một trường trung học phổ thông trọng điểm của thành phố Z mở kì thi tuyển học sinh mới, Tô Tại Tại đã trúng tuyển và được bước chân vào ngôi trường. Vào ngày đầu tiên đi học, Trương Lục Nhượng đã thu hút sự chú ý của Tô Tại Tại, khiến cô đã “Yêu ngay từ cái nhìn đầu tiên”. Nhờ sự ấm áp như ánh mặt trời của mình, Tô Tại Tại đã giúp Trương Lục Nhượng thoát khỏi sự tự ti. Còn Tô Tại Tại, người luôn đi theo số đông mà không biết kế hoạch, mục tiêu của mình là gì, dưới tác động của học bá Trương Lục Nhượng, cô dần dần hiểu ra cách lập kế hoạch và mục tiêu cho cuộc đời mình. Câu chuyện cho ta thấy ý nghĩa của sự thiếu hiểu trong tuổi trẻ và dần từ từ tiến đến một tương lai tươi sáng, tốt đẹp hơn.",
      type: "series",
      status: "completed",
      poster_url: "https://phimimg.com/upload/vod/20230929-1/a6110983f8de490e116383020adc4662.jpg",
      thumb_url: "https://phimimg.com/upload/vod/20230929-1/e7e0790c8f05fe27a758d37bf5c1fd90.jpg",
      is_copyright: false,
      sub_docquyen: false,
      chieurap: false,
      trailer_url: "",
      time: "30 phút/tập",
      episode_current: "Hoàn Tất (24/24)",
      episode_total: "24",
      quality: "HD",
      lang: "Vietsub",
      notify: "",
      showtimes: "",
      year: 2023,
      view: 0,
      actor: ["Zhou Yi Ran", "Miaoyi Zhang", "ZhiNan Jiang", "Bian Tianyang"],
      director: ["Đang cập nhật"],
      category: [
        {
          id: "bb2b4b030608ca5984c8dd0770f5b40b",
          name: "Tình Cảm",
          slug: "tinh-cam",
        },
      ],
      country: [
        {
          id: "3e075636c731fe0f889c69e0bf82c083",
          name: "Trung Quốc",
          slug: "trung-quoc",
        },
      ],
    },
  };

  return (
    <div className='min-h-screen'>
      <div className='relative overflow-hidden max-h-[1012px] !h-[52vw] cursor-pointer mb-[-15.5%]'>
        <div className='max-h-[1012px] !h-[52vw]'>
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className='mySwiper'
          >
            <SwiperSlide className='transition duration-700 ease-in-out transform'>
              <img
                src='https://phimimg.com/upload/vod/20230929-1/e7e0790c8f05fe27a758d37bf5c1fd90.jpg'
                alt='Movie Thumbnail'
                className='w-full h-full object-cover'
              />

              <div className='absolute left-[64px] bottom-[calc(10%+24px+3.5vw)] flex flex-col items-start w-[50%]'>
                <h5 className='font-medium size-[35px] w-full text-left text-white'>{data.movie.name}</h5>
                <div className='text-white'>
                  <span>{data.movie.year}</span>
                  <span className='px-1 h-[6px]'>|</span>
                  <span>{data.movie.episode_current}</span>
                </div>
                <div className='flex gap-[8px] mt-[12px] flex-wrap w-full'>
                  {data.movie.category.map((cat) => (
                    <span className='px-[6px] rounded-[2px] color-[#ececec] bg-[#ffffff14] text-[14px] font-medium text-white w-max h-full shadow-[rgba(0,0,0,0.5)_0px_1px_2px]'>
                      {cat.name}
                    </span>
                  ))}
                </div>
                <p className='line-clamp-2 text-left mt-[12px] text-white'>{data.movie.content}</p>
              </div>

              <div className='absolute bottom-[10%] left-[64px] flex justify-between gap-[20px]'>
                <button className='w-[36px] h-[36px] rounded-full bg-[#1cc749] hover:bg-[#3bf56d] flex items-center justify-center'>
                  <FaPlay className='text-white' size={15} />
                </button>
                <button className='w-[36px] h-[36px] rounded-full bg-[#e4e0d9] hover:bg-[#ffffff] flex items-center justify-center'>
                  <MdOutlineBookmarkAdd className='text-[#111319]' size={21} />
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide className='transition duration-700 ease-in-out transform'>
              <img
                src='https://phimimg.com/upload/vod/20230929-1/e7e0790c8f05fe27a758d37bf5c1fd90.jpg'
                alt='Movie Thumbnail'
                className='w-full h-full object-cover'
              />

              <div className='absolute left-[64px] bottom-[calc(10%+24px+3.5vw)] flex flex-col items-start w-[50%]'>
                <h5 className='font-medium size-[35px] w-full text-left text-white'>{data.movie.name}</h5>
                <div className='text-white'>
                  <span>{data.movie.year}</span>
                  <span className='px-1 h-[6px]'>|</span>
                  <span>{data.movie.episode_current}</span>
                </div>
                <div className='flex gap-[8px] mt-[12px] flex-wrap w-full'>
                  {data.movie.category.map((cat) => (
                    <span className='px-[6px] rounded-[2px] color-[#ececec] bg-[#ffffff14] text-[14px] font-medium text-white w-max h-full shadow-[rgba(0,0,0,0.5)_0px_1px_2px]'>
                      {cat.name}
                    </span>
                  ))}
                </div>
                <p className='line-clamp-2 text-left mt-[12px] text-white'>{data.movie.content}</p>
              </div>

              <div className='absolute bottom-[10%] left-[64px] flex justify-between gap-[20px]'>
                <button className='w-[36px] h-[36px] rounded-full bg-[#1cc749] hover:bg-[#3bf56d] flex items-center justify-center'>
                  <FaPlay className='text-white' size={15} />
                </button>
                <button className='w-[36px] h-[36px] rounded-full bg-[#e4e0d9] hover:bg-[#ffffff] flex items-center justify-center'>
                  <MdOutlineBookmarkAdd className='text-[#111319]' size={21} />
                </button>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Hero;
