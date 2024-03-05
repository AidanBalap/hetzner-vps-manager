export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const params = getQuery(event)
    const serverName = params.name

    const serverData =  await fetch('https://api.hetzner.cloud/v1/servers', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + process.env.HETZNER_API_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "automount": false,
            "image": id,
            "labels": {},
            "location": "nbg1",
            "name": serverName,
            "public_net": {
              "enable_ipv4": true,
              "enable_ipv6": true,
            },
        
            "server_type": "cx41",
            "start_after_create": true,
            "user_data": "#cloud-config\nruncmd:\n- [touch, /root/cloud-init-worked]\n",
          }),
    })

    let responseJson = await serverData.json()
    return responseJson
})