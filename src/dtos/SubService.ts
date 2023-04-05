import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const SubServiceCreateSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().default(0),
    serviceId: z.string()
});

const SubServiceUpdateSchema = SubServiceCreateSchema.partial();

// class is required for using DTO as a type
export class SubServiceCreateDto extends createZodDto(SubServiceCreateSchema) {}
export class SubServiceUpdateDto extends createZodDto(SubServiceUpdateSchema) {}
