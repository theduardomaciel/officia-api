import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';

import { AuthHelper } from 'src/auth/auth.helper';

import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './accounts.repository';

@Module({
    controllers: [AccountsController],
    providers: [
        AccountsService,
        AuthHelper,
        {
            provide: AccountsRepository,
            useClass: AccountsService
        }
    ],
    imports: [PrismaModule],
    exports: [AccountsService]
})
export class AccountsModule {}
