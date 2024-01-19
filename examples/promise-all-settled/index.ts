export async function promiseAllSettled<T>(
  values: Array<T | PromiseLike<T>>
): Promise<PromiseSettledResult<T>[]> {
  return;
}
