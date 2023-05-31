import { Changes, SyncPullDto } from './dto/sync.dto';

export abstract class SyncRepository {
    abstract pull({
        lastPulledAt,
        schemaVersion,
        migration
    }: SyncPullDto): Promise<{ changes: Changes; timestamp: Date }>;

    abstract push(changes: Changes): Promise<{ timestamp: Date }>;
}
