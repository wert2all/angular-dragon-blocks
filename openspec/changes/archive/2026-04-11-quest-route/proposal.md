## Why

Add a dedicated quest route to allow users to navigate directly to a specific quest by ID, enabling deeper engagement and better state management for quest‑related content.

## What Changes

- Add a new Angular route `quest/:id` to the routing module.
- Create a `QuestComponent` that displays quest details based on the route parameter.
- Update navigation and lazy‑load the quest feature module.
- Add necessary unit and e2e tests for the new route and component.

## Capabilities

### New Capabilities

- `quest-route`: Defines the `/quest/:id` route and associated `QuestComponent`, including lazy‑loading and parameter handling.

### Modified Capabilities

- _(none)_

## Impact

- Modifies `app-routing.module.ts` to include the new route.
- Introduces a `quest` feature module with `quest-routing.module.ts` and `quest.component.ts`.
- Updates navigation links where appropriate.
- May affect existing guard or resolver logic if they rely on route structure.
