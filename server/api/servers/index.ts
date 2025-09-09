import HetznerClient from '~/lib/hetznerClient';

export default defineEventHandler(async (event) => {
  const hetzner = new HetznerClient();
  return (await hetzner.listServers()).servers;
});
