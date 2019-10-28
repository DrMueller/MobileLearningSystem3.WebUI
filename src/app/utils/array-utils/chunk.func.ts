export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const newArraay = [];
  for (let i = 0, len = array.length; i < len; i += chunkSize) {
    newArraay.push(array.slice(i, i + chunkSize));
  }

  return newArraay;
}
