## ADDED Requirements

### Requirement: Map route is accessible via lazy loading

The system SHALL provide a `/map` route that lazy loads the Map page component on demand.

#### Scenario: User navigates to /map

- **WHEN** user navigates to the `/map` URL
- **THEN** the Map component SHALL be loaded lazily
- **AND** the Map component SHALL render in the router outlet

#### Scenario: Map route is not in initial bundle

- **WHEN** the application initial bundle is analyzed
- **THEN** the Map component code SHALL NOT be present in the initial chunk
- **AND** the Map component SHALL be in a separate lazy-loaded chunk

### Requirement: Map route uses Angular loadComponent syntax

The system SHALL use Angular's `loadComponent` function for lazy loading the Map page component.

#### Scenario: Route configuration uses loadComponent

- **WHEN** inspecting the route configuration in `app.routes.ts`
- **THEN** the `/map` route SHALL use `loadComponent` instead of `component`
- **AND** the `loadComponent` function SHALL return a dynamic import of the Map component
