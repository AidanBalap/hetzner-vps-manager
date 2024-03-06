export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    const data = await $fetch('https://api.hetzner.cloud/v1/actions/'+ id, {
        headers: { 'Authorization': 'Bearer ' + process.env.HETZNER_API_KEY }
    }).catch((error) => {
        throw createError({
            statusCode: error.status,
            statusMessage: error.statusText,
        })
    }) as HRAction;

    return data.action
})