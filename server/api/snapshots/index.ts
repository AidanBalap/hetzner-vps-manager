export default defineEventHandler(async () => {
  const hetzner = useHetznerClient();
  return (await hetzner.listSnapshots()).images;
});
