export class FactOverviewEntryVm {
  public constructor(
    public readonly id: number,
    public readonly creationDate: Date,
    public readonly questionText: string) {
  }

  public get creationDateDescription(): string {
    return this.creationDate.toLocaleString();
  }
}
