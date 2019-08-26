export class AppArea {
  public constructor(
    public readonly displayText: string,
    public readonly baseUrl: string,
    public readonly needsAuthentication: boolean,
    public readonly sortIndex: number) {
  }
}
