import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { UseZodGuard } from 'nestjs-zod';

import { AuthRepository } from './auth.repository';
import {
    VerifyEmailDto,
    VerifyEmailSchema,
    VerifyPasswordDto,
    VerifyPasswordSchema
} from './dto/auth.dto';
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
    @UseZodGuard('body', VerifyEmailSchema)
    async verifyEmail(@Body() body: VerifyEmailDto) {
        return await this.authRepository.verifyEmail(body.email);
    }

    @Post('verify/password')
    @Public()
    @ApiOperation({
        summary: 'Check if a given password is valid for a given e-mail'
    })
    @ApiOkResponse({ description: 'Password is valid.' })
    @ApiBadRequestResponse({ description: 'Invalid e-mail, id or password.' })
    @HttpCode(200)
    @UseZodGuard('body', VerifyPasswordSchema)
    async verifyPassword(@Body() body: VerifyPasswordDto) {
        return await this.authRepository.verifyPassword({
            email: body.email,
            password: body.password,
            id: body.id
        });
    }
}
