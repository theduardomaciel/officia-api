import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Project, Prisma, Segment } from '@prisma/client';

import { ProjectsRepository } from './projects.repository';
import {
    ProjectCreateDto,
    ProjectUpdateDto
} from 'src/projects/dto/projects.dto';

@Injectable()
export class ProjectsService implements ProjectsRepository {
    constructor(private prisma: PrismaService) {}

    async getSegments() {
        const categories = await this.prisma.segmentCategory.findMany({
            include: {
                segments: true
            }
        });

        const segmentsWithoutCategories = await this.prisma.segment.findMany({
            where: {
                segmentCategoryId: null
            }
        });

        const segments = [
            ...categories.map((category) => {
                return {
                    name: category.name,
                    segments: category.segments
                };
            }),
            {
                name: 'Outros',
                segments: segmentsWithoutCategories
            }
        ];

        return segments;
    }

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
        const { segmentsData, ...rest } = data;

        return this.prisma.project.create({
            data: {
                ...rest,
                segments: {
                    connectOrCreate: segmentsData?.map((json) => {
                        const segment = json as unknown as Segment;
                        return {
                            where: {
                                name: segment.name
                            },
                            create: segment
                        };
                    })
                }
            }
        });
    }

    async updateProject(params: {
        where: Prisma.ProjectWhereUniqueInput;
        data: ProjectUpdateDto;
    }): Promise<Project> {
        const {
            where,
            data: { segmentsData, ordersIds, categoriesIds, ...rest }
        } = params;

        return this.prisma.project.update({
            data: {
                ...rest,
                segments: {
                    connectOrCreate: segmentsData?.map((json) => {
                        const segment = json as unknown as Segment;
                        return {
                            where: {
                                id: segment.id
                            },
                            create: segment
                        };
                    })
                }
            },
            where
        });
    }

    async deleteProject(where: Prisma.ProjectWhereUniqueInput): Promise<void> {
        await this.prisma.project.delete({
            where
        });
    }
}
