import { Currency } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const ARRAY_OF_CURRENCIES = Object.values(Currency);

export const ProjectCreateSchema = z.object({
    // Basic Info
    name: z.string(),
    socialReason: z.string().optional(),
    juridicalPerson: z.string().optional(),
    segmentsData: z.array(z.json()).optional(), //

    // Additional Info
    defaultAdditionalInfo: z.string().optional(),
    defaultWarrantyDetails: z.string().optional(),

    defaultOrderString: z.enum(['order', 'service']).optional(),
    defaultProductString: z.enum(['product', 'service']).optional(),

    digitalSignature_url: z.string().optional(),

    // Service
    businessModel: z
        .array(z.enum(['in_person', 'online', 'delivery']))
        .optional(), // transform to BusinessModel[]
    agenda: z
        .array(
            z.enum([
                'sunday',
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday'
            ])
        )
        .optional(), // transform to WeekDay[]
    autoHolidayUnavailability: z.boolean().optional(),
    busyAmount: z.number().optional(),
    unavailableAmount: z.number().optional(),
    serviceZoneCountries: z.array(z.string()).optional(),
    serviceZoneStates: z.array(z.string()).optional(),
    serviceZoneCities: z.array(z.string()).optional(),

    // Contact
    email: z.string().optional(),
    phone1: z.string().optional(),
    phone2: z.string().optional(),
    website: z.string().optional(),
    socialMedia: z.json().optional(),

    // Branding
    logo_url: z.string().optional(),
    banner_url: z.string().optional(),
    primaryColor: z.string().optional(),
    secondaryColor: z.string().optional(),

    marketplaceData: z.json().optional(),

    accountId: z.string()
});

export const ProjectUpdateSchema = ProjectCreateSchema.partial().and(
    z
        .object({
            // Security
            isVerified: z.boolean().optional(),
            reportCostumerAccountId: z.string().cuid().optional(),

            // Address
            address: z.json().optional(),

            // Payments
            defaultPaymentMethods: z.array(z.string()).optional(),
            currency: z.enum(ARRAY_OF_CURRENCIES as unknown as any).optional(),
            bankAccount: z.json().optional(),
            pix: z.json().optional(),

            // Relations
            ordersIds: z.array(z.string().cuid()).optional(), //
            categoriesIds: z.array(z.string().cuid()).optional(), //

            // Catalog
            catalogedMaterialsIds: z.array(z.string().cuid()).optional(), //
            catalogedProductsIds: z.array(z.string().cuid()).optional(), //
            catalogedClientsIds: z.array(z.string().cuid()).optional() //
        })
        .partial()
);

// class is required for using DTO as a type
export class ProjectCreateDto extends createZodDto(ProjectCreateSchema) {}
export class ProjectUpdateDto extends createZodDto(ProjectUpdateSchema) {}
