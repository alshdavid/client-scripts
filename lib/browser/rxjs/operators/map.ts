import { Operation, OperatorFunc, UnaryFunc } from './operation.js';

export const map = <T1, T2>(cb: UnaryFunc<T1, T2>): OperatorFunc<T1, T2> => (op) => {
  const value = cb(op.value);
  return new Operation(value);
};
