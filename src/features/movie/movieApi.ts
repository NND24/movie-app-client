import { apiKKSlice } from "../api/apiSlice";

export const movieApi = apiKKSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNewUpdatedMovie: builder.query({
      query: (page: number) => ({
        url: `/danh-sach/phim-moi-cap-nhat?page=${page}`, // Use the proxied endpoint
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNewUpdatedMovieQuery } = movieApi;
