import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    HttpException,
    HttpStatus,
    Patch,
    Query,
    UseGuards
} from '@nestjs/common';

import {
    AccountCreateDto,
    AccountDto,
    AccountSchema
} from './dto/accounts.dto';
import { AccountsRepository } from './accounts.repository';

import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiResponse
} from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { UseZodGuard } from 'nestjs-zod';

import { Public } from 'src/auth/guards/auth.guard';
import { AuthHelper } from 'src/auth/auth.helper';
import { MobileGuard } from 'src/auth/guards/mobile.guard';

@SkipThrottle(false)
@Controller('accounts')
export class AccountsController {
    constructor(
        private readonly accountsRepository: AccountsRepository,
        private readonly authHelper: AuthHelper
    ) {}

    /* AUTHENTICATION */
    @Public()
    @Post()
    @SkipThrottle(true)
    @ApiOperation({
        summary:
            'Authenticates the user account, logging or creating a new account, while returning an access_token that provides api access.'
    })
    @ApiCreatedResponse({ description: 'Returns the account logged/created.' })
    @ApiBadRequestResponse({ description: 'Bad Request.' })
    @ApiForbiddenResponse({ description: 'Account disabled' })
    @UseZodGuard('body', AccountSchema)
    async authenticate(
        @Body()
        userData: AccountDto
    ) {
        if (!userData || !userData.email || !userData.password)
            throw new HttpException(
                'No enough data provided',
                HttpStatus.BAD_REQUEST
            );

        const account = await this.accountsRepository.getAccount(
            {
                email: userData.email
            },
            { projects: true }
        );

        if (account) {
            if (account.disabledAt) {
                await this.accountsRepository.updateAccount({
                    where: { id: account.id },
                    data: { disabledAt: undefined }
                });
            }

            const isPasswordValid = this.authHelper.isPasswordValid(
                userData.password,
                account.password
            );

            if (isPasswordValid) {
                const access_token = await this.authHelper.generateToken(
                    account.id,
                    account.email
                );

                return {
                    body: account,
                    access_token
                };
            } else {
                throw new HttpException(
                    'Wrong or invalid password',
                    HttpStatus.UNAUTHORIZED
                );
            }
        } else {
            try {
                const { password, ...rest } =
                    userData as AccountCreateDto;

                const hashedPassword = this.authHelper.encodePassword(password);

                const newAccount = await this.accountsRepository.createAccount({
                    ...rest,
                    password: hashedPassword
                });

                const access_token = await this.authHelper.generateToken(
                    newAccount.id,
                    newAccount.email
                );

                console.log(
                    'New account created: ',
                    newAccount.email,
                    access_token
                );

                return {
                    body: newAccount,
                    access_token
                };
            } catch (error) {
                console.log(error);
                throw new HttpException(
                    'Error creating account. You may not have provided all the required data.',
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
        }
    }

    @Get()
    @Public()
    @UseGuards(MobileGuard)
    @ApiOperation({ summary: 'Get query specified account.' })
    @ApiOkResponse({ description: 'Returns the desired account.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async getAccounts(@Query('email') email: string) {
        return await this.accountsRepository.findUnique({
            email
        });
    }

    @Patch(':id')
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
    @UseZodGuard('body', AccountDto)
    async updateAccount(@Param('id') id: string, @Body() userData: AccountDto) {
        if (!id) {
            throw new HttpException('No id provided', HttpStatus.BAD_REQUEST);
        }

        const { password, ...rest } = userData;

        if (password) {
            const hashedPassword = this.authHelper.encodePassword(password);
            userData = { ...rest, password: hashedPassword };
        }

        return await this.accountsRepository.updateAccount({
            where: { id },
            data: userData
        });
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Disables an account with the given id.' })
    @ApiOkResponse({
        description: 'Returns true if the account was successfully disabled.'
    })
    @ApiResponse({
        status: 404,
        description: 'Account not found with the given id.'
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async deleteAccount(@Param('id') id: string) {
        if (!id) {
            throw new HttpException('No id provided', HttpStatus.BAD_REQUEST);
        }

        const disabledAccount = await this.accountsRepository.updateAccount({
            where: { id },
            data: { disabledAt: new Date() }
        });

        if (disabledAccount) {
            return true;
        }
        /* return await this.accountsRepository.deleteAccount({ id }); */
    }
}
