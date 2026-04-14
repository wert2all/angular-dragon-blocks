## Why

Children can complete quests in the game, but when they refresh the browser or return later, all quest progress is lost. Quests marked as `isDone: true` reset to `isDone: false` on every page load, causing frustration and loss of achievement tracking. We need to persist quest completion state to localStorage so progress survives page reloads.

## What Changes

- Create a new `quest-progress-storage` capability that handles:
  - Saving quest `isDone` status to localStorage when a quest is completed
  - Reading saved quest progress from localStorage on application initialization
  - Synchronizing the stored state with the NgRx store on app startup
- Add an NgRx effect that listens for `completeQuest` action and triggers persistence
- Initialize the quest store with saved progress when the app loads
- Add localStorage key constants and serialization helpers

## Capabilities

### New Capabilities

- `quest-progress-storage`: Handles localStorage persistence for quest completion state. Includes saving on quest completion, loading on app initialization, error handling for storage unavailability, and migration support for future schema changes.

### Modified Capabilities

- None (this is additive functionality that doesn't change existing spec requirements — it only adds persistence behavior to existing quest completion logic)

## Impact

- **Files modified**:
  - `src/app/features/quest/store/quest.feature.ts` - effect for persistence
  - `src/app/features/quest/store/quest.progress-storage.ts` - new file for storage logic
  - `src/app/app.config.ts` - app initialization for loading saved progress
- **Dependencies**: NgRx effects for async side effects
- **Storage key**: `dragon-blocks-quest-progress` (namespaced by app name)
- **Data format**: JSON object mapping quest IDs to `isDone` boolean
- **Browser compatibility**: Standard localStorage with fallback for storage unavailability
