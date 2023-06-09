import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/guards/auth.guard';

@Controller()
export class AppController {
    @Get()
    @Public()
    getHello(): string {
        return 'Welcome to the officia api!';
    }
}
