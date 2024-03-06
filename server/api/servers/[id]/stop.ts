export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    const data = await $fetch('https://api.hetzner.cloud/v1/servers/'+ id +'/actions/shutdown', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + process.env.HETZNER_API_KEY }
    }).catch((error) => {
        throw createError({
            statusCode: error.status,
            statusMessage: error.statusText,
        })
    }) as HAction;

    return data
})