import { Controller, Post, Body } from '@nestjs/common';
import { UseZodGuard } from 'nestjs-zod';

import { AuthRepository } from './auth.repository';
import { CodeDto, CodeSchema } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authRepository: AuthRepository) {}

    @Post('verify')
    @UseZodGuard('body', CodeSchema)
    async verify(@Body() body: CodeDto) {
        return await this.authRepository.verify(body.email);
    }
}
