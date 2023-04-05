import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const MaterialCreateSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    image_url: z.string().optional(),
    price: z.number().default(0),
    amount: z.number().default(1),
    profitMargin: z.number().default(0),
    availability: z.boolean().optional(),
    bookmarked: z.boolean().optional(),
    projectId: z.string()
});

const MaterialUpdateSchema = MaterialCreateSchema.partial();

// class is required for using DTO as a type
export class MaterialCreateDto extends createZodDto(MaterialCreateSchema) {}
export class MaterialUpdateDto extends createZodDto(MaterialUpdateSchema) {}
