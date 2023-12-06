import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/apiConstants';
import { CustomError } from '../../types/apiTypes';

type SuccessLoginResponce = {
  data: { token: string };
  error: null;
};

type SuccessRegisterResponce = {
  data: {
    id: string;
    email: string;
    role: 'admin' | 'user';
  };
  error: null;
};

type AuthArgs = {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', `application/json`);
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints: (build) => ({
    login: build.mutation<SuccessLoginResponce, AuthArgs>({
      query: (args) => ({
        url: '/login',
        method: 'POST',
        body: JSON.stringify(args),
      }),
    }),
    register: build.mutation<SuccessRegisterResponce, AuthArgs>({
      query: (args) => ({
        url: '/register',
        method: 'POST',
        body: JSON.stringify({...args, role: 'admin'}),
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;