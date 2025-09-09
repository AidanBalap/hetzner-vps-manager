export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));

  const hetzner = useHetznerClient();
  return (await hetzner.getServer(id)).server; // TODO: Adapters to reduce the info returned
});
