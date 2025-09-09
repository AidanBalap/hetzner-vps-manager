export default defineEventHandler(async (event) => {
  if (event.path.startsWith('/api')) {
    appendHeader(event, 'X-Robots-Tag', 'noindex');
  }
});
