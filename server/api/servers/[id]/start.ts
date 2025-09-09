import HetznerClient from '~/lib/hetznerClient';

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));

  const hetzner = new HetznerClient();
  return (await hetzner.powerOnServer(id)).action;
});
