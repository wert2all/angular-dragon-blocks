## 1. Setup and Types

- [x] 1.1 Add NgRx effects dependency if not already installed in project
- [x] 1.2 Add storage-related types to `quest.types.ts`: `ProgressData`, `ProgressEntry`, `SavedQuestProgress`
- [x] 1.3 Create localStorage key constant: `STORAGE_KEY = 'dragon-blocks-quest-progress'`
- [x] 1.4 Define current storage format version: `CURRENT_VERSION = 1`

## 2. Actions Extension

- [x] 2.1 Add `loadSavedProgress` action to `quest.actions.ts` (dispatched on app init)
- [x] 2.2 Add `hydrateQuestProgress` action to `quest.actions.ts` (dispatched by effect with loaded data)
- [x] 2.3 Add `storeError` action to `quest.actions.ts` (for error handling, optional logging)

## 3. Store Enhancement

- [x] 3.1 Add reducer handler for `hydrateQuestProgress` action in `quest.feature.ts`
- [x] 3.2 Update reducer to merge loaded `isDone` values with existing quest list
- [x] 3.3 Ensure quests not in storage retain default `isDone: false` value

## 4. Effects Implementation

- [x] 4.1 Create `quest.effects.ts` file in `src/app/features/quest/store/`
- [x] 4.2 Implement `saveProgress$` effect that listens for `completeQuest` action
- [x] 4.3 Use `withLatestFrom(selectList)` to get current quest list on completion
- [x] 4.4 Filter to only completed quests (`isDone: true`) before saving
- [x] 4.5 Store data in versioned format: `{ v: 1, progresses: [{questId, isDone}] }`
- [x] 4.6 Wrap `localStorage.setItem()` in try-catch for error handling
- [x] 4.7 Log errors to console without crashing the application
- [x] 4.8 Implement `loadProgress$` effect that listens for `loadSavedProgress` action
- [x] 4.9 Read from `localStorage.getItem()` with try-catch
- [x] 4.10 Implement version migration logic (check `v` property, migrate if < 1)
- [x] 4.11 Dispatch `hydrateQuestProgress` with loaded data on success
- [x] 4.12 Handle missing/corrupted data by silently continuing (no error thrown)

## 5. App Configuration

- [x] 5.1 Import `provideEffects` from `@ngrx/effects` in `app.config.ts`
- [x] 5.2 Register quest effects: `provideEffects(QuestEffects)`
- [x] 5.3 Dispatch `loadSavedProgress` action during app bootstrap (in main.ts or app component)

## 6. Testing

- [ ] 6.1 Complete a quest → verify localStorage entry created with correct format
- [ ] 6.2 Verify localStorage key is `dragon-blocks-quest-progress`
- [ ] 6.3 Complete multiple quests → verify only completed quest IDs are stored
- [ ] 6.4 Refresh page → verify completed quests remain marked as done
- [ ] 6.5 Clear localStorage → verify no errors, quests reset to all incomplete
- [ ] 6.6 Test in private browsing mode → verify app works without persistence
- [ ] 6.7 Manually corrupt localStorage value → verify app resets gracefully
- [ ] 6.8 Test migration: manually set version 0 data → verify migration updates correctly
- [ ] 6.9 Verify `isDone` values merge correctly with default quest list

## 7. Code Quality

- [x] 7.1 Run `pnpm exec prettier --write .` to format all modified files
- [x] 7.2 Run `ng lint` and fix any linting errors
- [x] 7.3 Run `ng test` and verify all tests pass
- [x] 7.4 Run `ng build` and verify production build succeeds
- [x] 7.5 Verify no TypeScript compilation errors
