import { useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {};

export const navItemsData = [
  {
    name: "Phim Bộ",
    slug: "phim-bo",
  },
  {
    name: "Phim Lẻ",
    slug: "phim-le",
  },
  {
    name: "TV Shows",
    slug: "tv-shows",
  },
  {
    name: "Hoạt Hình",
    slug: "hoat-hinh",
  },
  {
    name: "Sắp chiếu",
    slug: "phim-sap-chieu",
  },
];

export const genreItemsData = [
  {
    name: "Hành Động",
    slug: "hanh-dong",
  },
  {
    name: "Tình Cảm",
    slug: "tinh-cam",
  },
  {
    name: "Hài Hước",
    slug: "hai-huoc",
  },
  {
    name: "Cổ Trang",
    slug: "co-trang",
  },
  {
    name: "Tâm Lý",
    slug: "tam-ly",
  },
  {
    name: "Hình Sự",
    slug: "hinh-su",
  },
  {
    name: "Chiến Tranh",
    slug: "chien-tranh",
  },
  {
    name: "Thể Thao",
    slug: "the-thao",
  },
  {
    name: "Võ Thuât",
    slug: "vo-thuat",
  },
  {
    name: "Viễn Tưởng",
    slug: "vien-tuong",
  },
  {
    name: "Phiêu Lưu",
    slug: "phieu-luu",
  },
  {
    name: "Khoa Học",
    slug: "khoa-hoc",
  },
  {
    name: "Kinh Dị",
    slug: "kinh-di",
  },
  {
    name: "Âm Nhạc",
    slug: "am-nhac",
  },
  {
    name: "Thần Thoại",
    slug: "than-thoai",
  },
  {
    name: "Tài Liệu",
    slug: "tai-lieu",
  },
  {
    name: "Gia Đình",
    slug: "gia-dinh",
  },
  {
    name: "Chính Kịch",
    slug: "chinh-kich",
  },
  {
    name: "Bí Ẩn",
    slug: "bi-an",
  },
  {
    name: "Học Đường",
    slug: "hoc-duong",
  },
  {
    name: "Kinh Điển",
    slug: "kinh-dien",
  },
  {
    name: "Phim 18+",
    slug: "phim-18",
  },
];

export const nationItemsData = [
  {
    name: "Trung Quốc",
    slug: "trung-quoc",
  },
  {
    name: "Hàn Quốc",
    slug: "han-quoc",
  },
  {
    name: "Nhật Bản",
    slug: "nhat-ban",
  },
  {
    name: "Thái Lan",
    slug: "thai-lan",
  },
  {
    name: "Âu Mỹ",
    slug: "au-my",
  },
  {
    name: "Đài Loan",
    slug: "dai-loan",
  },
  {
    name: "Hồng Kông",
    slug: "hong-kong",
  },
  {
    name: "Ấn Độ",
    slug: "an-do",
  },
  {
    name: "Anh",
    slug: "anh",
  },
  {
    name: "Pháp",
    slug: "phap",
  },
  {
    name: "Canada",
    slug: "canada",
  },
  {
    name: "Đức",
    slug: "duc",
  },
  {
    name: "Tây Ban Nha",
    slug: "tay-ban-nha",
  },
  {
    name: "Thổ Nhĩ Kỳ",
    slug: "tho-nhi-ky",
  },
  {
    name: "Hà Lan",
    slug: "ha-lan",
  },
  {
    name: "Indonesia",
    slug: "indonesia",
  },
  {
    name: "Nga",
    slug: "nga",
  },
  {
    name: "Mexico",
    slug: "mexico",
  },
  {
    name: "Ba Lan",
    slug: "ba-lan",
  },
  {
    name: "Úc",
    slug: "uc",
  },
  {
    name: "Thụy Điển",
    slug: "thuy-dien",
  },
  {
    name: "Malaysia",
    slug: "malaysia",
  },
  {
    name: "Brazil",
    slug: "brazil",
  },
  {
    name: "Philippines",
    slug: "philippines",
  },
  {
    name: "Bồ Đào Nha",
    slug: "bo-dao-nha",
  },
  {
    name: "Ý",
    slug: "y",
  },
  {
    name: "Đan Mạch",
    slug: "dan-mach",
  },
  {
    name: "UAE",
    slug: "uae",
  },
  {
    name: "Na Uy",
    slug: "na-uy",
  },
  {
    name: "Thụy Sỹ",
    slug: "thuy-sy",
  },
  {
    name: "Châu Phi",
    slug: "chau-phi",
  },
  {
    name: "Nam Phi",
    slug: "nam-phi",
  },
  {
    name: "Ukraina",
    slug: "ukraina",
  },
  {
    name: "Ả Rập Xê Út",
    slug: "a-rap-xe-ut",
  },
  {
    name: "Quốc Gia Khác",
    slug: "quoc-gia-khac",
  },
];

const NavItems = (props: Props) => {
  const [openCatModal, setOpenCatModal] = useState(false);
  const [openGenreModal, setOpenGenreModal] = useState(false);
  const [openNationModal, setOpenNationModal] = useState(false);

  return (
    <div className='flex items-center gap-[15px]'>
      {navItemsData.map((nav) => (
        <Link
          to={`/danh-sach/${nav.slug}?page=1`}
          className='hidden xl:block text-[17px] font-Poppins font-medium text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] hover:text-[#00dc5a]'
        >
          {nav.name}
        </Link>
      ))}

      <div
        className='flex xl:hidden items-center relative cursor-pointer text-[17px] font-Poppins font-medium text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] pr-4'
        onClick={() => {
          setOpenGenreModal(false);
          setOpenNationModal(false);
          setOpenCatModal(!openCatModal);
        }}
      >
        <span>Danh Sách</span>
        <FaSortDown fill='#00dc5a' className='absolute top-[2px] right-[-2px]' />

        {openCatModal && (
          <>
            <FaSortUp className='absolute top-[25px] left-[5px]' fill='#00dc5a' />
            <ul
              className='absolute top-[32px] left-[0px] w-[350px] py-1 px-2 bg-[#1a191f] grid grid-cols-3 justify-items-center'
              style={{
                borderTopColor: "#00dc5a",
                borderTopWidth: "3px",
                boxShadow: "inset 0 0 70px rgba(0, 0, 0, .3), 0 0 20px rgba(0, 0, 0, .5)",
              }}
            >
              {navItemsData.map((nav) => (
                <Link
                  to={`/danh-sach/${nav.slug}?page=1`}
                  className='block text-[16px] font-Poppins font-medium text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] hover:text-[#00dc5a] p-2 text-left'
                >
                  {nav.name}
                </Link>
              ))}
            </ul>
          </>
        )}
      </div>

      <div
        className='flex items-center relative cursor-pointer text-[17px] font-Poppins font-medium text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] pr-4'
        onClick={() => {
          setOpenCatModal(false);
          setOpenNationModal(false);
          setOpenGenreModal(!openGenreModal);
        }}
      >
        <span>Thể Loại</span>
        <FaSortDown fill='#00dc5a' className='absolute top-[2px] right-[-2px]' />

        {openGenreModal && (
          <>
            <FaSortUp className='absolute top-[25px] left-[5px]' fill='#00dc5a' />
            <ul
              className='absolute top-[32px] left-[0px] w-[350px] py-1 px-2 bg-[#1a191f] grid grid-cols-3 justify-items-center'
              style={{
                borderTopColor: "#00dc5a",
                borderTopWidth: "3px",
                boxShadow: "inset 0 0 70px rgba(0, 0, 0, .3), 0 0 20px rgba(0, 0, 0, .5)",
              }}
            >
              {genreItemsData.map((genre) => (
                <Link
                  to={`/the-loai/${genre.slug}?page=1`}
                  className='text-[16px] font-Poppins font-medium text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] hover:text-[#00dc5a] p-2 text-left'
                >
                  {genre.name}
                </Link>
              ))}
            </ul>
          </>
        )}
      </div>

      <div
        className='flex items-center relative cursor-pointer text-[17px] font-Poppins font-medium text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] pr-4'
        onClick={() => {
          setOpenCatModal(false);
          setOpenGenreModal(false);
          setOpenNationModal(!openNationModal);
        }}
      >
        <span>Quốc Gia</span>
        <FaSortDown fill='#00dc5a' className='absolute top-[2px] right-[-2px]' />

        {openNationModal && (
          <>
            <FaSortUp className='absolute top-[25px] left-[5px]' fill='#00dc5a' />
            <ul
              className='absolute top-[32px] left-[0px] w-[420px] py-1 px-2 bg-[#1a191f] grid grid-cols-3 justify-items-center'
              style={{
                borderTopColor: "#00dc5a",
                borderTopWidth: "3px",
                boxShadow: "inset 0 0 70px rgba(0, 0, 0, .3), 0 0 20px rgba(0, 0, 0, .5)",
              }}
            >
              {nationItemsData.map((nation) => (
                <Link
                  to={`/quoc-gia/${nation.slug}?page=1`}
                  className='text-[16px] font-Poppins font-medium text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] hover:text-[#00dc5a] p-2 text-left'
                >
                  {nation.name}
                </Link>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default NavItems;
