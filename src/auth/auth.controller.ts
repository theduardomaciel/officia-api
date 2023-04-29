import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { UseZodGuard } from 'nestjs-zod';

import { AuthRepository } from './auth.repository';
import { CodeDto, CodeSchema } from './dto/auth.dto';
import { Public } from './guards/auth.guard';
import {
    ApiBadRequestResponse,
    ApiOkResponse,
    ApiOperation
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authRepository: AuthRepository) {}

    @Post('verify/email')
    @Public()
    @ApiOperation({
        summary: 'Send and returns a verification code to a given e-mail'
    })
    @ApiOkResponse({ description: 'Verification code sent.' })
    @ApiBadRequestResponse({ description: 'Invalid e-mail.' })
    @HttpCode(200)
    @UseZodGuard('body', CodeSchema)
    async verifyEmail(@Body() body: CodeDto) {
        return await this.authRepository.verifyEmail(body.email);
    }
}
