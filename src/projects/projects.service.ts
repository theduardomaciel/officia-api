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
        const {
            businessModel: businessModelArray,
            agenda: agendaArray,
            serviceZoneCountries: serviceZoneCountriesArray,
            serviceZoneStates: serviceZoneStatesArray,
            serviceZoneCities: serviceZoneCitiesArray,
            segmentsData,
            ...rest
        } = data;

        const businessModel = businessModelArray?.join(',');
        const agenda = agendaArray?.join(',');

        const serviceZoneCountries = serviceZoneCountriesArray?.join(',');
        const serviceZoneStates = serviceZoneStatesArray?.join(',');
        const serviceZoneCities = serviceZoneCitiesArray?.join(',');

        return this.prisma.project.create({
            data: {
                ...rest,
                businessModel,
                agenda,
                serviceZoneCountries,
                serviceZoneStates,
                serviceZoneCities,
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
            }
        });
    }

    async updateProject(params: {
        where: Prisma.ProjectWhereUniqueInput;
        data: ProjectUpdateDto;
    }): Promise<Project> {
        const {
            where,
            data: {
                businessModel: businessModelArray,
                agenda: agendaArray,
                serviceZoneCountries: serviceZoneCountriesArray,
                serviceZoneStates: serviceZoneStatesArray,
                serviceZoneCities: serviceZoneCitiesArray,
                defaultPaymentMethods: defaultPaymentMethodsArray,
                segmentsData,
                ...rest
            }
        } = params;

        const businessModel = businessModelArray?.join(',');
        const agenda = agendaArray?.join(',');

        const serviceZoneCountries = serviceZoneCountriesArray?.join(',');
        const serviceZoneStates = serviceZoneStatesArray?.join(',');
        const serviceZoneCities = serviceZoneCitiesArray?.join(',');

        const defaultPaymentMethods = defaultPaymentMethodsArray?.join(',');

        return this.prisma.project.update({
            data: {
                ...rest,
                businessModel,
                agenda,
                serviceZoneCountries,
                serviceZoneStates,
                serviceZoneCities,
                defaultPaymentMethods,
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
