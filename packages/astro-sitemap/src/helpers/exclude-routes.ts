import { minimatch } from 'minimatch';

/**
 * Exclude routes by matching glob patterns on url
 *
 * @param   {string[]} patterns
 * @param   {string[]} routes
 * @returns {string[]}
 */
export function excludeRoutes(patterns: string[], routes: string[]) {
  patterns.forEach((pattern) => {
    const mm = new minimatch.Minimatch(pattern);
    mm.negate = true;
    routes = routes.filter((path) => mm.match(path));
  });
  return routes;
}
