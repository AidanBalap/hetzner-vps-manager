export default defineEventHandler(async (event) => {

    if (!event.path.startsWith('/api')) return;
    if (event.path.startsWith('/api/auth')) return;

    const authHeader = getRequestHeader(event, 'Authorization')

    if (!authHeader) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Authorization header not found',
        })
    }

    if (authHeader != process.env.AUTORIZATION_TOKEN) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
        })
    }
})