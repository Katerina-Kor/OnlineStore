import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ErrorResponce } from '../../types/apiTypes';

export function isFetchBaseQueryError<T>(
  data: T | FetchBaseQueryError | undefined
): data is FetchBaseQueryError {
  if (typeof data === 'undefined') return false;
  return (data as FetchBaseQueryError).status !== null;
}

export function getErrorMessage(
  error: FetchBaseQueryError | SerializedError
): string | undefined {
  if (isFetchBaseQueryError(error)) {
    if (typeof error.status === 'number') {
      return (error.data as ErrorResponce).error.message;
    } else {
      return error.error;
    }
  } else {
    return error.message;
  }
}

export function isSerializedError<T>(
  data: T | SerializedError
): data is SerializedError {
  return (data as SerializedError).name !== null;
}