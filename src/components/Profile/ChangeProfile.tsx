import { FC, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useEditProfileMutation, useUpdateAvatarMutation } from "../../features/user/userApi";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import Heading from "../Heading";
import { styles } from "../../styles/style";
import Header from "../Header/Header";

type Props = {
  user: {
    name: string;
    email: string;
    avatar?: { url: string };
  };
  setEditInfo: (editInfo: boolean) => void;
};

const ChangeProfile: FC<Props> = ({ user, setEditInfo }) => {
  const [name, setName] = useState(user?.name);

  const [updateAvatar, { isSuccess: isAvatarSuccess, error: avatarError }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: isProfileSuccess, error: profileError }] = useEditProfileMutation();

  const imageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          const avatar = fileReader.result as string;
          updateAvatar(avatar);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isAvatarSuccess) {
      toast.success("Cập nhật ảnh đại diện thành công!");
    }
    if (avatarError || profileError) {
      console.error(avatarError || profileError);
    }
    if (isProfileSuccess) {
      toast.success("Cập nhật thông tin thành công!");
    }
  }, [isAvatarSuccess, avatarError, isProfileSuccess, profileError]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      editProfile({ name });
    }
  };

  return (
    <div>
      <Heading title='Hồ sơ cá nhân' description='' keywords='' icon='../../public/favicon.ico' />
      <Header isProfile={true} />

      <div className='bg-[#1a1c22] w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] h-max p-3 mx-auto mt-[70px]'>
        <h1 className='text-[#fff] font-bold text-[22px] mobile-m:text-[26px] mb-2'>Quản lý tài khoản</h1>

        <div className='flex text-white font-medium text-[13px] mobile-m:text-[16px]'>
          <span
            className={`text-[#fff] cursor-pointer py-1 px-2 mobile-m:px-3 hover:bg-[#ffffff2c]
            }`}
            style={{
              borderBottom: "#00dc5a 3px solid",
            }}
            onClick={() => setEditInfo(false)}
          >
            Chỉnh sửa thông tin
          </span>
          <span
            className={`text-[#ffffff85] cursor-pointer py-1 px-2 mobile-m:px-3 hover:bg-[#ffffff2c] `}
            onClick={() => setEditInfo(true)}
          >
            Cài đặt tài khoản
          </span>
        </div>

        <div className='mt-3'>
          <h3 className='text-[#fff] text-[18px] mobile-m:text-[20px] font-medium mb-2'>Thông tin cá nhân</h3>

          <div className='w-full flex justify-center'>
            <div className='relative'>
              <img
                src={user?.avatar?.url || "../../../public/defaultAvatar.png"}
                alt='User Avatar'
                className='w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full'
              />
              <input
                type='file'
                id='avatar'
                className='hidden'
                onChange={imageHandler}
                accept='image/jpg,image/png,image/jpeg,image/webp'
              />
              <label htmlFor='avatar'>
                <div className='w-[32px] h-[32px] bg-[#e0e0e0] rounded-full absolute bottom-1 right-2 flex items-center justify-center cursor-pointer border-[1px] border-[#afafaf]'>
                  <AiOutlineCamera size={20} />
                </div>
              </label>
            </div>
          </div>

          <div className='w-full pl-2 mobile-l:pl-4 sm:pl-5 '>
            <form onSubmit={handleSubmit}>
              <div className='m-auto block pb-4 text-[#fff]'>
                <div className='w-full mb-4'>
                  <label className='block pb-2'>Họ và tên</label>
                  <input
                    type='text'
                    className={`${styles.input} !w-[95%] !text-[#fff]`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='w-full pt-2'>
                  <label className='block pb-2'>Email</label>
                  <input
                    type='text'
                    readOnly
                    className={`${styles.input} !w-[95%] !text-[#fff]`}
                    required
                    value={user?.email}
                  />
                </div>
                <input
                  type='submit'
                  value='Cập nhật'
                  className='w-[40%] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer'
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfile;
