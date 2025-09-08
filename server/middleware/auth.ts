import { getServerSession } from '#auth';

export default defineEventHandler(async (event) => {
  if (!event.path.startsWith('/api')) return;
  if (event.path.startsWith('/api/auth')) return;

  const session = await getServerSession(event);

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }
});
