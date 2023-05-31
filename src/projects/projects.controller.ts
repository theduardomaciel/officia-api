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
    HttpStatus,
    Patch
} from '@nestjs/common';

import { UseZodGuard } from 'nestjs-zod';
import { Public } from 'src/auth/guards/auth.guard';

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
    ApiOperation,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsRepository: ProjectsRepository) {}

    @Public()
    @Get('segments')
    @ApiOperation({ summary: 'Get all segments categories' })
    @ApiOkResponse({ description: 'Return all segments categories' })
    async getSegments() {
        return await this.projectsRepository.getSegments();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a project by id' })
    @ApiOkResponse({ description: 'Return a project by id' })
    @ApiNotFoundResponse({ description: 'Project not found' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async getProject(@Param('id') id: string) {
        return await this.projectsRepository.getProject({ id: id });
    }

    @Get()
    @ApiOperation({
        summary: 'Get all projects or take an specified amount with query.'
    })
    @ApiOkResponse({
        description:
            'Return all projects or take an specified amount with query.'
    })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async getProjects(@Query('take') take: string) {
        return await this.projectsRepository.getProjects({
            take: take ? Number(take) : undefined
        });
    }

    @Post()
    @ApiOperation({ summary: 'Create a project' })
    @ApiCreatedResponse({ description: 'Return the created project' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @UseZodGuard('body', ProjectCreateSchema)
    async createProject(@Body() body: ProjectCreateDto) {
        if (!body) {
            throw new HttpException('No data provided', HttpStatus.BAD_REQUEST);
        }
        return await this.projectsRepository.createProject(body);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a project' })
    @ApiOkResponse({ description: 'Return the updated project' })
    @ApiNotFoundResponse({ description: 'Project not found' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
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

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a project' })
    @ApiOkResponse({ description: 'Return void' })
    @ApiNotFoundResponse({ description: 'Project not found' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async deleteProject(@Param('id') id: string): Promise<void> {
        if (!id) {
            throw new HttpException('No id provided', HttpStatus.BAD_REQUEST);
        }
        return await this.projectsRepository.deleteProject({ id });
    }
}
