import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query
} from '@nestjs/common';

import {
    Account as AccountModel,
    Project as ProjectModel,
    Service as ServiceModel,
    SubService as SubServiceModel,
    Material as MaterialModel,
    Client as ClientModel
} from '@prisma/client';

import { AccountsRepository } from './repositories/accounts.repository';
import { AccountCreateDto, AccountUpdateDto } from './dtos/Account';

import { ServicesRepository } from './repositories/services.repository';
import { ServiceCreateDto, ServiceUpdateDto } from './dtos/Service';
import { ProjectCreateDto, ProjectUpdateDto } from './dtos/Project';
import { ProjectsRepository } from './repositories/projects.repository';

@Controller()
export class AppController {
    constructor(
        private readonly accountsRepository: AccountsRepository,
        private readonly servicesRepository: ServicesRepository,
        private readonly projectsRepository: ProjectsRepository
    ) {}

    @Get()
    getHello(): string {
        return 'Hello World!';
    }

    /* ============= ACCOUNT ================================================================================================= */
    @Get('account/:id')
    async getAccount(@Param('id') id: string): Promise<AccountModel | null> {
        return await this.accountsRepository.getAccount({ id: id });
    }

    @Get('account')
    async getAccounts(
        @Query('take') take: string
    ): Promise<AccountModel[] | null> {
        return await this.accountsRepository.getAccounts({
            take: take ? Number(take) : undefined
        });
    }

    @Post('account')
    async createAccount(
        @Body() userData: AccountCreateDto
    ): Promise<AccountModel> {
        return await this.accountsRepository.createAccount(userData);
    }

    @Put('account/:id')
    async updateAccount(
        @Param('id') id: string,
        @Body() userData: AccountUpdateDto
    ): Promise<AccountModel> {
        return await this.accountsRepository.updateAccount({
            where: { id },
            data: userData
        });
    }

    @Delete('account/:id')
    async deleteAccount(@Param('id') id: string): Promise<void> {
        return await this.accountsRepository.deleteAccount({ id });
    }

    /* ============= PROJECT ================================================================================================= */

    @Get('project/:id')
    async getProject(@Param('id') id: string): Promise<ProjectModel | null> {
        return await this.projectsRepository.getProject({ id: id });
    }

    @Get('project')
    async getProjects(
        @Query('take') take: string
    ): Promise<ProjectModel[] | null> {
        return await this.projectsRepository.getProjects({
            take: take ? Number(take) : undefined
        });
    }

    @Post('project')
    async createProject(
        @Body() userData: ProjectCreateDto
    ): Promise<ProjectModel> {
        return await this.projectsRepository.createProject(userData);
    }

    @Put('project/:id')
    async updateProject(
        @Param('id') id: string,
        @Body() userData: ProjectUpdateDto
    ): Promise<ProjectModel> {
        return await this.projectsRepository.updateProject({
            where: { id },
            data: userData
        });
    }

    @Delete('project/:id')
    async deleteProject(@Param('id') id: string): Promise<void> {
        return await this.projectsRepository.deleteProject({ id });
    }

    /* ============= SERVICE ================================================================================================= */
    @Get('service/:id')
    async getService(@Param('id') id: string): Promise<ServiceModel | null> {
        return await this.servicesRepository.getService({ id: id });
    }

    @Get('service')
    async getServices(
        @Query('take') take: string
    ): Promise<ServiceModel[] | null> {
        return await this.servicesRepository.getServices({
            take: take ? Number(take) : undefined
        });
    }

    @Post('service')
    async createService(
        @Body() userData: ServiceCreateDto
    ): Promise<ServiceModel> {
        return await this.servicesRepository.createService(userData);
    }

    @Put('service/:id')
    async updateService(
        @Param('id') id: string,
        @Body() userData: ServiceUpdateDto
    ): Promise<ServiceModel> {
        return await this.servicesRepository.updateService({
            where: { id },
            data: userData
        });
    }

    @Delete('service/:id')
    async deleteService(@Param('id') id: string): Promise<void> {
        return await this.servicesRepository.deleteService({ id });
    }

    /* ============= SUB SERVICE ================================================================================================= */

    /* ============= MATERIAL ================================================================================================= */

    /* ============= CLIENT ================================================================================================= */
}
