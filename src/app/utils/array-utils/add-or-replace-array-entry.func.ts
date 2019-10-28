export function addOrReplaceArrayEntry<T>(
  array: T[],
  entry: T,
  equalsCallback: (a: T, b: T) => boolean): T[] {
  let newArray: T[];
  const existingEntry = array.find(f => equalsCallback(f, entry));
  if (!existingEntry) {
    newArray = Array.from(array);
    newArray.push(entry);
  } else {
    newArray = array.map(itm => equalsCallback(itm, entry) ? entry : itm);
  }

  return newArray;
}
