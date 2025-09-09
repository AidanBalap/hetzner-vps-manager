import HetznerClient from '~/lib/hetznerClient';

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));

  const hetzner = new HetznerClient();
  const snapshotData = (await hetzner.getSnapshot(id)).image;

  const finalLabels = snapshotData.labels;

  const serverData = await hetzner.createServer({
    name: snapshotData.description,
    image: String(snapshotData.id),
    server_type: snapshotData.labels.server_type,
    location: snapshotData.labels.location,
    user_data: '#cloud-config\nruncmd:\n- [touch, /root/cloud-init-worked]\n',
    public_net: {
      enable_ipv4: true,
      enable_ipv6: true,
    },
  });

  return serverData.server;
});
