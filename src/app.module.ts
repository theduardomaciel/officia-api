import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { PrismaService } from './database/prisma.service';

import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';

import { AccountsRepository } from './repositories/accounts.repository';
import { AccountService } from './repositories/services/account.service';

import { ServicesRepository } from './repositories/services.repository';
import { ServiceService } from './repositories/services/service.service';

import { ProjectsRepository } from './repositories/projects.repository';
import { ProjectService } from './repositories/services/project.service';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [
        PrismaService,
        {
            provide: APP_PIPE,
            useClass: ZodValidationPipe
        },
        {
            provide: AccountsRepository,
            useClass: AccountService
        },
        {
            provide: ServicesRepository,
            useClass: ServiceService
        },
        {
            provide: ProjectsRepository,
            useClass: ProjectService
        }
    ]
})
export class AppModule {}
