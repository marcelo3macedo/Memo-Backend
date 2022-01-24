const Resource = require('config')

export default {
    milliseconds: parseInt(process.env.APP_CACHE_MILLISECONDS),
    highMilliseconds: parseInt(process.env.APP_CACHE_HIGH_MILLISECONDS),    
    connectionString: getProperty('cache.connectionString', null),
    expireTimeInSeconds: getProperty('cache.expireTimeInSeconds', null),
    hashKey: getProperty('cache.hashKey', null),
    mailKey: getProperty('cache.mailKey', null)
};

function getProperty (name, fallback = null) {
    return Resource.has(name) ? Resource.get(name) : fallback
}