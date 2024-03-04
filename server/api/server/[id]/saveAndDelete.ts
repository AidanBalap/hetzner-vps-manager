
export default defineEventHandler(async (event) => {
  const serverId = getRouterParam(event, 'id')
  const params = getQuery(event)
  const snapshotName = params.name

  console.log(serverId, snapshotName)

  if (!serverId || !snapshotName) {
    throw createError({
        statusCode: 400,
        statusMessage: 'serverId and snapshotName are required',
    })
  }

  const imageResponse =  await fetch('https://api.hetzner.cloud/v1/servers/'+ serverId + '/actions/create_image', {
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

  let response = await imageResponse.json()
  let actionResponse = response['action']

  console.log(actionResponse)

  let isFinished = false
  while (!isFinished) {
    const fetchStatusResponse = await fetch('https://api.hetzner.cloud/v1/actions/'+ actionResponse.id, {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + process.env.HETZNER_API_KEY
      }
    })

    const fetchStatusAction : HAction = await fetchStatusResponse.json()

    if (fetchStatusAction.status != 'available') {
      isFinished = true
    } else {
      console.log("waiting for created")
      console.log(fetchStatusAction)
      await new Promise(r => setTimeout(r, 2500))
    }
  }

  const deleteResponse = await fetch('https://api.hetzner.cloud/v1/servers/'+ serverId, {
    method: 'DELETE',
    headers: {
        'Authorization': 'Bearer ' + process.env.HETZNER_API_KEY
    }
  })

  const deleteResponseAction: HAction = await deleteResponse.json()
  return deleteResponseAction
})