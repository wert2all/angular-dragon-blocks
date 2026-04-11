## ADDED Requirements

### Requirement: IsLoading type export

The quest-page store SHALL export an `IsLoading` type that represents the loading state of the quest page.

#### Scenario: Type is available for import

- **WHEN** a consumer imports from the quest-page store
- **THEN** the `IsLoading` type is available for use

### Requirement: IsLoading state management

The quest-page store SHALL provide a way to manage the `isLoading` state (get and set).

#### Scenario: Get loading state

- **WHEN** a consumer accesses the loading state
- **THEN** the current loading state (boolean) is returned

#### Scenario: Set loading state

- **WHEN** a consumer sets the loading state to true or false
- **THEN** the state is updated and any subscribers are notified

### Requirement: Minimal store footprint

The quest-page store SHALL only contain the `isLoading` state and related management functionality.

#### Scenario: No additional state exported

- **WHEN** a consumer imports from the quest-page store
- **THEN** only `isLoading` type and management functions are available (no other state)
