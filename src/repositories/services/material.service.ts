import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Material, Prisma } from '@prisma/client';

import { MaterialsRepository } from '../materials.repository';
import { MaterialCreateDto } from 'src/dtos/Material';

@Injectable()
export class MaterialService implements MaterialsRepository {
    constructor(private prisma: PrismaService) {}

    async getMaterial(
        MaterialWhereUniqueInput: Prisma.MaterialWhereUniqueInput
    ): Promise<Material | null> {
        return this.prisma.material.findUnique({
            where: MaterialWhereUniqueInput
        });
    }

    async getMaterials(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.MaterialWhereUniqueInput;
        where?: Prisma.MaterialWhereInput;
        orderBy?: Prisma.MaterialOrderByWithRelationInput;
    }): Promise<Material[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.material.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy
        });
    }

    async createMaterial(data: MaterialCreateDto): Promise<Material> {
        return this.prisma.material.create({
            data
        });
    }

    async updateMaterial(params: {
        where: Prisma.MaterialWhereUniqueInput;
        data: Prisma.MaterialUpdateInput;
    }): Promise<Material> {
        const { where, data } = params;
        return this.prisma.material.update({
            data,
            where
        });
    }

    async deleteMaterial(
        where: Prisma.MaterialWhereUniqueInput
    ): Promise<void> {
        await this.prisma.material.delete({
            where
        });
    }
}
