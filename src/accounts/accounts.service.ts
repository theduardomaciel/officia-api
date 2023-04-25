import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { Account, Prisma } from '@prisma/client';

import { AccountsRepository } from './accounts.repository';

function exclude<Account, Key extends keyof Account>(
    account: Account,
    keys: Key[]
): any /* Omit<Account, Key> */ {
    for (let key of keys) {
        delete account[key];
    }
    return account;
}

@Injectable()
export class AccountsService implements AccountsRepository {
    constructor(private prisma: PrismaService) {}

    async getAccount(
        AccountWhereUniqueInput: Prisma.AccountWhereUniqueInput,
        include?: Prisma.AccountInclude
    ): Promise<Account | null> {
        return this.prisma.account.findUnique({
            where: AccountWhereUniqueInput,
            include
        });
    }

    async checkAccount(
        AccountWhereUniqueInput: Prisma.AccountWhereUniqueInput
    ) {
        const account = await this.prisma.account.findUnique({
            where: AccountWhereUniqueInput
        });
        return !!account;
    }

    async getAccounts(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.AccountWhereUniqueInput;
        where?: Prisma.AccountWhereInput;
        orderBy?: Prisma.AccountOrderByWithRelationInput;
    }): Promise<Account[]> {
        const { skip, take, cursor, where, orderBy } = params;
        const accounts = await this.prisma.account.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy
        });

        return accounts.map((account) => exclude(account, ['password']));
    }

    async createAccount(data: Prisma.AccountCreateInput): Promise<Account> {
        return this.prisma.account.create({
            data,
            include: {
                projects: true
            }
        });
    }

    async updateAccount(params: {
        where: Prisma.AccountWhereUniqueInput;
        data: Prisma.AccountUpdateInput;
    }): Promise<Account> {
        const { where, data } = params;
        return this.prisma.account.update({
            data,
            where
        });
    }

    async deleteAccount(where: Prisma.AccountWhereUniqueInput): Promise<void> {
        await this.prisma.account.delete({
            where
        });
    }
}
