import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';

import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';

import { AccountsModule } from './accounts/accounts.module';
import { ProjectsModule } from './projects/projects.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [
        ThrottlerModule.forRoot({
            ttl: 60, // the "time to live" for each record
            limit: 10 // the maximum number of requests to be permitted in the given interval (ttl)
        }),
        AccountsModule,
        ProjectsModule,
        OrdersModule,
        AuthModule,
        PrismaModule
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ZodValidationPipe
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
        /* {
            provide: APP_GUARD,
            useClass: AuthGuard
        } */
    ]
})
export class AppModule {}
