import { SubService as SubServiceModel, Prisma } from '@prisma/client';
import { SubServiceCreateDto, SubServiceUpdateDto } from 'src/dtos/SubService';

export abstract class SubServicesRepository {
    abstract getSubService(
        SubServiceWhereUniqueInput: Prisma.SubServiceWhereUniqueInput
    ): Promise<SubServiceModel | null>;

    abstract getSubServices(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.SubServiceWhereUniqueInput;
        where?: Prisma.SubServiceWhereInput;
        orderBy?: Prisma.SubServiceOrderByWithRelationInput;
    }): Promise<SubServiceModel[] | null>;

    abstract createSubService(
        data: SubServiceCreateDto
    ): Promise<SubServiceModel>;

    abstract updateSubService(params: {
        where: Prisma.SubServiceWhereUniqueInput;
        data: SubServiceUpdateDto;
    }): Promise<SubServiceModel>;

    abstract deleteSubService(
        where: Prisma.SubServiceWhereUniqueInput
    ): Promise<void>;
}
