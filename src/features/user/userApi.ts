import { apiSlice } from "../api/apiSlice";
import { setCredentials } from "../auth/authSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          await localStorage.setItem("user", JSON.stringify(result.data));
          dispatch(
            setCredentials({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    editProfile: builder.mutation({
      query: ({ name }) => ({
        url: "update-user-info",
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          await localStorage.setItem("user", JSON.stringify(result.data));
          dispatch(
            setCredentials({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "update-user-password",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          await localStorage.setItem("user", JSON.stringify(result.data));
          dispatch(
            setCredentials({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    addFollowedMovie: builder.mutation({
      query: ({ slug }) => ({
        url: "addFollowedMovie",
        method: "PUT",
        body: { slug },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          await localStorage.setItem("user", JSON.stringify(result.data));
          dispatch(
            setCredentials({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    removeFollowedMovie: builder.mutation({
      query: ({ slug }) => ({
        url: "removeFollowedMovie",
        method: "PUT",
        body: { slug },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          await localStorage.setItem("user", JSON.stringify(result.data));
          dispatch(
            setCredentials({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),

    addToHistory: builder.mutation({
      query: ({ movie_slug, ep }) => ({
        url: "addToHistory",
        method: "PUT",
        body: { movie_slug, ep },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          await localStorage.setItem("user", JSON.stringify(result.data));
          dispatch(
            setCredentials({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
  useAddFollowedMovieMutation,
  useRemoveFollowedMovieMutation,
  useAddToHistoryMutation,
} = userApi;
