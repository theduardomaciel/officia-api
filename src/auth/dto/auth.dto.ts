import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CodeSchema = z.object({
    email: z
        .string({
            required_error: 'O e-mail é obrigatório para O envio de um código.'
        })
        .email()
});

// class is required for using DTO as a type
export class CodeDto extends createZodDto(CodeSchema) {}
