import { useState } from "react";
import { styles } from "../styles/style";
import { BiMessage } from "react-icons/bi";

type Props = {};

const Comment = (props: Props) => {
  const [question, setQuestion] = useState("");

  return (
    <div className='w-[90%] m-auto py-3'>
      <p className='text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] text-[18px] font-semibold pb-2'>Bình luận:</p>
      <div>
        <div className='flex w-full'>
          <img
            src='https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png'
            alt='avatar'
            className='w-[50px] h-[50px] object-cover rounded-full'
          />
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            cols={40}
            rows={5}
            placeholder='Viết bình luận...'
            className='outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins text-white'
          ></textarea>
        </div>
        <div className='w-full flex justify-end'>
          <div className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 text-white`}>Gửi</div>
        </div>

        <div className='w-full my-2'>
          <div className='flex mb-1'>
            <div>
              <img
                src='https://res.cloudinary.com/datnguyen240/image/upload/v1722168751/avatars/avatar_pnncdk.png'
                alt='avatar'
                className='w-[40px] h-[40px] object-cover rounded-full'
              />
            </div>
            <div className='pl-3 dark:text-white text-black'>
              <h5 className='text-[20px]'>Đạt Nguyễn</h5>
              <p>Phim hay</p>
            </div>
          </div>
          <div className='flex w-full items-center'>
            <span className='800px:pl-12 text-[#000000b8] dark:text-[#ffffff83] cursor-pointer mr-2'>Phản hồi</span>
            <BiMessage className='cursor-pointer' size={20} fill='#ffffff83' />
            <span className='pl-1 mt-[-4px] cursor-pointer text-[#000000b8] dark:text-[#ffffff83]'>0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
