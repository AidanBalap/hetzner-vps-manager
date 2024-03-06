import dataToHServerType from "~/utils/dataToHServerType"

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const response =  await fetch('https://api.hetzner.cloud/v1/servers/'+ id, {
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

    let server = await response.json()
    const serverData: HServer = dataToHServerType(server.server)

    let targetSize: string = serverData.type === 'cpx11' ? 'cx41' : 'cpx11';

    if (serverData.status != 'off') {
        throw createError({
            statusCode: 422,
            statusMessage: 'Server is not off',
        })
    }

    const upscaleResponse = await fetch('https://api.hetzner.cloud/v1/servers/'+ id +'/actions/change_type', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + process.env.HETZNER_API_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            server_type: targetSize,
            upgrade_disk: false,
        })
    })

    let upscaleResponseJson = await upscaleResponse.json()
    const upscaleAction: HAction = upscaleResponseJson.action

    return upscaleAction
})