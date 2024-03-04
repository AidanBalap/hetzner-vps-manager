export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const token = body.token

    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Token not found',
        })
    }

    if (token != process.env.AUTORIZATION_TOKEN) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Not valid token',
        })
    }

    return {
        status: 200,
        body: {
            message: "Token is valid",
        }
    }
})