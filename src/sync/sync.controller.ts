import { Controller, Get, Query, Post, Body } from '@nestjs/common';

import { UseZodGuard } from 'nestjs-zod';

import { SyncRepository } from './sync.repository';
import { Changes, SyncPullDto, SyncPullSchema } from './dto/sync.dto';

import {
    ApiOkResponse,
    ApiOperation,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';

@Controller('sync')
export class SyncController {
    constructor(private readonly syncRepository: SyncRepository) {}

    @Get()
    @ApiOperation({ summary: 'Pull changes from server' })
    @ApiOkResponse({ description: 'Changes pulled successfully' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @UseZodGuard('query', SyncPullSchema)
    async pull(@Query() query: SyncPullDto) {
        return await this.syncRepository.pull({ ...query });
    }

    @Post()
    @ApiOperation({ summary: 'Push changes to server' })
    @ApiOkResponse({ description: 'Changes pushed successfully' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async push(
        @Body() body: Changes,
        @Query('lastPulledAt') lastPulledAt: string
    ) {
        return await this.syncRepository.push(body, parseInt(lastPulledAt));
    }
}
