export abstract class AuthRepository {
    abstract verifyEmail(email: string): Promise<string>;
}
