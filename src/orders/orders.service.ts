import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentCondition, Prisma, Order } from '@prisma/client';

import { OrdersRepository } from './orders.repository';
import { OrderCreateDto, OrderUpdateDto } from 'src/orders/dto/orders.dto';

@Injectable()
export class OrdersService implements OrdersRepository {
    constructor(private prisma: PrismaService) {}

    async getOrder(
        OrderWhereUniqueInput: Prisma.OrderWhereUniqueInput
    ): Promise<Order | null> {
        return this.prisma.order.findUnique({
            where: OrderWhereUniqueInput
        });
    }

    async getOrders(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.OrderWhereUniqueInput;
        where?: Prisma.OrderWhereInput;
        orderBy?: Prisma.OrderOrderByWithRelationInput;
    }): Promise<Order[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.order.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy
        });
    }

    async createOrder(data: OrderCreateDto): Promise<Order> {
        const { clientId, projectId, paymentCondition, ...rest } = data;

        return this.prisma.order.create({
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

    async updateOrder(params: {
        where: Prisma.OrderWhereUniqueInput;
        data: OrderUpdateDto;
    }): Promise<Order> {
        const { where, data } = params;

        const { clientId, paymentCondition, ...rest } = data;

        return this.prisma.order.update({
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

    async deleteOrder(where: Prisma.OrderWhereUniqueInput): Promise<void> {
        /* await this.prisma.order.delete({
            where
        }); */
        await this.prisma.order.update({
            where,
            data: {
                isDeleted: true
            }
        });
    }
}
