function toInteger(text) {
    const number = parseInt(text);

    if (isNaN(number)) {
        return 0
    }
    
    return number
}

const ValueManager = {
    toInteger
}

export default ValueManager