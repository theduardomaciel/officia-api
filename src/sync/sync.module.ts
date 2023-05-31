import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';

import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';
import { SyncRepository } from './sync.repository';

@Module({
    controllers: [SyncController],
    providers: [
        SyncService,
        {
            provide: SyncRepository,
            useClass: SyncService
        }
    ],
    imports: [PrismaModule]
})
export class SyncModule {}
