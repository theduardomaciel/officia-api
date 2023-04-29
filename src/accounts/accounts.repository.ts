import { Account as AccountModel, Prisma } from '@prisma/client';
import { AccountCreateDto, AccountDto } from 'src/accounts/dto/accounts.dto';

export abstract class AccountsRepository {
    abstract getAccount(
        AccountWhereUniqueInput: Prisma.AccountWhereUniqueInput,
        include?: Prisma.AccountInclude
    ): Promise<AccountModel | null>;

    /* abstract getAccounts(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.AccountWhereUniqueInput;
        where?: Prisma.AccountWhereInput;
        orderBy?: Prisma.AccountOrderByWithRelationInput;
    }): Promise<AccountModel[] | null>; */

    abstract findUnique(
        where: Prisma.AccountWhereInput,
        include?: Prisma.AccountInclude
    ): Promise<AccountModel | null>;

    abstract createAccount(data: AccountCreateDto): Promise<AccountModel>;

    abstract updateAccount(params: {
        where: Prisma.AccountWhereUniqueInput;
        data: AccountDto;
    }): Promise<AccountModel>;

    abstract deleteAccount(
        where: Prisma.AccountWhereUniqueInput
    ): Promise<void>;
}
