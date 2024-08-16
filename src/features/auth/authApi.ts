import { movieApiSlice } from "../api/apiSlice";

export const authApi = movieApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `login`,
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
