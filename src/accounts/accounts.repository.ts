import { Account as AccountModel, Prisma } from '@prisma/client';
import {
    AccountCreateDto,
    AccountUpdateDto
} from 'src/accounts/dto/accounts.dto';

export abstract class AccountsRepository {
    abstract getAccount(
        AccountWhereUniqueInput: Prisma.AccountWhereUniqueInput,
        include?: Prisma.AccountInclude
    ): Promise<AccountModel | null>;

    abstract checkAccount(
        AccountWhereUniqueInput: Prisma.AccountWhereUniqueInput
    ): Promise<boolean>;

    /* abstract getAccounts(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.AccountWhereUniqueInput;
        where?: Prisma.AccountWhereInput;
        orderBy?: Prisma.AccountOrderByWithRelationInput;
    }): Promise<AccountModel[] | null>; */

    abstract createAccount(data: AccountCreateDto): Promise<AccountModel>;

    abstract updateAccount(params: {
        where: Prisma.AccountWhereUniqueInput;
        data: AccountUpdateDto;
    }): Promise<AccountModel>;

    abstract deleteAccount(
        where: Prisma.AccountWhereUniqueInput
    ): Promise<void>;
}
