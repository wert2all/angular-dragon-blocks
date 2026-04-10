## Why

The application needs a map view to display the dragon's world where children can navigate between different reading adventures. Lazy loading this route will keep the initial bundle size small and improve application startup performance, only loading the map component when users navigate to it.

## What Changes

- Add a new `/map` route to the application's routing configuration
- Create a lazy-loaded Map component that loads on demand when the route is accessed
- Use Angular's `loadComponent` syntax for standalone component lazy loading
- Ensure the map component follows the project's component architecture (standalone, signals-based)

## Capabilities

### New Capabilities

- `map-route-routing`: Define and configure the `/map` route with lazy loading via `loadComponent`
- `map-page-component`: Create a standalone Map page component with presentation logic

### Modified Capabilities

- (none)

## Impact

- **Files affected:**
  - `src/app/app.routes.ts` - Add lazy-loaded `/map` route configuration
  - `src/app/pages/map/` (new) - Map page component directory

- **Dependencies:** Angular Router (already installed)

- **Performance:** Improves initial load time by deferring map component code until needed

- **No breaking changes** - This is a purely additive change
