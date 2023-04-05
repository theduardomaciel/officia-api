import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const AccountCreateSchema = z.object({
    email: z
        .string({
            required_error: 'O e-mail é obrigatório para criação da conta.'
        })
        .email(),
    password: z
        .string()
        .min(8, { message: ' A senha deve ter no mínimo 8 caracteres.' }),
    image_url: z.string().url().optional(),
    name: z.string().min(1).max(50),
    role: z.string().min(1).max(50).optional(),
    phone: z.string().optional(),
    birthday: z.date().optional(),
    gender: z.string().optional(),
    pin: z.string()
});

const AccountUpdateSchema = AccountCreateSchema.partial();

// class is required for using DTO as a type
export class AccountCreateDto extends createZodDto(AccountCreateSchema) {}
export class AccountUpdateDto extends createZodDto(AccountUpdateSchema) {}
