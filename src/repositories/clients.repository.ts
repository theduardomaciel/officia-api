import { Client as ClientModel, Prisma } from '@prisma/client';
import { ClientCreateDto, ClientUpdateDto } from 'src/dtos/Client';

export abstract class ClientsRepository {
    abstract getClient(
        ClientWhereUniqueInput: Prisma.ClientWhereUniqueInput
    ): Promise<ClientModel | null>;

    abstract getClients(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ClientWhereUniqueInput;
        where?: Prisma.ClientWhereInput;
        orderBy?: Prisma.ClientOrderByWithRelationInput;
    }): Promise<ClientModel[] | null>;

    abstract createClient(data: ClientCreateDto): Promise<ClientModel>;

    abstract updateClient(params: {
        where: Prisma.ClientWhereUniqueInput;
        data: ClientUpdateDto;
    }): Promise<ClientModel>;

    abstract deleteClient(where: Prisma.ClientWhereUniqueInput): Promise<void>;
}
