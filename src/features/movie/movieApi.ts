import { movieApiSlice } from "../api/apiSlice";

export const movieApi = movieApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNewUpdatedMovie: builder.query({
      query: (page: number) => ({
        url: `phim-moi-cap-nhat?page=${page}`,
        method: "GET",
      }),
    }),
    getMovieByCategory: builder.query({
      query: ({ category, page }: { category: string; page: number }) => ({
        url: `danh-sach/${category}?page=${page}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNewUpdatedMovieQuery, useGetMovieByCategoryQuery } = movieApi;
