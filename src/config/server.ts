const Resource = require('config')

export default {
    origin: getProperty('security.origin', []),
    allowHeaders: getProperty('security.allowHeaders', []),
    exposedHeaders: getProperty('security.exposedHeaders', []),
    credentials: getProperty('security.credentials', false),
    preflightMaxAge: getProperty('security.preflightMaxAge', 0)
};

function getProperty (name, fallback = null) {
    return Resource.has(name) ? Resource.get(name) : fallback
}