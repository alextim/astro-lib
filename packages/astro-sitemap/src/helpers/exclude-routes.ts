import { Minimatch } from 'minimatch';

/**
 * Exclude routes by matching glob patterns on url
 *
 * @param   {string[]} patterns
 * @param   {string[]} routes
 * @returns {string[]}
 */
export function excludeRoutes(patterns: string[], routes: string[]) {
  patterns.forEach((pattern) => {
    const minimatch = new Minimatch(pattern);
    minimatch.negate = true;
    routes = routes.filter((path) => minimatch.match(path));
  });
  return routes;
}
