import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectsRepository } from './projects.repository';

@Module({
    controllers: [ProjectsController],
    providers: [
        ProjectsService,
        {
            provide: ProjectsRepository,
            useClass: ProjectsService
        }
    ],
    imports: [PrismaModule]
})
export class ProjectsModule {}
