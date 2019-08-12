export class SecurityUser {
  public constructor(
    public readonly userName: string,
    public readonly isAuthenticated: boolean,
    public readonly token: string) {
  }
}
