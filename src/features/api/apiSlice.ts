import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// interface RefreshResponse {
//   accessToken: string;
// }

// const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = fetchBaseQuery({
//   baseUrl: process.env.MOVIE_API,
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).auth.token;
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
//   args,
//   api,
//   extraOptions
// ) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 403) {
//     console.log("Sending refresh token");
//     // send refresh token to get new access token
//     const refreshResult = await baseQuery("/refresh", api, extraOptions);
//     console.log(refreshResult);

//     if (refreshResult.data) {
//       // Type the refresh result data as RefreshResponse
//       const refreshData = refreshResult.data as RefreshResponse;
//       const { accessToken } = refreshData;
//       const user = (api.getState() as RootState).auth.user;

//       // store the new token
//       api.dispatch(setCredentials({ user, accessToken }));

//       // retry the original query with new access token
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logOut());
//     }
//   }
//   return result;
// };

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: baseQueryWithReAuth,
//   endpoints: (builder) => ({}),
// });

export const movieApiSlice = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://phim.nguonc.com/api/",
  }),
  endpoints: (builder) => ({}),
});
