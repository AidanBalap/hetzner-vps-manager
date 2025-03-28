const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    const snaphotDataList: { image: HSnapshot } = await $fetch('https://api.hetzner.cloud/v1/images/'+ id, {
        headers: { 'Authorization': 'Bearer ' + runtimeConfig.hetznerApi }
    })
    const snaphotData = snaphotDataList.image as HSnapshot
    
    const finalLabels = snaphotData.labels

    const serverData =  await fetch('https://api.hetzner.cloud/v1/servers', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + runtimeConfig.hetznerApi,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "automount": false,
            "image": snaphotData.id,
            "labels": finalLabels,
            "location": snaphotData.labels.location,
            "name": snaphotData.description,
            "public_net": {
              "enable_ipv4": true,
              "enable_ipv6": true,
            },
        
            "server_type": snaphotData.labels.server_type,
            "start_after_create": true,
            "user_data": "#cloud-config\nruncmd:\n- [touch, /root/cloud-init-worked]\n",
          }),
    })

    let responseJson = await serverData.json()
    return responseJson
})