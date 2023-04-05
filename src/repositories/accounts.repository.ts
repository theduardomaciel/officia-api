import { Account as AccountModel, Prisma } from '@prisma/client';
import { AccountCreateDto, AccountUpdateDto } from 'src/dtos/Account';

export abstract class AccountsRepository {
    abstract getAccount(
        AccountWhereUniqueInput: Prisma.AccountWhereUniqueInput
    ): Promise<AccountModel | null>;

    abstract getAccounts(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.AccountWhereUniqueInput;
        where?: Prisma.AccountWhereInput;
        orderBy?: Prisma.AccountOrderByWithRelationInput;
    }): Promise<AccountModel[] | null>;

    abstract createAccount(data: AccountCreateDto): Promise<AccountModel>;

    abstract updateAccount(params: {
        where: Prisma.AccountWhereUniqueInput;
        data: AccountUpdateDto;
    }): Promise<AccountModel>;

    abstract deleteAccount(
        where: Prisma.AccountWhereUniqueInput
    ): Promise<void>;
}
