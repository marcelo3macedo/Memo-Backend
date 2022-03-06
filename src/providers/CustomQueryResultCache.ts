import { Connection, QueryRunner } from "typeorm";
import { QueryResultCache } from "typeorm/cache/QueryResultCache";
import { QueryResultCacheOptions } from "typeorm/cache/QueryResultCacheOptions";
import CacheManager from "@lib/CacheManager";
export class CustomQueryResultCache implements QueryResultCache {
    constructor(protected connection: Connection) {        
    }

    async connect(): Promise<void> {
    }

    async disconnect(): Promise<void> {
    }

    async synchronize(queryRunner: QueryRunner): Promise<void> {
    }

    getFromCache(options: QueryResultCacheOptions, queryRunner?: QueryRunner): Promise<QueryResultCacheOptions|undefined> {
        return new Promise<QueryResultCacheOptions|undefined>(async (ok, fail) => {
            const key = CacheManager.getHashId(options.query)
            const response = await CacheManager.hget(options.identifier, key)

            if (response) {
                ok(JSON.parse(response))
                return
            }

            ok(undefined)
        })        
    }

    isExpired(savedCache: QueryResultCacheOptions): boolean {
        return
    }

    async storeInCache(options: QueryResultCacheOptions, savedCache: QueryResultCacheOptions, queryRunner?: QueryRunner): Promise<void> {
        return new Promise<void>(async (ok, fail) => {
            const key = CacheManager.getHashId(options.query)            
            await CacheManager.hset(options.identifier, key, JSON.stringify(options), options.duration)

            ok()
        });
    }

    async clear(queryRunner?: QueryRunner): Promise<void> {        
    }

    async remove(identifiers: string[], queryRunner?: QueryRunner): Promise<void> {
        if (!identifiers || (typeof identifiers !== 'object')) {
            return;
        }

        identifiers.map(i => {
            CacheManager.remove(i)
        })
    }

    protected deleteKey(key: string): Promise<void> {
        return
    }

    protected loadRedis(): any {
    }
}