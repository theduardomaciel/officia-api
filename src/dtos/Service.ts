import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const ServiceCreateSchema = z.object({
    name: z.string().min(1),
    date: z.date().optional(),
    price: z.number().min(0).optional(),
    status: z
        .enum([
            'pending',
            'archived',
            'awaiting_payment',
            'warranty',
            'concluded',
            'cancelled'
        ])
        .default('pending'),
    additionalInfo: z.string().optional(),
    paymentCondition: z.enum(['cash', 'card', 'agreement']).default('cash'),
    paymentMethods: z.string().optional(),
    splitValue: z.string().optional(),
    splitInitialValue: z.string().optional(),
    warrantyPeriod: z.number().optional().default(90),
    warrantyDetails: z.string().optional(),
    invoiceValidity: z.number().optional().default(15),
    discount: z.number().optional().default(0),
    clientId: z.string().cuid().optional(),
    projectId: z.string().cuid()
});

const ServiceUpdateSchema = ServiceCreateSchema.partial().omit({
    projectId: true
});

// class is required for using DTO as a type
export class ServiceCreateDto extends createZodDto(ServiceCreateSchema) {}
export class ServiceUpdateDto extends createZodDto(ServiceUpdateSchema) {}
