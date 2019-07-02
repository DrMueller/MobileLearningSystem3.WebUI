export class SecurityUser {
  public constructor(
    public readonly userName: string,
    public readonly isAuthenticated: boolean,
    public readonly token: string) {
  }

  public static createUnauthenticated(): SecurityUser {
    return new SecurityUser('Guest', false, '');
  }

  public static createAuthenticated(userName: string, token: string): SecurityUser {
    return new SecurityUser(userName, true, token);
  }
}
