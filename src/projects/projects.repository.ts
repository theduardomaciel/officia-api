import { Prisma, Project as ProjectModel } from '@prisma/client';
import {
    ProjectCreateDto,
    ProjectUpdateDto
} from 'src/projects/dto/projects.dto';

export abstract class ProjectsRepository {
    abstract getProject(
        AccountWhereUniqueInput: Prisma.ProjectWhereUniqueInput
    ): Promise<ProjectModel | null>;

    abstract getProjects(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ProjectWhereUniqueInput;
        where?: Prisma.ProjectWhereInput;
        orderBy?: Prisma.ProjectOrderByWithRelationInput;
    }): Promise<ProjectModel[] | null>;

    abstract createProject(data: ProjectCreateDto): Promise<ProjectModel>;

    abstract updateProject(params: {
        where: Prisma.ProjectWhereUniqueInput;
        data: ProjectUpdateDto;
    }): Promise<ProjectModel>;

    abstract deleteProject(
        where: Prisma.ProjectWhereUniqueInput
    ): Promise<void>;
}
