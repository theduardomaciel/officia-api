import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const VerifyEmailSchema = z.object({
    email: z
        .string({
            required_error: 'O e-mail é obrigatório para o envio de um código.'
        })
        .email()
});

// class is required for using DTO as a type
export class VerifyEmailDto extends createZodDto(VerifyEmailSchema) {}

export const VerifyPasswordSchema = z.object({
    email: z
        .string({
            required_error:
                'O e-mail é obrigatório para a verificação da senha.'
        })
        .email(),
    password: z.string({
        required_error: 'A senha é obrigatória para a verificação da senha.'
    }),
    id: z.string({
        required_error: 'O id é obrigatório para a verificação da senha.'
    })
});

// class is required for using DTO as a type
export class VerifyPasswordDto extends createZodDto(VerifyPasswordSchema) {}
