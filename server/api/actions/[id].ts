export default defineEventHandler(async (event) => {
  const actionId = Number(getRouterParam(event, 'id'));

  const hetzner = useHetznerClient();
  return (await hetzner.getAction(actionId)).action;
});
