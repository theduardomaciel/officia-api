import {
    Controller,
    Get,
    Query,
    Post,
    Body,
    Put,
    Param,
    Delete,
    HttpException,
    HttpStatus
} from '@nestjs/common';

import { UseZodGuard } from 'nestjs-zod';

import { ProjectsRepository } from './projects.repository';
import {
    ProjectCreateDto,
    ProjectCreateSchema,
    ProjectUpdateDto,
    ProjectUpdateSchema
} from './dto/projects.dto';
import {
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation
} from '@nestjs/swagger';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsRepository: ProjectsRepository) {}

    @Get('project/:id')
    @ApiOperation({ summary: 'Get a project by id' })
    @ApiOkResponse({ description: 'Return a project by id' })
    @ApiNotFoundResponse({ description: 'Project not found' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    async getProject(@Param('id') id: string) {
        return await this.projectsRepository.getProject({ id: id });
    }

    @Get('project')
    @ApiOperation({
        summary: 'Get all projects or take an specified amount with query.'
    })
    @ApiOkResponse({
        description:
            'Return all projects or take an specified amount with query.'
    })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    async getProjects(@Query('take') take: string) {
        return await this.projectsRepository.getProjects({
            take: take ? Number(take) : undefined
        });
    }

    @Post('project')
    @ApiOperation({ summary: 'Create a project' })
    @ApiCreatedResponse({ description: 'Return the created project' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    @UseZodGuard('body', ProjectCreateSchema)
    async createProject(@Body() userData: ProjectCreateDto) {
        if (!userData) {
            throw new HttpException('No data provided', HttpStatus.BAD_REQUEST);
        }
        return await this.projectsRepository.createProject(userData);
    }

    @Put('project/:id')
    @ApiOperation({ summary: 'Update a project' })
    @ApiOkResponse({ description: 'Return the updated project' })
    @ApiNotFoundResponse({ description: 'Project not found' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    @UseZodGuard('body', ProjectUpdateSchema)
    async updateProject(
        @Param('id') id: string,
        @Body() userData: ProjectUpdateDto
    ) {
        if (!id) {
            throw new HttpException('No id provided', HttpStatus.BAD_REQUEST);
        }
        return await this.projectsRepository.updateProject({
            where: { id },
            data: userData
        });
    }

    @Delete('project/:id')
    @ApiOperation({ summary: 'Delete a project' })
    @ApiOkResponse({ description: 'Return void' })
    @ApiNotFoundResponse({ description: 'Project not found' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    async deleteProject(@Param('id') id: string): Promise<void> {
        if (!id) {
            throw new HttpException('No id provided', HttpStatus.BAD_REQUEST);
        }
        return await this.projectsRepository.deleteProject({ id });
    }
}
