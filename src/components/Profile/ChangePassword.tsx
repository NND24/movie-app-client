import { FC, useEffect, useState } from "react";
import { useUpdatePasswordMutation } from "../../features/user/userApi";
import toast from "react-hot-toast";
import Heading from "../Heading";
import Header from "../Header";
import { styles } from "../../styles/style";

type Props = {
  setEditInfo: (editInfo: boolean) => void;
};

const ChangePassword: FC<Props> = ({ setEditInfo }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu không trùng khớp!");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Đổi mật khẩu thành công!");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
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
            style={{
              borderBottom: "#00dc5a 3px solid",
            }}
            onClick={() => setEditInfo(true)}
          >
            Cài đặt tài khoản
          </span>
        </div>

        <div className='mt-3'>
          <h3 className='text-[#fff] text-[20px] font-medium'>Đổi mật khẩu</h3>

          <div className='w-full pl-6 800px:pl-10 pt-3'>
            <form onSubmit={passwordChangeHandler}>
              <div className='m-auto block pb-4 text-[#fff]'>
                <div className='w-[100%]'>
                  <label className='block pb-1'>Mật khẩu hiện tại</label>
                  <input
                    type='password'
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 !text-[#fff]`}
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className='w-[100%] pt-3'>
                  <label className='block pb-1'>Mật khẩu mới</label>
                  <input
                    type='password'
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 !text-[#fff]`}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className='w-[100%] pt-3'>
                  <label className='block pb-1'>Nhập lại mật khẩu</label>
                  <input
                    type='password'
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0 !text-[#fff]`}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
  );
};

export default ChangePassword;
