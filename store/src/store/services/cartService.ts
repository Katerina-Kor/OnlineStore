import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/apiConstants';
import tokenStorageInstance from '../../utils/tokenStorage/tokenStorage';
import { CartData, CustomError, ProductData } from '../../types/apiTypes';

type SuccessCartResponce = {
  data: CartData;
  error: null;
};

type SuccessCartDeletionResponce = {
  data: { success: true };
  error: null;
};

type UpdateCartArgs = {
  productId: string;
  count: number;
  needValidate?: boolean;
};

type SuccessProductsListResponce = {
  data: ProductData[];
  error: null;
};

type SuccessProductResponce = {
  data: ProductData;
  error: null;
};

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
};

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = tokenStorageInstance.getToken();
      headers.set('Authorization', `Bearer ${token}`);
      headers.set('Content-Type', `application/json`);
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  tagTypes: ['UpdateCart', 'UpdateProducts'],
  endpoints: (build) => ({
    getCart: build.query<SuccessCartResponce, void>({
      query: () => ({
        url: '/profile/cart',
      }),
      providesTags: ['UpdateCart'],
    }),
    updateCart: build.mutation<SuccessCartResponce, UpdateCartArgs>({
      query: ({ productId, count }) => ({
        url: '/profile/cart',
        method: 'PUT',
        body: JSON.stringify({ productId, count }),
      }),
      invalidatesTags: (result, error, args) => {
        return args.needValidate ? ['UpdateCart'] : [];
      },
    }),
    deleteCart: build.mutation<SuccessCartDeletionResponce, void>({
      query: () => ({
        url: '/profile/cart',
        method: 'DELETE',
      }),
      invalidatesTags: ['UpdateCart'],
    }),
    loginUser: build.mutation<SuccessLoginResponce, AuthArgs>({
      query: (args) => ({
        url: '/login',
        method: 'POST',
        body: JSON.stringify(args),
      }),
      invalidatesTags: ['UpdateCart', 'UpdateProducts'],
    }),
    registerUser: build.mutation<SuccessRegisterResponce, AuthArgs>({
      query: (args) => ({
        url: '/register',
        method: 'POST',
        body: JSON.stringify({ ...args, role: 'admin' }),
      }),
    }),
    getProductsList: build.query<SuccessProductsListResponce, void>({
      query: () => ({
        url: '/products',
      }),
      providesTags: ['UpdateProducts'],
    }),
    getProduct: build.query<SuccessProductResponce, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useUpdateCartMutation,
  useDeleteCartMutation,
  useGetProductQuery,
  useGetProductsListQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
} = cartApi;
