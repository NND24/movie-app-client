import { AiOutlineCamera } from "react-icons/ai";
import Header from "../components/Header";
import Heading from "../components/Heading";
import { useState } from "react";
import { styles } from "../styles/style";

type Props = {};

const Profile = (props: Props) => {
  const [editInfo, setEditInfo] = useState(false);
  const [name, setName] = useState("");

  const imageHandler = async (e) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        // updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name != "") {
    }
  };

  return (
    <>
      {editInfo ? (
        <div>
          <Heading title='Mật khẩu' description='' keywords='' icon='../../public/favicon.ico' />
          <Header isProfile={true} />

          <div className='bg-[#1a1c22] w-[50%] h-max p-3 mx-auto mt-[70px]'>
            <h1 className='text-[#fff] font-bold text-[26px] mb-2'>Quản lý tài khoản</h1>

            <div className='flex text-white font-medium text-[16px]'>
              <span
                className='text-[#ffffff85] cursor-pointer py-1 px-3 hover:bg-[#ffffff2c]'
                onClick={() => setEditInfo(false)}
              >
                Chỉnh sửa thông tin
              </span>
              <span
                className='text-[#fff] cursor-pointer py-1 px-3 hover:bg-[#ffffff2c]'
                onClick={() => setEditInfo(true)}
                style={{
                  borderBottom: "#00dc5a 3px solid",
                }}
              >
                Cài đặt tài khoản
              </span>
            </div>

            <div className='mt-3'>
              <h3 className='text-[#fff] text-[20px] font-medium'>Đổi mật khẩu</h3>

              <div className='w-full pl-6 800px:pl-10 pt-3'>
                <form onSubmit={handleSubmit}>
                  <div className='m-auto block pb-4 text-[#fff]'>
                    <div className='w-[100%]'>
                      <label className='block pb-1'>Mật khẩu hiện tại</label>
                      <input
                        type='text'
                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-[#fff]`}
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className='w-[100%] pt-3'>
                      <label className='block pb-1'>Mật khẩu mới</label>
                      <input
                        type='text'
                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-[#fff]`}
                        required
                        value=''
                      />
                    </div>
                    <div className='w-[100%] pt-3'>
                      <label className='block pb-1'>Nhập lại mật khẩu</label>
                      <input
                        type='text'
                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-[#fff]`}
                        required
                        value=''
                      />
                    </div>
                    <input
                      type='submit'
                      value='Cập nhật'
                      required
                      className='w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer'
                    />
                  </div>
                </form>
              </div>
            </div>

            <br />
          </div>
        </div>
      ) : (
        <div>
          <Heading title='Hồ sơ cá nhân' description='' keywords='' icon='../../public/favicon.ico' />
          <Header isProfile={true} />

          <div className='bg-[#1a1c22] w-[50%] h-max p-3 mx-auto mt-[70px]'>
            <h1 className='text-[#fff] font-bold text-[26px] mb-2'>Quản lý tài khoản</h1>

            <div className='flex text-white font-medium text-[16px]'>
              <span
                className='text-[#fff] cursor-pointer py-1 px-3 hover:bg-[#ffffff2c]'
                style={{
                  borderBottom: "#00dc5a 3px solid",
                }}
                onClick={() => setEditInfo(false)}
              >
                Chỉnh sửa thông tin
              </span>
              <span
                className='text-[#ffffff85] cursor-pointer py-1 px-3 hover:bg-[#ffffff2c]'
                onClick={() => setEditInfo(true)}
              >
                Cài đặt tài khoản
              </span>
            </div>

            <div className='mt-3'>
              <h3 className='text-[#fff] text-[20px] font-medium'>Thông tin cá nhân</h3>

              <div className='w-full flex justify-center'>
                <div className='relative'>
                  <img
                    src='https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png'
                    alt=''
                    className='w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full'
                  />
                  <input
                    type='file'
                    name=''
                    id='avatar'
                    className='hidden'
                    onChange={imageHandler}
                    accept='image/jpg,image/png,image/jpeg,image/webp'
                  />
                  <label htmlFor='avatar'>
                    <div className='w-[30px] h-[30px] bg-[#ccc] rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer'>
                      <AiOutlineCamera size={20} className='z-1' />
                    </div>
                  </label>
                </div>
              </div>

              <div className='w-full pl-6 800px:pl-10'>
                <form onSubmit={handleSubmit}>
                  <div className='m-auto block pb-4 text-[#fff]'>
                    <div className='w-[100%]'>
                      <label className='block pb-2'>Họ và tên</label>
                      <input
                        type='text'
                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-[#fff]`}
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className='w-[100%] pt-2'>
                      <label className='block pb-2 '>Email</label>
                      <input
                        type='text'
                        readOnly
                        className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-[#fff]`}
                        required
                        value=''
                      />
                    </div>
                    <input
                      type='submit'
                      value='Cập nhật'
                      required
                      className='w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer'
                    />
                  </div>
                </form>
              </div>
            </div>

            <br />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
