import { Subscriber } from './observable.js';
import { Unsubscriber } from './subscription.js';

export const firstValueFrom = async <T>(source: Subscriber<T>): Promise<T> => {
  let done = false;
  let sub: Unsubscriber | undefined;

  const response = new Promise<T>((resolve, reject) => {
    sub = source.subscribe(
      (value) => {
        done = true;
        resolve(value);
      },
      (error) => reject(error),
      () => {
        if (!done) {
          reject(new Error('Completed before value arrived'))    
        }
      },
    );
  });

  const result = await response;

  if (sub && done) {
    sub.unsubscribe();
  }

  return result;
};
