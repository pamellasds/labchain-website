/**
 * Prepends Vite's BASE_URL to local asset paths.
 * External URLs (http/https) are returned as-is.
 */
export function assetUrl(path) {
  if (!path || path.startsWith('http')) return path
  const base = import.meta.env.BASE_URL
  return `${base}${path.startsWith('/') ? path.slice(1) : path}`
}
