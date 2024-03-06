import dataToHServerType from "~/utils/dataToHServerType"

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    const data = await $fetch('https://api.hetzner.cloud/v1/servers/'+ id +'/actions?sort=started:desc', {
        headers: { 'Authorization': 'Bearer ' + process.env.HETZNER_API_KEY }
    }).catch((error) => {
        throw createError({
            statusCode: error.status,
            statusMessage: error.statusText,
        })
    }) as HActionList;

    return data.actions
})