export function withBase(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (base && clean.startsWith(base)) return clean;
  return `${base}${clean}`;
}
