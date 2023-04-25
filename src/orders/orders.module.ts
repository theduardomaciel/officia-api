import { Module, Provider } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';

@Module({
    controllers: [OrdersController],
    providers: [OrdersService, OrdersRepository as Provider],
    imports: [PrismaModule]
})
export class OrdersModule {}
