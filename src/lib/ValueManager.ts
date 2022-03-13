function toInteger(text) {
    const number = parseInt(text);

    if (isNaN(number)) {
        return 0
    }
    
    return number
}

function toEncoded(path) {
    const id = (Math.random() + 1).toString(36).substring(10)
    const uri = `${path.toLowerCase()}_${id}`
    return encodeURIComponent(uri).replace(/%20/g, "-")
}

const ValueManager = {
    toInteger,
    toEncoded
}

export default ValueManager