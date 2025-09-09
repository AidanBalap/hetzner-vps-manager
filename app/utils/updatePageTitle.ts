const cfg = useRuntimeConfig();

export default function (title?: string) {
  useHead({
    title: title ? cfg.public.appName + ' - ' + title : cfg.public.appName,
  });
}
