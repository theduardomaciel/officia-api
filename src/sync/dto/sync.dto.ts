import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const SyncPullSchema = z.object({
    lastPulledAt: z.date().optional(),
    schemaVersion: z.number().optional(),
    migration: z
        .object({
            from: z.number(),
            tables: z.array(z.string()),
            columns: z.array(
                z.object({
                    table: z.string(),
                    columns: z.array(z.string())
                })
            )
        })
        .optional()
});

// class is required for using DTO as a type
export class SyncPullDto extends createZodDto(SyncPullSchema) {}

export interface Changes {
    [table_name: string]: {
        created: any[];
        updated: any[];
        deleted: string[];
    };
}
