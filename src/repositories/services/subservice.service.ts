import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { SubService, Prisma } from '@prisma/client';

import { SubServicesRepository } from '../subservices.repository';
import { SubServiceCreateDto } from 'src/dtos/SubService';

@Injectable()
export class SubServiceService implements SubServicesRepository {
    constructor(private prisma: PrismaService) {}

    async getSubService(
        SubServiceWhereUniqueInput: Prisma.SubServiceWhereUniqueInput
    ): Promise<SubService | null> {
        return this.prisma.subService.findUnique({
            where: SubServiceWhereUniqueInput
        });
    }

    async getSubServices(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.SubServiceWhereUniqueInput;
        where?: Prisma.SubServiceWhereInput;
        orderBy?: Prisma.SubServiceOrderByWithRelationInput;
    }): Promise<SubService[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.subService.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy
        });
    }

    async createSubService(data: SubServiceCreateDto): Promise<SubService> {
        return this.prisma.subService.create({
            data
        });
    }

    async updateSubService(params: {
        where: Prisma.SubServiceWhereUniqueInput;
        data: Prisma.SubServiceUpdateInput;
    }): Promise<SubService> {
        const { where, data } = params;
        return this.prisma.subService.update({
            data,
            where
        });
    }

    async deleteSubService(
        where: Prisma.SubServiceWhereUniqueInput
    ): Promise<void> {
        await this.prisma.subService.delete({
            where
        });
    }
}
