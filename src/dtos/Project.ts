import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const ProjectCreateSchema = z.object({
    name: z.string(),
    socialReason: z.string(),
    juridicalPerson: z.string(),
    email: z.string(),
    logo_url: z.string().optional(),
    digitalSignature_url: z.string().optional(),
    address: z.string(),
    phone1: z.string(),
    phone2: z.string().optional(),
    website: z.string().optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    tiktok: z.string().optional(),
    bankAccount: z.string().optional(),
    pixKey: z.string().optional(),
    defaultAdditionalInfo: z.string().optional(),
    defaultWarrantyDetails: z.string().optional(),
    accountId: z.string()
});

const ProjectUpdateSchema = ProjectCreateSchema.partial();

// class is required for using DTO as a type
export class ProjectCreateDto extends createZodDto(ProjectCreateSchema) {}
export class ProjectUpdateDto extends createZodDto(ProjectUpdateSchema) {}
