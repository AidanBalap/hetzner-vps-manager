export default defineEventHandler(async (event) => {

    if (event.path.startsWith('/auth')) return;

    const authHeader = getCookie(event, 'auth');

    if (!authHeader) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Authorization header not found',
        })
    }

    if (authHeader != process.env.AUTORIZATION_TOKEN) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        })
    }

    // if (token != 'hi') {
    //     throw createError({
    //         statusCode: 401,
    //         statusMessage: 'Unauthorized',
    //     })
    // }
})