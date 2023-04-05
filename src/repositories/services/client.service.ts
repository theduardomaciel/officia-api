import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Client, Prisma } from '@prisma/client';

import { ClientsRepository } from '../clients.repository';
import { ClientCreateDto } from 'src/dtos/Client';

@Injectable()
export class ClientService implements ClientsRepository {
    constructor(private prisma: PrismaService) {}

    async getClient(
        ClientWhereUniqueInput: Prisma.ClientWhereUniqueInput
    ): Promise<Client | null> {
        return this.prisma.client.findUnique({
            where: ClientWhereUniqueInput
        });
    }

    async getClients(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ClientWhereUniqueInput;
        where?: Prisma.ClientWhereInput;
        orderBy?: Prisma.ClientOrderByWithRelationInput;
    }): Promise<Client[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.client.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy
        });
    }

    async createClient(data: ClientCreateDto): Promise<Client> {
        return this.prisma.client.create({
            data
        });
    }

    async updateClient(params: {
        where: Prisma.ClientWhereUniqueInput;
        data: Prisma.ClientUpdateInput;
    }): Promise<Client> {
        const { where, data } = params;
        return this.prisma.client.update({
            data,
            where
        });
    }

    async deleteClient(where: Prisma.ClientWhereUniqueInput): Promise<void> {
        await this.prisma.client.delete({
            where
        });
    }
}
