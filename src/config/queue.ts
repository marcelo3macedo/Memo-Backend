const Resource = require('config')

export default {
    url: getProperty('queue.url', null),
    mailValidation: getProperty('queue.actions.mailValidation', null)
};

function getProperty (name='', fallback = null) {
    return Resource.has(name) ? Resource.get(name) : fallback
}