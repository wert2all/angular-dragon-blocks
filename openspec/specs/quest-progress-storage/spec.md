## Purpose

Define requirements for persisting quest completion progress to browser localStorage, including saving on completion, loading on application init, error handling, and migration support.

## Requirements

### Requirement: Quest progress persistence on completion

The quest progress storage SHALL save quest completion state when a quest is marked complete.

#### Scenario: Save quest progress on completeQuest action

- **WHEN** a quest is completed (via `completeQuest` action with `questId`)
- **THEN** the quest's `id` and `isDone: true` is stored in localStorage under key `dragon-blocks-quest-progress`

#### Scenario: Persist only completed quest IDs

- **WHEN** progress is saved
- **THEN** only quest IDs with truthy `isDone` status are included in storage

### Requirement: Quest progress restoration on application init

The quest progress storage SHALL restore saved quest progress when the application initializes.

#### Scenario: Load saved progress into quest store

- **WHEN** the application initializes
- **THEN** the system reads from localStorage key `dragon-blocks-quest-progress`
- **AND** sets each quest's `isDone` status in the store according to saved state

#### Scenario: Merge with default quest list

- **WHEN** saved progress exists in localStorage
- **THEN** the system merges saved `isDone` values with the default quest definitions
- **AND** quests not present in storage retain their default `isDone: false` value

### Requirement: Storage availability and error handling

The quest progress storage SHALL handle cases where localStorage is unavailable gracefully.

#### Scenario: Storage unavailable (private browsing mode)

- **WHEN** localStorage access throws an error
- **THEN** the system silently continues without persistence
- **AND** application functionality is not affected

#### Scenario: Storage write fails

- **WHEN** writing to localStorage fails
- **THEN** the error is logged to console
- **AND** application continues operating (progress not saved but no crash)

### Requirement: Storage format versioning

The quest progress storage SHALL support future format changes via version tracking.

#### Scenario: Current format version

- **WHEN** saving quest progress
- **THEN** data is stored as a versioned object with `v: 1`
- **AND** quest progress is in `progresses` array containing `{questId: number, isDone: boolean}` records

#### Scenario: Schema migration on load

- **WHEN** reading saved progress with an older version
- **THEN** the system applies migration logic to convert to current format
- **AND** migrated data persists in new format on next save

### Requirement: Storage namespace isolation

The quest progress storage SHALL use isolated storage keys to avoid conflicts.

#### Scenario: Unique storage key

- **WHEN** localStorage is accessed
- **THEN** the key `dragon-blocks-quest-progress` is used

#### Scenario: Environment-specific isolation

- **WHEN** storing data in different environments (dev/staging/prod)
- **THEN** the same key is used (data is domain-scoped by browser automatically)
