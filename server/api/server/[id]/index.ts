import dataToHServerType from "~/utils/dataToHServerType"

 export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const serverData =  await fetch('https://api.hetzner.cloud/v1/servers/'+ id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + process.env.HETZNER_API_KEY
        }
    })

    if (serverData.status === 422 || serverData.status === 404) {
        throw createError({
            statusCode: serverData.status,
            statusMessage: 'Server not found',
        })
    }

    let server = await serverData.json()
    const serverRealList: HServer = dataToHServerType(server.server)

    return serverRealList
})