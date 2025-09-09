import HetznerClient from '~/lib/hetznerClient';

export default defineEventHandler(async (event) => {
  const actionId = Number(getRouterParam(event, 'id'));

  const hetzner = new HetznerClient();
  return (await hetzner.getAction(actionId)).action;
});
