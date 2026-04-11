# quest-route Specification

## Purpose

TBD - created by archiving change quest-route. Update Purpose after archive.

## Requirements

### Requirement: Quest route and component

The system SHALL provide a lazy‑loaded Angular route `quest/:id` that renders a dedicated `QuestComponent`. The route parameter `id` shall be exposed as a signal within the component and displayed in the UI.

#### Scenario: Navigation loads component

- **WHEN** a user navigates to `/quest/42`
- **THEN** the Angular router lazy‑loads the `QuestModule` and displays `QuestComponent` with the heading "Quest 42".

#### Scenario: Lazy‑loading behavior

- **WHEN** the `quest` route is not yet loaded
- **THEN** the bundle for `QuestModule` is fetched on demand, creating a separate chunk.
