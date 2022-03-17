const Resource = require('config')

export default {
    decks: parseInt(process.env.DECKS_LIMIT),
    cards: parseInt(process.env.CARDS_LIMIT),
    session: parseInt(process.env.SESSION_LIMIT)
};