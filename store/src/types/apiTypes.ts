export function isError<T>(data: T | ErrorResponce): data is ErrorResponce {
  return (data as ErrorResponce).error !== null;
}

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
