import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/apiConstants';
import tokenStorageInstance from '../../utils/tokenStorage/tokenStorage';
import { CartData, CustomError } from '../../types/apiTypes';

type SuccessLoginResponce = {
  data: { token: string };
  error: null;
};

type LoginArgs = {
  email: string;
  password: string;
}

export const cartDataApi = createApi({
  reducerPath: 'cartDataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = tokenStorageInstance.getToken();
      headers.set('Authorization', `Bearer ${token}`);
      headers.set('Content-Type', `application/json`);
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints: (build) => ({
    getCartData: build.query<CartData, null | void>({
      query: () => ({
        url: '/profile/cart',
      }),
    }),
  }),
});

export const { useGetCartDataQuery } = cartDataApi;