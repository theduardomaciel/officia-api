import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';

import { AccountsService } from 'src/accounts/accounts.service';

import { AuthRepository } from './auth.repository';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthService implements AuthRepository {
    constructor(
        private accountsService: AccountsService,
        private authHelper: AuthHelper
    ) {}

    // Validate user from userID in decode()
    public async validateUser(decoded: { id: string }) {
        return this.accountsService.getAccount({ id: decoded.id });
    }

    // Validate JWT Token, throw forbidden error if JWT Token is invalid
    public async validate(token: string): Promise<boolean | never> {
        try {
            const decoded: any = this.authHelper.decode(token);

            if (!decoded) {
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            }
            const user = await this.validateUser(decoded);
            if (!user) {
                throw new UnauthorizedException();
            }
            return true;
        } catch (err) {
            throw new HttpException(
                err.message.toUpperCase(),
                HttpStatus.FORBIDDEN
            );
        }
    }

    async verify(email: string) {
        const code = Math.random().toString(36).substring(2, 6).toUpperCase();

        console.log('Email sent to: ', email);
        console.log('Verification code: ', code);

        // TODO: Send email

        return code;
    }
}
