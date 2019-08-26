export class Prediction {
  public constructor(public readonly className: string, public readonly probability: number) {
  }

  public get probabilityDescription(): string {
    const roundedPercent = Math.round(this.probability * 100);
    return `${roundedPercent} %`;
  }
}
