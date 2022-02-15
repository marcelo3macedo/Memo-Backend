import cache from "@config/cache"

const IORedis = require('ioredis')

class CacheManager {
    static client

    static connect() {
        this.client = new IORedis(cache.connectionString)
    }

    static getKey(id, path=cache.hashKey) {
        return path.concat(":", id)
    }

    static async get(id, path) {
        return await this.client.get(this.getKey(id, path))
    }

    static async hget(id, key) {
        return await this.client.hget(this.getKey(id), key)
    }

    static async hset(id, key, data) {
        return await this.client.hset(this.getKey(id), key, data)
    }

    static async hdel(id, key) {
        return await this.client.hdel(this.getKey(id), key)
    }

    static async set(id, data, ttl=cache.expireTimeInSeconds) {
        this.client.set(this.getKey(id), JSON.stringify(data), "EX", ttl)
    }

    static async remove(id, path) {
        return await this.client.remove(this.getKey(id, path))
    }

    static generateId(args) {
        let response 

        args.map(a => {
            let data = a.replace(":", "_")

            if (!response) {
                response = data
            } else {
                response = response.concat(":", data)
            }
        })

        return response
    }

    static getId(obj) {
        const parameters = obj.getQueryAndParameters().join('_').replace(":", "_")
        let id = obj.getMainTableName()

        if (parameters) {
            id = id.concat(":", parameters) 
        }
        
        return id
    }

    static getHighTtl() {
        return cache.highMilliseconds
    }
}

export default CacheManager