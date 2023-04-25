import { Prisma, Order as OrderModel } from '@prisma/client';
import { OrderCreateDto, OrderUpdateDto } from 'src/orders/dto/orders.dto';

export abstract class OrdersRepository {
    abstract getOrder(
        AccountWhereUniqueInput: Prisma.OrderWhereUniqueInput
    ): Promise<OrderModel | null>;

    abstract getOrders(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.OrderWhereUniqueInput;
        where?: Prisma.OrderWhereInput;
        orderBy?: Prisma.OrderOrderByWithRelationInput;
    }): Promise<OrderModel[] | null>;

    abstract createOrder(data: OrderCreateDto): Promise<OrderModel>;

    abstract updateOrder(params: {
        where: Prisma.OrderWhereUniqueInput;
        data: OrderUpdateDto;
    }): Promise<OrderModel>;

    abstract deleteOrder(where: Prisma.OrderWhereUniqueInput): Promise<void>;
}
