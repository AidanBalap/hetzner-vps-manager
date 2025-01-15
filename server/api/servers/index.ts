import dataToHServerType from "~/utils/dataToHServerType"
const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async (event) => {
    
    const data = await $fetch('https://api.hetzner.cloud/v1/servers', {
        headers: { 'Authorization': 'Bearer ' + runtimeConfig.hetznerApi }
    }).catch((error) => {
        throw createError({
            statusCode: error.status,
            statusMessage: error.statusText,
        })
    }) as HServerList;

    const serverRealList: HServer[] = data.servers.map((server: HSServer) => {
        return dataToHServerType(server)
    })

    return serverRealList
})