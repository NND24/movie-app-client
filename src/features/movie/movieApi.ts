import { movieApiSlice } from "../api/apiSlice";

export const movieApi = movieApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNewUpdatedMovie: builder.query({
      query: (page: number) => ({
        url: `films/phim-moi-cap-nhat?page=${page}`,
        method: "GET",
      }),
    }),
    getMovieByCategory: builder.query({
      query: ({ category, page }: { category: string; page: number }) => ({
        url: `films/danh-sach/${category}?page=${page}`,
        method: "GET",
      }),
    }),
    getDetailMovie: builder.query({
      query: (slug: string) => ({
        url: `film/${slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNewUpdatedMovieQuery, useGetMovieByCategoryQuery, useGetDetailMovieQuery } = movieApi;
