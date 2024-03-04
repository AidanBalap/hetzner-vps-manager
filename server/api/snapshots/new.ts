
export default defineEventHandler(async (event) => {
        // Get URL parameters
    const params = getQuery(event)
    const serverId = params.id
    const snapshotName = params.name

    console.log('serverId: ' + serverId)
    console.log('snapshotName: ' + snapshotName)


    if (!serverId || !snapshotName) {
        throw createError({
            statusCode: 400,
            statusMessage: 'serverId and snapshotName are required',
        })
    }

    const serverList =  await fetch('https://api.hetzner.cloud/v1/servers/'+ serverId + '/actions/create_image', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + process.env.HETZNER_API_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: 'snapshot',
            description: snapshotName,
            labels: {
                'created': 'h-scaler',
            }
        }),
    })

    let serverListJson = await serverList.json()    
    return serverListJson
})