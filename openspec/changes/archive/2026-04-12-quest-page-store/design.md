## Context

The quest page needs a dedicated store to manage its loading state. Currently, there is no unified way to track whether the quest page is loading data. This design outlines a lightweight solution that exports only the `isLoading` type.

## Goals / Non-Goals

**Goals:**

- Create a minimal store for the quest page that exposes only an `isLoading` type
- Keep the store focused and specific to the quest page feature
- Avoid over-engineering with full NgRx boilerplate

**Non-Goals:**

- Full NgRx store with actions, reducers, selectors, and effects
- Integration with other page stores
- Complex state management beyond loading state

## Decisions

1. **Use a simple signal or BehaviorSubject for `isLoading`**
   - Rationale: Since we only need a single `isLoading` state, a full NgRx store is overkill. A simple signal or BehaviorSubject provides the needed reactivity without boilerplate.
   - Alternative considered: Full NgRx store - rejected due to excessive boilerplate for a single boolean state.

2. **Export as a type/interface, not a full class**
   - Rationale: The request specifically mentions "isLoading type", so we should export just the type definition and a way to manage the state, keeping it minimal.

3. **Place in the stores directory**
   - Rationale: Following existing project conventions for state management code.

## Risks / Trade-offs

- **Risk**: If the quest page requirements grow to need more state, this approach may need refactoring.
  - Mitigation: Start simple and evolve as needed. The current scope is specifically "only isLoading type".
- **Risk**: Not using standard NgRx patterns may make it harder for other developers to find.
  - Mitigation: Document the location clearly and follow naming conventions.
