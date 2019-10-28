export function shuffleArray<T>(array: T[]): T[] {
  if (array.length <= 1) {
    return array;
  }

  for (let i = 0; i < array.length; i++) {
    const randomChoiceIndex = getRandomNumber(i, array.length - 1);
    [array[i], array[randomChoiceIndex]] = [array[randomChoiceIndex], array[i]];
  }

  return array;
}

function getRandomNumber(floor: number, ceiling: number): number {
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
}
