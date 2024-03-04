export default defineEventHandler(async (event) => {
    const serverList =  await fetch('https://api.hetzner.cloud/v1/images?type=snapshot&sort=created:desc', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + process.env.HETZNER_API_KEY
        },
    })

    let serverListJson = await serverList.json()    
    return serverListJson
})