import auth from "@config/auth"

function getActivationLink(token) {
    return auth.activationLink + token
}

const MailManager = {
    getActivationLink
}

export default MailManager