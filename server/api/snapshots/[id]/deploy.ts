export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));

  const hetzner = useHetznerClient();
  const snapshotData = (await hetzner.getSnapshot(id)).image;

  const { location, server_type, ...filteredLabels } = snapshotData.labels;

  const serverData = await hetzner.createServer({
    name: snapshotData.description,
    image: String(snapshotData.id),
    server_type: server_type || 'cx22',
    location: location || 'nbg1',
    labels: filteredLabels,
    user_data: '#cloud-config\nruncmd:\n- [touch, /root/cloud-init-worked]\n',
    public_net: {
      enable_ipv4: true,
      enable_ipv6: true,
    },
  });

  return serverData.server;
});
