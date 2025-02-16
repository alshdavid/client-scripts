import { OperatorFunc, PredicateFunc } from './operation.js';

export const filter = <T>(predicate: PredicateFunc<T>): OperatorFunc<T, T> => (op) => {
  if (predicate(op.value) === false) {
    op.skip = true;
  }
  return op;
};
