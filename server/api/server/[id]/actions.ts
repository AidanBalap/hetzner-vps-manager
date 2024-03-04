import dataToHServerType from "~/utils/dataToHServerType"

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const serverActions =  await fetch('https://api.hetzner.cloud/v1/servers/'+ id +'/actions?sort=started:desc', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + process.env.HETZNER_API_KEY
        }
    })

    if (serverActions.status === 422 || serverActions.status === 404) {
        throw createError({
            statusCode: serverActions.status,
            statusMessage: 'Server not found',
        })
    }

    const serverActionList = await serverActions.json()
    return serverActionList['actions']
})