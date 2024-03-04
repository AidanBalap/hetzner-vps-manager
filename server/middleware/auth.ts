export default defineEventHandler(async (event) => {
    const authHeader = getCookie(event, 'auth');

    if (!event.path.startsWith('/api/server') || !event.path.startsWith('/api/action')) return;

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