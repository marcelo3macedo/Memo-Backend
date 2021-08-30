export default {
    secret: process.env.APP_SECRET,
    expiresIn: process.env.TOKEN_EXPIRES_IN,
    secretRefreshToken: process.env.SECRET_REFRESH_TOKEN,
    expiresInRefreshToken: process.env.REFRESH_TOKEN_EXPIRES_IN,
    expiresInRefreshTokenDays: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS),
    expiresInForgotPasswordRefreshTokenHours: parseInt(process.env.FORGOT_PASSWORD_TOKEN_EXPIRES_IN_DAYS),
    forgotPasswordMail: process.env.FORGOT_PASSWORD_EMAIL,
};