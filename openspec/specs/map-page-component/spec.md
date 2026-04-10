# map-page-component Specification

## Purpose

TBD - created by archiving change map-route. Update Purpose after archive.

## Requirements

### Requirement: Map page component is a standalone component

The system SHALL provide a Map page component that is defined as a standalone Angular component.

#### Scenario: Map component is standalone

- **WHEN** inspecting the Map component decorator
- **THEN** the component SHALL NOT declare `standalone: true` (Angular v20+ default)
- **AND** the component SHALL have a `selector` property
- **AND** the component SHALL define its own template and styles

### Requirement: Map page component follows project architecture

The Map page component SHALL follow the project's Angular best practices.

#### Scenario: Map component uses signals for state

- **WHEN** the Map component contains state
- **THEN** state SHALL be managed using Angular signals
- **AND** derived state SHALL use `computed()` signals

#### Scenario: Map component uses OnPush change detection

- **WHEN** inspecting the Map component decorator
- **THEN** `changeDetection` SHALL be set to `ChangeDetectionStrategy.OnPush`

#### Scenario: Map component is placed in correct directory

- **WHEN** creating the Map component
- **THEN** it SHALL be placed at `src/app/pages/map/`
- **AND** the component files SHALL be named `map-page.component.ts`, `map-page.component.html` (if external template), etc.

### Requirement: Map page component is accessible

The Map page component SHALL meet WCAG AA accessibility standards.

#### Scenario: Map page has proper heading structure

- **WHEN** the Map page renders
- **THEN** it SHALL have a proper heading hierarchy starting with `<h1>`
- **AND** all interactive elements SHALL have accessible labels
