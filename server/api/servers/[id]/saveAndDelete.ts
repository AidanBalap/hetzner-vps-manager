import dataToHServerType from "~/utils/dataToHServerType";
const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const serverId = getRouterParam(event, 'id')

  const data = await $fetch('https://api.hetzner.cloud/v1/servers/'+ serverId, {
    headers: { 'Authorization': 'Bearer ' +  runtimeConfig.hetznerApi }
  }).catch((error) => {
    throw createError({
        statusCode: error.status,
        statusMessage: error.statusText,
    })
  }) as HRServer;
  const serverData: HServer = dataToHServerType(data.server)

  const date = serverData.created.split('T')[0]
  const time = serverData.created.split('T')[1].split('+')[0].split(':').join('-')
  const creationTimestamp = date + '_' + time

  const imageResponse =  await fetch('https://api.hetzner.cloud/v1/servers/'+ serverId + '/actions/create_image', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer ' + runtimeConfig.hetznerApi,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        type: 'snapshot',
        description: serverData.name,
        labels: {
            'first_seen': serverData.labels['first_seen'] || creationTimestamp,
            'server_type': serverData.type,
            'location': serverData.location,
            'created_by': 'gambuso-servers',
        }
    }),
  })


  let response = await imageResponse.json()
  let actionResponse = response['action']

  let isFinished = false
  while (!isFinished) {
    const fetchStatusResponse = await fetch('https://api.hetzner.cloud/v1/actions/'+ actionResponse.id, {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + runtimeConfig.hetznerApi
      }
    })

    const fetchStatusAction : HAction = await fetchStatusResponse.json()

    if (fetchStatusAction.status != 'available') {
      isFinished = true
    } else {
      await new Promise(r => setTimeout(r, 2500))
    }
  }

  const deleteResponse = await fetch('https://api.hetzner.cloud/v1/servers/'+ serverId, {
    method: 'DELETE',
    headers: {
        'Authorization': 'Bearer ' + runtimeConfig.hetznerApi
    }
  })

  const deleteResponseAction: HAction = await deleteResponse.json()
  return deleteResponseAction
})