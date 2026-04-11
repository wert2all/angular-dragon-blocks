## Why

The quest page currently lacks a dedicated store for managing its loading state. We need a lightweight, focused store that exposes only an `isLoading` type to manage the quest page's loading state independently from other stores.

## What Changes

- Create a new `quest-page` store with `isLoading` state type
- This store will be specific to the quest page feature
- Only exports the `isLoading` type/interface (no full NgRx store setup)

## Capabilities

### New Capabilities

- `quest-page-store`: A dedicated store for the quest page that contains only the `isLoading` type to track loading state

### Modified Capabilities

- (none)

## Impact

- New store file created in the stores directory
- Only exports `isLoading` type/interface
- Minimal footprint - designed specifically for quest page loading state
