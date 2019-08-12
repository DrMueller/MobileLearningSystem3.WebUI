import { Claim } from '.';

export class LoginResult {
    public loginSuccess: boolean;
    public claims: Claim[];
    public token: string;
}
