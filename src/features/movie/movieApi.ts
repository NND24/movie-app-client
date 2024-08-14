import { movieApiSlice } from "../api/apiSlice";

export const movieApi = movieApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNewUpdatedMovie: builder.query({
      query: (page: number) => ({
        url: `danh-sach/phim-moi-cap-nhat?page=${page}`,
        method: "GET",
      }),
    }),
    getMovieByCategory: builder.query({
      query: ({ category, page }: { category: string; page: number }) => ({
        url: `/v1/api/danh-sach/${category}?page=${page}`,
        method: "GET",
      }),
    }),
    getMovieByGenre: builder.query({
      query: ({ genre, page }: { genre: string; page: number }) => ({
        url: `/v1/api/the-loai/${genre}?page=${page}`,
        method: "GET",
      }),
    }),
    getMovieByNation: builder.query({
      query: ({ nation, page }: { nation: string; page: number }) => ({
        url: `/v1/api/quoc-gia/${nation}?page=${page}`,
        method: "GET",
      }),
    }),
    getDetailMovie: builder.query({
      query: (slug: string) => ({
        url: `phim/${slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetNewUpdatedMovieQuery,
  useGetMovieByCategoryQuery,
  useGetMovieByGenreQuery,
  useGetMovieByNationQuery,
  useGetDetailMovieQuery,
} = movieApi;
