import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../styles/style";
import toast from "react-hot-toast";
import { useLoginMutation } from "../../features/auth/authApi";
import { IoClose } from "react-icons/io5";

type Props = {
  setOpenLogin: (openLogin: boolean) => void;
  setOpenSignUp: (openSignUp: boolean) => void;
};

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Login: FC<Props> = ({ setOpenLogin, setOpenSignUp }) => {
  const [show, setShow] = useState(false);

  const [login, { isSuccess, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Đăng nhập thành công!");
      setOpenLogin(false);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error;
        toast.error(errorData.data.message);
      } else {
        console.log("An error occurred:", error);
      }
    }
  }, [isSuccess, error, setOpenLogin]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className='w-full'>
      <h1 className={styles.title}>Đăng Nhập</h1>
      <form onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor='email'>
          Email
        </label>
        <input
          type='email'
          name='email'
          value={values.email}
          onChange={handleChange}
          id='email'
          placeholder=''
          className={`${errors.email && touched.email ? "border-red-500" : ""} ${styles.input}`}
        />
        {errors.email && touched.email && <span className='text-red-500 pt-2 block'>{errors.email}</span>}
        <div className='w-full mt-5 relative mb-1'>
          <label className={styles.label} htmlFor='password'>
            Mật khẩu
          </label>
          <input
            type={!show ? "password" : "text"}
            name='password'
            value={values.password}
            onChange={handleChange}
            id='password'
            placeholder=''
            className={`${errors.password && touched.password ? "border-red-500" : ""} ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className='absolute bottom-3 right-2 z-10 cursor-pointer text-black'
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className='absolute bottom-3 right-2 z-10 cursor-pointer text-black'
              size={20}
              onClick={() => setShow(false)}
            />
          )}
          {errors.password && touched.password && <span className='text-red-500 pt-2 block'>{errors.password}</span>}
        </div>
        <div className='w-full mt-5'>
          <input type='submit' value='Đăng nhập' className={`${styles.button} hover:bg-[#11ff74] text-white`} />
        </div>

        {/* <div className='relative py-3 mt-3'>
          <h5 className='absolute top-[0px] left-[35%] text-center bg-[#f8f8f8] font-Poppins text-[14px] text-black'>
            Hoặc đăng nhập bằng
          </h5>
          <div className='w-full h-[1px] bg-[#ccc]'></div>
        </div>

        <div className='flex items-center justify-center my-3'>
          <div className={`${styles.button} text-white cursor-pointer mr-2 bg-slate-200`}>
            <FcGoogle size={30} />
            <span className='text-black ml-2'>Đăng nhập bằng Google</span>
          </div>
        </div> */}
        <h5 className='text-center pt-4 font-Poppins text-[14px] text-black'>
          Chưa có tài khoản?
          <span
            className='text-[#1cc749] pl-1 cursor-pointer'
            onClick={() => {
              setOpenLogin(false);
              setOpenSignUp(true);
            }}
          >
            Đăng Ký
          </span>
        </h5>
      </form>

      <div className='absolute top-[-15px] right-[-15px] w-[35px] h-[35px] rounded-full bg-[#e0e0e0] hover:bg-[#d3d3d3] text-[#636363] flex items-center justify-center cursor-pointer'>
        <IoClose
          className='text-[25px]'
          onClick={() => {
            setOpenLogin(false);
            setOpenSignUp(false);
          }}
        />
      </div>
    </div>
  );
};

export default Login;
