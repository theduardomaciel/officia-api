import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';

import { AccountsService } from 'src/accounts/accounts.service';

import { AuthRepository } from './auth.repository';
import { AuthHelper } from './auth.helper';
import { Account } from '@prisma/client';

@Injectable()
export class AuthService implements AuthRepository {
    constructor(
        private accountsService: AccountsService,
        private authHelper: AuthHelper
    ) {}

    // Validate account from accountID in decode()
    public async validateUser(decoded: { id: string }) {
        return this.accountsService.getAccount({ id: decoded.id });
    }

    // Validate JWT Token, throw forbidden error if JWT Token is invalid
    public async validate(token: string): Promise<Account | never> {
        try {
            const isValid = await this.authHelper.verifyToken(token);
            if (!isValid) {
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            }

            const decoded: any = await this.authHelper.decodeToken(token);
            if (!decoded) {
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            }
            const account = await this.validateUser(decoded);
            if (!account) {
                throw new UnauthorizedException();
            } else {
                return account;
            }
        } catch (err) {
            throw new HttpException(
                err.message.toUpperCase(),
                HttpStatus.FORBIDDEN
            );
        }
    }

    async verifyEmail(email: string) {
        const code = Math.random().toString(36).substring(2, 6).toUpperCase();

        console.log('Email sent to: ', email);
        console.log('Verification code: ', code);

        // TODO: Send email

        return code;
    }
}
