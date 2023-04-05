import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Account, Prisma } from '@prisma/client';

import { AccountsRepository } from '../accounts.repository';

@Injectable()
export class AccountService implements AccountsRepository {
    constructor(private prisma: PrismaService) {}

    async getAccount(
        AccountWhereUniqueInput: Prisma.AccountWhereUniqueInput
    ): Promise<Account | null> {
        return this.prisma.account.findUnique({
            where: AccountWhereUniqueInput
        });
    }

    async getAccounts(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.AccountWhereUniqueInput;
        where?: Prisma.AccountWhereInput;
        orderBy?: Prisma.AccountOrderByWithRelationInput;
    }): Promise<Account[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.account.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy
        });
    }

    async createAccount(data: Prisma.AccountCreateInput): Promise<Account> {
        return this.prisma.account.create({
            data
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
