import { Material as MaterialModel, Prisma } from '@prisma/client';
import { MaterialCreateDto, MaterialUpdateDto } from 'src/dtos/Material';

export abstract class MaterialsRepository {
    abstract getMaterial(
        MaterialWhereUniqueInput: Prisma.MaterialWhereUniqueInput
    ): Promise<MaterialModel | null>;

    abstract getMaterials(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.MaterialWhereUniqueInput;
        where?: Prisma.MaterialWhereInput;
        orderBy?: Prisma.MaterialOrderByWithRelationInput;
    }): Promise<MaterialModel[] | null>;

    abstract createMaterial(data: MaterialCreateDto): Promise<MaterialModel>;

    abstract updateMaterial(params: {
        where: Prisma.MaterialWhereUniqueInput;
        data: MaterialUpdateDto;
    }): Promise<MaterialModel>;

    abstract deleteMaterial(
        where: Prisma.MaterialWhereUniqueInput
    ): Promise<void>;
}
