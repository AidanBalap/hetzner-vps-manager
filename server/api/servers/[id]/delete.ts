const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  const data = await $fetch('https://api.hetzner.cloud/v1/servers/' + id, {
    method: 'DELETE',
    headers: { Authorization: 'Bearer ' + runtimeConfig.hetznerApi },
  }).catch((error) => {
    throw createError({
      statusCode: error.status,
      statusMessage: error.statusText,
    });
  }) as HAction;

  return data;
});
