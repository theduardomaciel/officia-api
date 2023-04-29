import {
    Controller,
    Get,
    Query,
    Post,
    Body,
    Put,
    Param,
    Delete,
    Patch
} from '@nestjs/common';

import { UseZodGuard } from 'nestjs-zod';
import { OrdersRepository } from './orders.repository';
import {
    OrderCreateDto,
    OrderCreateSchema,
    OrderUpdateDto,
    OrderUpdateSchema
} from 'src/orders/dto/orders.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersRepository: OrdersRepository) {}

    @Get('order/:id')
    async getOrder(@Param('id') id: string) {
        return await this.ordersRepository.getOrder({ id: id });
    }

    @Get('order')
    async getOrders(@Query('take') take: string) {
        return await this.ordersRepository.getOrders({
            take: take ? Number(take) : undefined
        });
    }

    @Post('order')
    @UseZodGuard('body', OrderCreateSchema)
    async createOrder(@Body() userData: OrderCreateDto) {
        return await this.ordersRepository.createOrder(userData);
    }

    @Patch('order/:id')
    @UseZodGuard('body', OrderUpdateSchema)
    async updateOrder(
        @Param('id') id: string,
        @Body() userData: OrderUpdateDto
    ) {
        return await this.ordersRepository.updateOrder({
            where: { id },
            data: userData
        });
    }

    @Delete('order/:id')
    async deleteOrder(@Param('id') id: string) {
        return await this.ordersRepository.deleteOrder({ id });
    }
}
