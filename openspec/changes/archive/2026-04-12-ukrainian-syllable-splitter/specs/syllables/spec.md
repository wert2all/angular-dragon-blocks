## ADDED Requirements

### Requirement: Accept Ukrainian word input

The component SHALL accept a Ukrainian word as a required string input that triggers syllable splitting.

#### Scenario: Word input provided

- **WHEN** word input is set to "дракон"
- **THEN** the component SHALL process it through Ukrainian syllable splitting logic

### Requirement: Accept fake syllable count

The component SHALL accept an optional fake syllable count input via signal for reactive updates.

#### Scenario: Default fake count

- **WHEN** fake count is not provided
- **THEN** default value SHALL be 0

#### Scenario: Configure fake count

- **WHEN** fake count is set to 3
- **THEN** 3 fake syllables SHALL be injected into the output

### Requirement: Display shuffled syllables

The component SHALL render the shuffled syllable tokens for user interaction.

#### Scenario: Render syllables

- **WHEN** word "кни-га" with 1 fake syllable is processed
- **THEN** the view SHALL display 3 shuffled syllable tokens

### Requirement: Use syllable sub-component

The component SHALL render each syllable using the existing `app-syllable` component.

#### Scenario: Syllable component usage

- **WHEN** syllables are generated
- **THEN** each token SHALL be wrapped in `<app-syllable>` with appropriate value binding

## MODIFIED Requirements

_No existing specs to modify - component existed without spec coverage._
