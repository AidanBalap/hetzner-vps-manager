export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const response =  await fetch('https://api.hetzner.cloud/v1/actions/'+ id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + process.env.HETZNER_API_KEY
        }
    })

    if (response.status === 422 || response.status === 404) {
        throw createError({
            statusCode: response.status,
            statusMessage: 'Server not found',
        })
    }

    const reponseAction : HAction = await response.json()
    return reponseAction
})