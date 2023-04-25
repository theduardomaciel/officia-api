import { Inject, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthHelper {
    constructor(@Inject(JwtService) private jwtService: JwtService) {}

    // Generate JWT token
    public async generateToken(email: string): Promise<string> {
        return await this.jwtService.signAsync({
            email: email
        });
    }

    // Decoding JWT token
    public async decode(token: string): Promise<any> {
        return this.jwtService.decode(token);
    }

    public async verify(token: string): Promise<boolean> {
        try {
            await this.jwtService.verify(token, {
                secret: process.env.AUTH_SECRET
            });
        } catch (err) {
            return false;
        }
        return true;
    }

    // Validate user password
    public isPasswordValid(password: string, userPassword: string): boolean {
        return bcrypt.compareSync(password, userPassword);
    }

    // Encode user's password
    public encodePassword(password: string): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
}
