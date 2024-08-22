import { FC, useEffect, useState } from "react";
import { styles } from "../styles/style";
import { BiMessage } from "react-icons/bi";
import { useAddNewAnswerMutation, useAddNewCommentMutation, useGetCommentQuery } from "../features/comment/commentApi";
import { format } from "timeago.js";
import toast from "react-hot-toast";
import { VscVerifiedFilled } from "react-icons/vsc";

type Props = {
  slug: string;
};

const Comment: FC<Props> = ({ slug }) => {
  const { data, refetch } = useGetCommentQuery(slug, { refetchOnMountOrArgChange: true });

  const [comment, setComment] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [activeReply, setActiveReply] = useState<string | null>(null);
  const [commentId, setCommentId] = useState("");

  const [addNewComment, { isLoading: commentCreationLoading, error, isSuccess }] = useAddNewCommentMutation();
  const [addNewAnswer, { isSuccess: answerSuccess, error: answerError, isLoading: answerCreationLoading }] =
    useAddNewAnswerMutation();

  const handleCommentSubmit = async () => {
    if (comment.length === 0) {
      toast.error("Bình luận không được để trống");
    } else {
      await addNewComment({ slug, comment });
    }
  };

  const handleAnswerSubmit = async () => {
    if (answers[commentId]?.length === 0) {
      toast.error("Phản hồi không được để trống");
    } else if (commentId) {
      await addNewAnswer({ slug, answer: answers[commentId], commentId });
    }
  };

  const toggleReplyActive = (id: string) => {
    if (activeReply === id) {
      // If the same reply is clicked again, close it
      setActiveReply(null);
      setCommentId("");
    } else {
      // Close other reply sections and clear their inputs
      setActiveReply(id);
      setAnswers((prevState) => ({
        ...prevState,
        [commentId]: "",
      }));
      setCommentId(id);
    }
  };

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  useEffect(() => {
    if (isSuccess) {
      setComment("");
      refetch();
    }
    if (answerSuccess) {
      setAnswers((prevState) => ({
        ...prevState,
        [commentId]: "",
      }));
      refetch();
    }
  }, [isSuccess, error, answerSuccess, answerError, data, refetch, commentId]);

  return (
    <div className='w-[90%] m-auto py-3'>
      <p className='text-[#e0e0e0] drop-shadow-[1px_1px_1px_#000] text-[18px] font-semibold pb-2'>Bình luận:</p>
      <div>
        <div className='flex w-full'>
          <img
            src='../../public/defaultAvatar.png'
            alt='avatar'
            className='w-[50px] h-[50px] object-cover rounded-full'
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            cols={40}
            rows={5}
            placeholder='Viết bình luận...'
            className='outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins text-white'
          ></textarea>
        </div>
        <div className='w-full flex justify-end'>
          <div
            className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 text-white ${
              commentCreationLoading && "cursor-no-drop"
            }`}
            onClick={commentCreationLoading ? () => {} : handleCommentSubmit}
          >
            Gửi
          </div>
        </div>

        <div className='w-full my-2'>
          {data?.comments.map((comment) => (
            <div key={comment._id} className='mb-2'>
              <div className='flex mb-1'>
                <div>
                  <img
                    src={comment?.user?.avatar ? comment?.user?.avatar?.url : "../../public/defaultAvatar.png"}
                    alt='avatar'
                    className='w-[40px] h-[40px] object-cover rounded-full'
                  />
                </div>
                <div className='pl-3 text-white '>
                  <h5 className='text-[20px]'>{comment?.user?.name}</h5>
                  <p>{comment?.comment}</p>
                  <small className='text-[#ffffff83]'>{!comment.createdAt ? "" : format(comment?.createdAt)}</small>
                </div>
              </div>
              <div className='flex w-full items-center'>
                <span
                  className='800px:pl-12 text-[#ffffff83] cursor-pointer mr-2'
                  onClick={() => toggleReplyActive(comment._id)}
                >
                  {activeReply !== comment._id
                    ? comment.commentReplies.length !== 0
                      ? "Tất cả phản hồi"
                      : "Phản hồi"
                    : "Ẩn phản hồi"}
                </span>
                <BiMessage className='cursor-pointer' size={20} fill='#ffffff83' />
                <span className='pl-1 mt-[-4px] cursor-pointer text-[#ffffff83]'>{comment?.commentReplies.length}</span>
              </div>
              {activeReply === comment._id && (
                <>
                  {comment.commentReplies.map((item) => (
                    <div key={item._id} className='w-full flex 800px:ml-16 my-5  text-white'>
                      <div>
                        <img
                          src={item?.user?.avatar ? item?.user?.avatar?.url : "../../public/defaultAvatar.png"}
                          alt='avatar'
                          className='w-[40px] h-[40px] object-cover rounded-full'
                        />
                      </div>
                      <div className='pl-3 '>
                        <div className='flex items-center'>
                          <h5 className='text-[20px]'>{item?.user?.name}</h5>
                          {item.user.role === "admin" && (
                            <VscVerifiedFilled className='text-[#0095F6] ml-2 text-[20px]' />
                          )}
                        </div>
                        <p>{item?.comment}</p>
                        <small className='text-[#ffffff83]'>{format(item.createdAt)}</small>
                      </div>
                    </div>
                  ))}
                  <div className='w-full flex relative text-white '>
                    <input
                      type='text'
                      placeholder='Nhập phản hồi...'
                      value={answers[comment._id] || ""}
                      onChange={(e) => handleAnswerChange(comment._id, e.target.value)}
                      className={`block 800px:ml-2 mt-2 outline-none bg-transparent border-b border-[#00000027] border-[#fff] text-white  p-[5px] w-[95%] ${
                        answerCreationLoading && "cursor-not-allowed"
                      }`}
                    />
                    <button
                      type='submit'
                      className='absolute right-0 bottom-1'
                      onClick={handleAnswerSubmit}
                      disabled={answerCreationLoading}
                    >
                      Gửi
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
