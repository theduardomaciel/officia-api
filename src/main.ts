import { NestFactory } from '@nestjs/core';

import {
    FastifyAdapter,
    NestFastifyApplication
} from '@nestjs/platform-fastify';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { patchNestJsSwagger } from 'nestjs-zod';
patchNestJsSwagger();

import { AppModule } from './app.module';

const CORS_OPTIONS = {
    origin: ['https://officia.vercel.app', 'http://localhost:3000'], // or '*' or whatever is required
    allowedHeaders: [
        'Access-Control-Allow-Origin',
        'Origin',
        'X-Requested-With',
        'Accept',
        'Content-Type',
        'Authorization'
    ],
    exposedHeaders: 'Authorization',
    credentials: true,
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'PATCH', 'DELETE']
};

async function bootstrap() {
    const adapter = new FastifyAdapter();
    adapter.enableCors(CORS_OPTIONS);

    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        adapter
    );

    const config = new DocumentBuilder()
        .setTitle('officia')
        .setDescription(
            'This is provisional official documentation for the officia app.'
        )
        .setVersion('0.1')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000, '0.0.0.0');
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
