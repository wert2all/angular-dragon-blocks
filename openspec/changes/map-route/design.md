## Context

The application currently has an empty routing configuration (`routes: Routes = []`). The project uses Angular v20+ with standalone components as the default, signals for reactivity, and Tailwind CSS for styling. No existing map functionality exists.

## Goals / Non-Goals

**Goals:**

- Add a `/map` route that lazy loads a Map page component
- Follow Angular v20+ patterns using `loadComponent` for lazy loading
- Ensure the Map component follows project best practices (signals, OnPush, accessibility)

**Non-Goals:**

- Preloading the map route (not needed now)
- Route guards or resolvers for the map route
- Deep linking or query parameters for the map
- Complex map state management or data fetching (future work)

## Decisions

### Decision: Use `loadComponent` instead of `loadChildren`

**Rationale:** Since this is a single page component without child routes, `loadComponent` is the correct lazy loading pattern for Angular v20. `loadChildren` is for route modules with child routes.

**Example implementation:**

```typescript
{
  path: 'map',
  loadComponent: () => import('./pages/map/map-page.component').then(m => m.MapPageComponent)
}
```

### Decision: Place component at `src/app/pages/map/`

**Rationale:** Following project's page-based organization. Pages are top-level route components stored in `src/app/pages/`. This aligns with the project's component hierarchy patterns.

### Decision: Use inline template for the Map page component

**Rationale:** The initial Map page will be simple (likely just a heading). Inline templates are preferred for small components in this project per AGENTS.md guidelines. Can be split to external template if complexity grows.

### Decision: No external dependencies needed

**Rationale:** This is a basic page component with no complex map rendering requirements (e.g., no Leaflet, Google Maps, etc.). A simple placeholder page satisfies the initial requirement.

## Risks / Trade-offs

| Risk                  | Mitigation                                                                                                                         |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Chunk naming          | Webpack will auto-generate a numbered chunk. Acceptable for now; can add `webpackChunkName` magic comment if needed for debugging. |
| Future map complexity | Component is isolated in its own directory, making it easy to add child components or switch to external templates later.          |

## Migration Plan

No migration needed - this is an additive change with no breaking changes.

**Deployment steps:**

1. Create `src/app/pages/map/` directory
2. Generate `MapPageComponent` with inline template
3. Add lazy-loaded route to `app.routes.ts`
4. Build and verify chunk is split correctly (`ng build` and check output)
