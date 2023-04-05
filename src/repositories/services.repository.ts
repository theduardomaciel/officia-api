import { Prisma, Service as ServiceModel } from '@prisma/client';
import { ServiceCreateDto, ServiceUpdateDto } from 'src/dtos/Service';

export abstract class ServicesRepository {
    abstract getService(
        AccountWhereUniqueInput: Prisma.ServiceWhereUniqueInput
    ): Promise<ServiceModel | null>;

    abstract getServices(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ServiceWhereUniqueInput;
        where?: Prisma.ServiceWhereInput;
        orderBy?: Prisma.ServiceOrderByWithRelationInput;
    }): Promise<ServiceModel[] | null>;

    abstract createService(data: ServiceCreateDto): Promise<ServiceModel>;

    abstract updateService(params: {
        where: Prisma.ServiceWhereUniqueInput;
        data: ServiceUpdateDto;
    }): Promise<ServiceModel>;

    abstract deleteService(
        where: Prisma.ServiceWhereUniqueInput
    ): Promise<void>;
}
