import dataToHServerType from "~/utils/dataToHServerType"

export default defineEventHandler(async (event) => {
    const serverList =  await fetch('https://api.hetzner.cloud/v1/servers', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + process.env.HETZNER_API_KEY
        }
    })

    let serverListJson = await serverList.json()
    const serverRealList: HServer[] = serverListJson.servers.map((server: any) => {
        return dataToHServerType(server)
    })
    
    return serverRealList
})