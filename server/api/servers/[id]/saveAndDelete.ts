export default defineEventHandler(async (event) => {
  const serverId = Number(getRouterParam(event, 'id'));

  const hetzner = useHetznerClient();
  const server = (await hetzner.getServer(serverId)).server;

  if (!server) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Server not found',
    });
  }

  const creationTimestamp = server.created.replace(':', '_'); // labels cannot have ':'

  const newImage = await hetzner.createSnapshot(serverId, {
    description: server.name,
    type: 'snapshot',
    labels: {
      first_seen: server.labels['first_seen'] || creationTimestamp,
      server_type: server.server_type.name,
      location: server.datacenter.location.name,
      created_by: 'gambuso-servers',
    },
  });

  const actionResponse = newImage.action;

  let isFinished = false;
  while (!isFinished) {
    const actionStatus = (await hetzner.getAction(actionResponse.id)).action;

    if (actionStatus.status != 'running') {
      isFinished = true;
    }
    else {
      await new Promise(r => setTimeout(r, 2500));
    }
  }

  const deleteServerAction = (await hetzner.deleteServer(serverId)).action;
  return deleteServerAction;
});
