export class ArrayExtensions {
    public static shuffleEntries<T>(array: T[]): T[] {
        if (array.length <= 1) {
            return array;
        }

        for (let i = 0; i < array.length; i++) {
            const randomChoiceIndex = this.getRandomNumber(i, array.length - 1);
            [array[i], array[randomChoiceIndex]] = [array[randomChoiceIndex], array[i]];
        }

        return array;
    }

    private static getRandomNumber(floor: number, ceiling: number): number {
        return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
    }
}
