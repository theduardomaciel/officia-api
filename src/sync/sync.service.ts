import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { SyncRepository } from './sync.repository';
import { Changes, SyncPullDto } from 'src/sync/dto/sync.dto';

const tables_names = ['projects', 'clients', 'materials', 'products', 'orders'];

@Injectable()
export class SyncService implements SyncRepository {
    constructor(private prisma: PrismaService) {}

    async pull({ lastPulledAt: last, schemaVersion, migration }: SyncPullDto) {
        // Esse timestamp tem que ser salvo no início da requisição, antes de qualquer requisição assíncrona ser feita
        const newLastPulledAt = new Date();
        const lastPulledAt = last || new Date(0);

        try {
            const pulled_changes = await this.prisma.$transaction([
                this.prisma.project.findMany({
                    where: {
                        lastModifiedAt: {
                            gt: lastPulledAt
                        }
                    }
                }),
                this.prisma.costumer.findMany({
                    where: {
                        lastModifiedAt: {
                            gt: lastPulledAt
                        }
                    }
                }),
                this.prisma.material.findMany({
                    where: {
                        lastModifiedAt: {
                            gt: lastPulledAt
                        }
                    }
                }),
                this.prisma.product.findMany({
                    where: {
                        lastModifiedAt: {
                            gt: lastPulledAt
                        }
                    }
                }),
                this.prisma.order.findMany({
                    where: {
                        lastModifiedAt: {
                            gt: lastPulledAt
                        }
                    }
                })
            ]);

            const changes: Changes = pulled_changes.reduce(
                (acc: Changes, modelChanges: any[], index) => {
                    const table_name = tables_names[index];

                    console.log(
                        `Processing ${modelChanges.length} records for ${table_name}`
                    );

                    acc[table_name] = {
                        created: modelChanges.filter(
                            (record) => record.createdAt > lastPulledAt
                        ),
                        updated: modelChanges.filter(
                            (record) => record.createdAt <= lastPulledAt
                        ),
                        deleted: modelChanges.map((record) => record.id)
                    };

                    console.log(
                        `Created ${acc[table_name].created.length} records`
                    );
                    console.log(
                        `Updated ${acc[table_name].updated.length} records`
                    );
                    console.log(
                        `Deleted ${acc[table_name].deleted.length} records`
                    );

                    return acc;
                },
                {}
            );

            // Após obtermos as mudanças, deletamos os registros que foram marcados como deletados no servidor
            await this.prisma.$transaction([
                this.prisma.project.deleteMany({
                    where: {
                        isDeleted: true
                    }
                }),
                this.prisma.costumer.deleteMany({
                    where: {
                        isDeleted: true
                    }
                }),
                this.prisma.material.deleteMany({
                    where: {
                        isDeleted: true
                    }
                }),
                this.prisma.product.deleteMany({
                    where: {
                        isDeleted: true
                    }
                }),
                this.prisma.order.deleteMany({
                    where: {
                        isDeleted: true
                    }
                })
            ]);

            return {
                changes,
                timestamp: newLastPulledAt.getTime()
            };
        } catch (error) {
            console.log(error);
            throw new HttpException('Erro ao sincronizar com o servidor', 500);
        }
    }

    async push(changes: Changes) {
        const { projects, clients, materials, products, orders } = changes;

        try {
            await this.prisma.$transaction([
                // Projects
                this.prisma.project.createMany({
                    data: {
                        ...projects.created,
                        serverCreatedAt: new Date()
                    }
                }),
                this.prisma.project.updateMany({
                    where: {
                        id: {
                            in: projects.updated.map((record) => record.id)
                        }
                    },
                    data: projects.updated
                }),
                this.prisma.project.deleteMany({
                    where: {
                        id: {
                            in: projects.deleted
                        }
                    }
                }),

                // Costumers
                this.prisma.costumer.createMany({
                    data: {
                        ...clients.created,
                        serverCreatedAt: new Date()
                    }
                }),
                this.prisma.costumer.updateMany({
                    where: {
                        id: {
                            in: clients.updated.map((record) => record.id)
                        }
                    },
                    data: clients.updated
                }),
                this.prisma.costumer.deleteMany({
                    where: {
                        id: {
                            in: clients.deleted
                        }
                    }
                }),

                // Materials
                this.prisma.material.createMany({
                    data: {
                        ...materials.created,
                        serverCreatedAt: new Date()
                    }
                }),
                this.prisma.material.updateMany({
                    where: {
                        id: {
                            in: materials.updated.map((record) => record.id)
                        }
                    },
                    data: materials.updated
                }),
                this.prisma.material.deleteMany({
                    where: {
                        id: {
                            in: materials.deleted
                        }
                    }
                }),

                // Products
                this.prisma.product.createMany({
                    data: {
                        ...products.created,
                        serverCreatedAt: new Date()
                    }
                }),
                this.prisma.product.updateMany({
                    where: {
                        id: {
                            in: products.updated.map((record) => record.id)
                        }
                    },
                    data: products.updated
                }),
                this.prisma.product.deleteMany({
                    where: {
                        id: {
                            in: products.deleted
                        }
                    }
                }),

                // Orders
                this.prisma.order.createMany({
                    data: {
                        ...orders.created,
                        serverCreatedAt: new Date()
                    }
                }),
                this.prisma.order.updateMany({
                    where: {
                        id: {
                            in: orders.updated.map((record) => record.id)
                        }
                    },
                    data: orders.updated
                }),
                this.prisma.order.deleteMany({
                    where: {
                        id: {
                            in: orders.deleted
                        }
                    }
                })
            ]);

            return {
                timestamp: new Date().getTime()
            };
        } catch (error) {
            console.log(error);
            throw new HttpException('Erro ao sincronizar com o servidor', 500);
        }
    }
}
