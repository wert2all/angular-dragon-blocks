## ADDED Requirements

### Requirement: Modal displays when quest completed correctly
The congratulation modal SHALL display when the player successfully matches all syllables in the quest.

#### Scenario: Modal opens on successful completion
- **WHEN** all syllables are correctly matched
- **THEN** the congratulation modal SHALL open displaying a success message

#### Scenario: Modal does not open on incorrect attempt
- **WHEN** not all syllables are correctly matched
- **THEN** the congratulation modal SHALL NOT open

### Requirement: Modal integrates with ModalWindowComponent
The congratulation modal SHALL reuse the existing `ModalWindowComponent` for consistent modal behavior.

#### Scenario: Modal renders via ModalWindowComponent
- **WHEN** the congratulation modal is opened
- **THEN** it SHALL render as content projected into `ModalWindowComponent`

#### Scenario: Modal inherits close behavior
- **WHEN** the close button or overlay is clicked
- **THEN** the `ModalWindowComponent` closeWindow output SHALL be triggered

### Requirement: Modal displays congratulatory message
The congratulation modal SHALL display a child-friendly success message.

#### Scenario: Success message visible
- **WHEN** the modal is open
- **THEN** a congratulatory message (e.g., "Congratulations! You did it! Great job!") SHALL be visible to the player

### Requirement: Modal styling uses application palette
The congratulation modal SHALL use colors from the application palette.

#### Scenario: Background color uses Warm Cream
- **WHEN** the modal is displayed
- **THEN** the modal content background SHALL use the Warm Cream color palette

#### Scenario: Text color uses Deep Purple
- **WHEN** the modal is displayed
- **THEN** the text color SHALL use the Deep Purple color palette

### Requirement: Modal accessibility
The congratulation modal SHALL be keyboard accessible and screen reader friendly.

#### Scenario: Keyboard navigation
- **WHEN** the modal is open
- **THEN** focus SHALL be trapped within the modal

#### Scenario: ESC key closes modal
- **WHEN** the user presses the ESC key
- **THEN** the modal SHALL close

#### Scenario: ARIA attributes present
- **WHEN** the modal is open
- **THEN** the modal SHALL have proper ARIA attributes (role="dialog", aria-modal="true")
