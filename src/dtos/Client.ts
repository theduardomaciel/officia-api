import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const ClientCreateSchema = z.object({
    name: z.string(),
    image_url: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    address: z.string().optional(),
    projectId: z.string()
});

const ClientUpdateSchema = ClientCreateSchema.partial();

// class is required for using DTO as a type
export class ClientCreateDto extends createZodDto(ClientCreateSchema) {}
export class ClientUpdateDto extends createZodDto(ClientUpdateSchema) {}
