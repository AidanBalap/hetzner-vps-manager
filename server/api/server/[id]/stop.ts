import dataToHServerType from "~/utils/dataToHServerType"

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const response =  await fetch('https://api.hetzner.cloud/v1/servers/'+ id +'/actions/shutdown', {
        method: 'POST',
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

    var isStopped = false
    while (!isStopped) {
        const statusResponse =  await fetch('https://api.hetzner.cloud/v1/servers/'+ id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + process.env.HETZNER_API_KEY
            }
        })

        let server = await statusResponse.json()
        const svData: HServer = dataToHServerType(server.server)

        if (svData.status === 'off') {
            isStopped = true
        } else {
            await new Promise(r => setTimeout(r, 2500))
        }   
    }

    const reponseAction : HAction = await response.json()
    return reponseAction
})