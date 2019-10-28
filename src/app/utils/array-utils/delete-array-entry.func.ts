export function deleteArrayEntry<T>(
  array: T[],
  findCallback: (entry: T) => boolean
) {
  const result = Array.from(array);
  const index = array.findIndex(f => findCallback(f));

  if (index > -1) {
    result.splice(index, 1);
  }

  return result;
}
