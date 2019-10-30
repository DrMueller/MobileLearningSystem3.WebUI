export class FactSelectionEntryVm {
  public constructor(
    public readonly id: number,
    public readonly questionText: string,
    public readonly existsInRun: boolean,
    public readonly creationDate: Date) {
  }

  public get creationDateDescription(): string {
    return this.creationDate.toLocaleString();
  }
}
