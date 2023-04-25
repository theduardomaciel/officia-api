export abstract class AuthRepository {
    abstract verify(email: string): Promise<string>;
}
