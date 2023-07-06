type MemoizedFunction<T extends (...args: any[]) => any> = T & {
  cache: Record<string, ReturnType<T>>;
};

function memoizer<T extends (...args: any[]) => any>(
  func: T,
): MemoizedFunction<T> {
  const cache: Record<string, ReturnType<T>> = {};

  const memoized = (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);

    if (cache.hasOwnProperty(key)) {
      return cache[key];
    }

    const result = func.apply(this, args);
    cache[key] = result;

    return result;
  };

  memoized.cache = cache;
  return memoized as MemoizedFunction<T>;
}

function add(a: number, b: number): number {
  return a + b;
}

const memoizedAdd = memoizer(add);
