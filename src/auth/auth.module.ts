import { Module, Provider } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthHelper } from './auth.helper';

import { AuthRepository } from './auth.repository';

import { AccountsModule } from 'src/accounts/accounts.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        AccountsModule,
        JwtModule.register({
            global: true,
            secret: process.env.AUTH_SECRET,
            signOptions: {
                expiresIn: '1d'
            }
        })
    ],
    providers: [AuthHelper, AuthService, AuthRepository as Provider],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
