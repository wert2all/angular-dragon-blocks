## Context

The Dragon Blocks game uses NgRx signals-based state management for quest progression. Currently, quest completion state lives only in memory. When a child completes a quest (via `QuestActions.completeQuest`), the `isDone` flag is set in the store, but this is lost on page refresh. We need to add browser localStorage persistence without disrupting the existing game flow.

Current architecture:

- `quest.feature.ts`: NgRx feature with reducer, selectors, and actions
- `QuestActions`: `{ setActiveQuest, setDoneSyllable, completeQuest }`
- `initState`: Quest list loaded from static `quests` array with all `isDone: false`

## Goals / Non-Goals

**Goals:**

- Save quest `isDone` progress to localStorage when quests are completed
- Restore saved progress on application initialization
- Graceful degradation when localStorage is unavailable
- Versioned storage format for future migration support
- Minimal code changes to existing quest feature

**Non-Goals:**

- Full offline support or complex sync logic
- Server-side persistence or user accounts
- Quest history/audit trail (only current completion state)
- Automatic save on every state change (only on quest completion)

## Decisions

**Decision: Inline localStorage logic in effects (no separate service)**

- **Rationale**: Keeps code simple with fewer abstractions; storage logic is sufficiently small (read/write a key with try-catch) to live in effects. Testing can use jasmine spies on `localStorage` methods.
- **Alternative considered**: Injectable service wrapper — rejected as unnecessary indirection for single-key read/write operations

**Decision: Use NgRx effects (not signals effects)**

- **Rationale**: Project uses NgRx store/actions pattern; need effect to listen for existing `completeQuest` action. Use `provideEffects` from `@ngrx/effects` to register effects in app configuration. See [NgRx Effects Guide](https://ngrx.io/guide/effects) for implementation patterns.
- **Alternative considered**: Angular signals effect in component — rejected as persistence should be store-level, not component-level

**Decision: Direct localStorage access in effects with try-catch**

- **Rationale**: localStorage access can throw (quota exceeded, private browsing); errors caught in effect with `catchError` operator
- **Implementation**: Effects include `tap(() => { try { localStorage.setItem(...) } catch (e) { ... } })` and helper function for loading with migration

**Decision: Versioned storage format from start**

- **Rationale**: Prevents breaking changes if storage format evolves later
- **Format**: `{ v: number, progresses: Array<{questId: number, isDone: boolean}> }`

**Decision: Load progress via effect on app init, synced to store via action**

- **Rationale**: Need to hydrate store after it initializes. Add `loadSavedProgress` action dispatched at app startup, handled by effect to read localStorage and dispatch `loadQuestProgressSuccess` with saved data. This follows standard NgRx patterns.
- **Alternative considered**: Merge into `initState` — rejected as it requires synchronous localStorage access before store creation and complicates migration.

**Decision: Only store completed quests (not all quests)**

- **Rationale**: Reduces storage size; uncompleted quests default to `isDone: false` on load

## Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                      NgRx Store                                │
│  ┌───────────────┐    ┌─────────────┐    ┌──────────────────┐ │
│  │  Actions      │───▶│   Reducer   │    │        State     │ │
│  │ completeQuest │    │  set isDone │    │  list, active... │ │
│  └───────────────┘    └─────────────┘    └──────────────────┘ │
│         │                                        ▲             │
│         │                    ┌───────────────────┘             │
│         │                    │ "loadQuestProgressSuccess"      │
│         │                    │ action updates list[].isDone     │
│         │                    │                                 │
│         │     ┌─────────────────────────────────────────────┐ │
│         │     │            Quest Effects                    │ │
│         │     │  ┌─────────────────────────────────────────┐ │ │
│         │     │  │ "completeQuest$" effect                 │ │ │
│         │     │  │  - taps into action stream               │ │ │
│         │     │  │  - uses withLatestFrom(selectList)     │ │ │
│         │     │  │  - localStorage.setItem() directly     │ │ │
│         │     │  └─────────────────────────────────────────┘ │ │
│         │     │  ┌─────────────────────────────────────────┐ │ │
│         │     │  │ "loadSavedProgress$" effect             │ │ │
│         │     │  - listens to loadSavedProgress action     │ │ │
│         │     │  │  - localStorage.getItem() directly       │ │ │
│         │     │  │  - migrates version if needed            │ │ │
│         │     │  │  - dispatches hydrateQuestProgress       │ │ │
│         │     │  └─────────────────────────────────────────┘ │ │
│         └────▶│                                              │ │
│  dispatched    └──────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

## File Structure

```
src/app/features/quest/store/
├── quest.effects.ts          # NEW: NgRx effects for persistence
├── quest.feature.ts          # Feature definition, no effects here
├── quest.actions.ts          # ADD: loadSavedProgress, hydrateQuestProgress actions
├── quest.types.ts            # ADD: ProgressData, SavedQuestProgress types
└── quest.store.ts            # MOD: initState includes loadProgress() helper
```

## Storage Format

```ts
interface ProgressData {
  v: 1;
  progresses: Array<{
    questId: number;
    isDone: boolean;
  }>;
}

// Example stored value
{
  "v": 1,
  "progresses": [
    { "questId": 1, "isDone": true },
    { "questId": 3, "isDone": true }
  ]
}
```

## Risks / Trade-offs

| Risk                                  | Mitigation                                                                    |
| ------------------------------------- | ----------------------------------------------------------------------------- |
| localStorage quota exceeded           | Catch error; log to console; continue without persistence                     |
| Private browsing mode blocks storage  | Try-catch all storage access; graceful degrade to no persistence              |
| Storage corrupted/migrated format     | Validate on load; clear and reset if invalid; migration supports old versions |
| Multiple tabs overwriting each other  | Accept eventual consistency; last writer wins (acceptable for this use case)  |
| Developer clears storage during debug | Provide manual "reset progress" UI in future if needed                        |

## Migration Plan

**Deployment**: No server needed - pure client-side change.

**Rollback**: Remove effects from providers; revert `initState` to static `quests` array.

**Testing**:

1. Complete a quest → verify localStorage entry created
2. Refresh page → verify completed quest remains marked
3. Clear localStorage → verify no errors, progress resets

## Open Questions

- Should we provide a manual "reset all progress" button for testing? (Not strictly needed for MVP)
- Should we save progress immediately on completion or debounce? (Immediate prevents loss on accidental close)
