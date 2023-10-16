import { Changes, SyncPullDto } from './dto/sync.dto';

export abstract class SyncRepository {
    abstract pull({
        lastPulledAt,
        schemaVersion,
        migration
    }: SyncPullDto): Promise<{ changes: Changes; timestamp: number }>;

    abstract push(
        changes: Changes,
        lastPulledAT: number
    ): Promise<{ timestamp: number }>;
}
