export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));

  const hetzner = useHetznerClient();
  return (await hetzner.getServerActions(id)).actions;
});
