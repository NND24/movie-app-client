import { apiSlice } from "../api/apiSlice";
import { setCredentials } from "../auth/authSlice";

const user = localStorage.getItem("user");
const getUserFromLocalStorage = user ? JSON.parse(user) : null;

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
          const user = result.data.user;
          const token = getUserFromLocalStorage?.accessToken;

          await localStorage.setItem("user", JSON.stringify({ user, accessToken: token }));
          dispatch(
            setCredentials({
              accessToken: token,
              user: user,
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
          const user = result.data.user;
          const token = getUserFromLocalStorage?.accessToken;

          await localStorage.setItem("user", JSON.stringify({ user, accessToken: token }));
          dispatch(
            setCredentials({
              accessToken: token,
              user: user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useAddFollowedMovieMutation, useRemoveFollowedMovieMutation } = userApi;
