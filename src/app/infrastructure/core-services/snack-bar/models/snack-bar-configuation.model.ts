export class SnackBarConfiguration {
    public constructor(public displayDuration: number) { }

    public static createDefault(): SnackBarConfiguration {
        return new SnackBarConfiguration(2500);
    }
}
