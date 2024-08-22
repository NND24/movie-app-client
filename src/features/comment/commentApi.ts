import { apiSlice } from "../api/apiSlice";

export const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComment: builder.query({
      query: (slug: string) => ({
        url: `get-comment/${slug}`,
        method: "GET",
      }),
    }),
    addNewComment: builder.mutation({
      query: ({ slug, comment }) => ({
        url: `add-comment`,
        method: "PUT",
        body: {
          slug,
          comment,
        },
        credentials: "include" as const,
      }),
    }),
    addNewAnswer: builder.mutation({
      query: ({ slug, answer, commentId }) => ({
        url: `add-answer`,
        method: "PUT",
        body: { slug, answer, commentId },
        credentials: "include" as const,
      }),
    }),
    deleteComment: builder.mutation({
      query: ({ slug, commentId }) => ({
        url: `comment`,
        method: "DELETE",
        body: { slug, commentId },
        credentials: "include" as const,
      }),
    }),
    deleteReply: builder.mutation({
      query: ({ slug, commentId, replyId }) => ({
        url: `comment/reply`,
        method: "DELETE",
        body: { slug, commentId, replyId },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetCommentQuery,
  useAddNewCommentMutation,
  useAddNewAnswerMutation,
  useDeleteCommentMutation,
  useDeleteReplyMutation,
} = commentApi;
