import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Project, Prisma } from '@prisma/client';

import { ProjectsRepository } from '../projects.repository';
import { ProjectCreateDto } from 'src/dtos/Project';

@Injectable()
export class ProjectService implements ProjectsRepository {
    constructor(private prisma: PrismaService) {}

    async getProject(
        ProjectWhereUniqueInput: Prisma.ProjectWhereUniqueInput
    ): Promise<Project | null> {
        return this.prisma.project.findUnique({
            where: ProjectWhereUniqueInput
        });
    }

    async getProjects(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ProjectWhereUniqueInput;
        where?: Prisma.ProjectWhereInput;
        orderBy?: Prisma.ProjectOrderByWithRelationInput;
    }): Promise<Project[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.project.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy
        });
    }

    async createProject(data: ProjectCreateDto): Promise<Project> {
        return this.prisma.project.create({
            data
        });
    }

    async updateProject(params: {
        where: Prisma.ProjectWhereUniqueInput;
        data: Prisma.ProjectUpdateInput;
    }): Promise<Project> {
        const { where, data } = params;
        return this.prisma.project.update({
            data,
            where
        });
    }

    async deleteProject(where: Prisma.ProjectWhereUniqueInput): Promise<void> {
        await this.prisma.project.delete({
            where
        });
    }
}
