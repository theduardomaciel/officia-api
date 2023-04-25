import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    HttpException,
    HttpStatus,
    HttpCode
} from '@nestjs/common';

import {
    AccountCheckDto,
    AccountCheckSchema,
    AccountCreateDto,
    AccountCreateSchema,
    AccountUpdateDto,
    AccountUpdateSchema
} from './dto/accounts.dto';
import { AccountsRepository } from './accounts.repository';

import {
    ApiBadRequestResponse,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiResponse
} from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { UseZodGuard } from 'nestjs-zod';

import { Public } from 'src/auth/auth.guard';
import { AuthHelper } from 'src/auth/auth.helper';

@SkipThrottle(false)
@Controller('accounts')
export class AccountsController {
    constructor(
        private readonly accountsRepository: AccountsRepository,
        private readonly authHelper: AuthHelper
    ) {}

    @ApiOperation({ summary: 'Get account by id' })
    @ApiResponse({ status: 200, description: 'Return account by id' })
    @ApiResponse({ status: 404, description: 'Account not found' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @Get('account/:id')
    async getAccount(@Param('id') id: string) {
        const response = await this.accountsRepository.getAccount({ id });
        if (response) {
            return response;
        } else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }

    @Post('account/check')
    @Public()
    @ApiOperation({ summary: 'Check if account exists' })
    @ApiResponse({
        status: 200,
        description:
            'Returns a true boolean indicating if an account was found with the provided data'
    })
    @ApiBadRequestResponse({ description: 'Bad Request.' })
    @ApiResponse({ status: 404, description: 'Account not found.' })
    @UseZodGuard('body', AccountCheckSchema)
    @HttpCode(200)
    async checkAccount(@Body() body: AccountCheckDto) {
        if (!body)
            throw new HttpException('No data provided', HttpStatus.BAD_REQUEST);
        return await this.accountsRepository.checkAccount({
            email: body.email
        });
    }

    @Post('account')
    @SkipThrottle(true)
    @ApiOperation({
        summary:
            'Authenticates the user account, logging or creating a new account, while returning a access_token that provides api access.'
    })
    @ApiResponse({
        status: 200,
        description:
            'Returns an account object with a access_token property that provides api access.'
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBadRequestResponse({ description: 'Bad Request.' })
    @UseZodGuard('body', AccountCreateSchema)
    async authenticate(
        @Body()
        userData: AccountCreateDto
    ) {
        if (!userData)
            throw new HttpException('No data provided', HttpStatus.BAD_REQUEST);

        const account = await this.accountsRepository.getAccount(
            {
                email: userData.email
            },
            { projects: true }
        );

        if (account) {
            const isPasswordValid = this.authHelper.isPasswordValid(
                account.password,
                userData.password
            );
            if (isPasswordValid) {
                return account;
            } else {
                throw new HttpException(
                    'Wrong or invalid password',
                    HttpStatus.UNAUTHORIZED
                );
            }
        } else {
            if (!userData) {
                throw new HttpException(
                    'No data provided',
                    HttpStatus.BAD_REQUEST
                );
            }

            return await this.accountsRepository.createAccount({
                ...userData
            });
        }
    }

    @Put('account/:id')
    @ApiOperation({ summary: 'Updates an account with the given id.' })
    @ApiResponse({
        status: 200,
        description:
            'Returns a true boolean indicating if an account was found with the provided data'
    })
    @ApiResponse({
        status: 404,
        description: 'Account not found with the given id.'
    })
    @UseZodGuard('body', AccountUpdateSchema)
    async updateAccount(
        @Param('id') id: string,
        @Body() userData: AccountUpdateDto
    ) {
        if (!id) {
            throw new HttpException('No id provided', HttpStatus.BAD_REQUEST);
        }
        return await this.accountsRepository.updateAccount({
            where: { id },
            data: userData
        });
    }

    @Delete('account/:id')
    @ApiOperation({ summary: 'Deletes an account with the given id.' })
    @ApiOkResponse({ description: 'Returns void if the account was deleted.' })
    @ApiResponse({
        status: 404,
        description: 'Account not found with the given id.'
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async deleteAccount(@Param('id') id: string) {
        if (!id) {
            throw new HttpException('No id provided', HttpStatus.BAD_REQUEST);
        }
        return await this.accountsRepository.deleteAccount({ id });
    }
}
