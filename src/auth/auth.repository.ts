export abstract class AuthRepository {
    abstract verifyEmail(email: string): Promise<string>;
    abstract verifyPassword({
        email,
        password,
        id
    }: {
        email: string;
        password: string;
        id: string;
    }): Promise<boolean>;
}
