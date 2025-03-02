import { OperatorFunc, CallbackFunc } from './operation.js';

export const tap = <T>(cb: CallbackFunc<T>): OperatorFunc<T, T> => (op) => {
  cb(op.value);
  return op;
};
