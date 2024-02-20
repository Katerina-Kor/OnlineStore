export type ErrorResponce = {
  data: null;
  error: { message: string };
};

export type ProductData = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export type ProductsInfoInCart = {
  product: ProductData;
  count: number;
};

export type CartData = {
  cart: {
    id: string;
    items: ProductsInfoInCart[];
  };
  total: number;
};

export interface CustomError {
  data: ErrorResponce;
  status: number;
}

export type SuccessCheckoutResponce = {
  data: OrderData;
  error: null;
};

type OrderData = {
  order: {
    id: string;
    userId: string;
    cartId: string;
    items: ProductsInfoInCart[];
    payment: PaymentData;
    delivery: DeliveryData;
    comments: string;
    status: string;
    total: number;
  };
};

type PaymentData = {
  type: string;
  address: string;
  creditCard: string;
};

type DeliveryData = {
  type: string;
  address: string;
};

export enum HttpStatus {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
