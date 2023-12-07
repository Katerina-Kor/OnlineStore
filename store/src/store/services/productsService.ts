import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/apiConstants';
import tokenStorageInstance from '../../utils/tokenStorage/tokenStorage';
import { CustomError, ProductData } from '../../types/apiTypes';

type SuccessProductsListResponce = {
  data: ProductData[];
  error: null;
};

type SuccessProductResponce = {
  data: ProductData;
  error: null;
};

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = tokenStorageInstance.getToken();
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints: (build) => ({
    getProductsList: build.query<SuccessProductsListResponce, void>({
      query: () => ({
        url: '/products',
      }),
    }),
    getProduct: build.query<SuccessProductResponce, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
      }),
    }),
  }),
});

export const { useGetProductsListQuery, useGetProductQuery } = productsApi;