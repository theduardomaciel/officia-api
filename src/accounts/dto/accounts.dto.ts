import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const AccountCreateSchema = z.object({
    email: z
        .string({
            required_error: 'O e-mail é obrigatório para criação da conta.'
        })
        .email(),
    password: z
        .password()
        .min(8, { message: ' A senha deve ter no mínimo 8 caracteres.' }),
    image_url: z.string().url().optional(),
    name: z
        .string()
        .min(1)
        .max(50)
        .describe("Account's full name separated by spaces."),
    phone: z.string().optional(),
    birthday: z.dateString().past(),
    gender: z.enum(['male', 'female', 'other']).optional(),
});

export const AccountSchema = AccountCreateSchema.partial().and(
    z.object({
        selectedProjectId: z.string().cuid().optional(),
        disabledAt: z.date().optional(),
        planExpiresAt: z.date().optional(),
        isRecurringPaymentActive: z.boolean().optional(),
        image_url: z.string().url().optional()
    })
);

// class is required for using DTO as a type
export class AccountCreateDto extends createZodDto(AccountCreateSchema) {}
export class AccountDto extends createZodDto(AccountSchema) {}

export const AccountCheckSchema = z.object({
    email: z.string().email()
});

export class AccountCheckDto extends createZodDto(AccountCheckSchema) {}

export const AccountSignInSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

export class AccountSignInDto extends createZodDto(AccountSignInSchema) {}
