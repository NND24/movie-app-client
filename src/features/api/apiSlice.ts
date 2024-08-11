import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// interface RefreshResponse {
//   accessToken: string;
// }

// const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = fetchBaseQuery({
//   baseUrl: "", // Set your base URL
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
//     const refreshResult = await baseQuery("/refresh", api, extraOptions);
//     console.log(refreshResult);

//     if (refreshResult.data) {
//       const refreshData = refreshResult.data as RefreshResponse;
//       const { accessToken } = refreshData;
//       const user = (api.getState() as RootState).auth.user;

//       api.dispatch(setCredentials({ user, accessToken }));
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

export const apiKKSlice = createApi({
  reducerPath: "apiKK",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://phimapi.com/",
  }),
  endpoints: (builder) => ({}),
});
