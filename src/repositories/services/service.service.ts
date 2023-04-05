import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { PaymentCondition, Prisma, Service } from '@prisma/client';

import { ServicesRepository } from '../services.repository';
import { ServiceCreateDto, ServiceUpdateDto } from 'src/dtos/Service';

@Injectable()
export class ServiceService implements ServicesRepository {
    constructor(private prisma: PrismaService) {}

    async getService(
        ServiceWhereUniqueInput: Prisma.ServiceWhereUniqueInput
    ): Promise<Service | null> {
        return this.prisma.service.findUnique({
            where: ServiceWhereUniqueInput
        });
    }

    async getServices(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ServiceWhereUniqueInput;
        where?: Prisma.ServiceWhereInput;
        orderBy?: Prisma.ServiceOrderByWithRelationInput;
    }): Promise<Service[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.service.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy
        });
    }

    async createService(data: ServiceCreateDto): Promise<Service> {
        const { clientId, projectId, paymentCondition, ...rest } = data;

        return this.prisma.service.create({
            data: {
                ...rest,
                paymentCondition: paymentCondition
                    ? (paymentCondition as PaymentCondition)
                    : undefined,
                project: {
                    connect: {
                        id: projectId
                    }
                }
            }
        });
    }

    async updateService(params: {
        where: Prisma.ServiceWhereUniqueInput;
        data: ServiceUpdateDto;
    }): Promise<Service> {
        const { where, data } = params;

        const { clientId, paymentCondition, ...rest } = data;

        return this.prisma.service.update({
            data: {
                ...rest,
                paymentCondition: paymentCondition
                    ? (paymentCondition as PaymentCondition)
                    : undefined,
                client: {
                    connect: {
                        id: clientId
                    }
                }
            },
            where
        });
    }

    async deleteService(where: Prisma.ServiceWhereUniqueInput): Promise<void> {
        await this.prisma.service.delete({
            where
        });
    }
}
