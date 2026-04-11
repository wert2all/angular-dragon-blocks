## ADDED Requirements

### Requirement: Split Ukrainian word into syllables

The system SHALL split Ukrainian words into syllables using vowel-consonant pattern matching according to Ukrainian phonetic rules.

#### Scenario: Single syllable word

- **WHEN** the input word is "ні" (ni - "no")
- **THEN** the result SHALL be ["ні"]

#### Scenario: Two syllable word

- **WHEN** the input word is "ма-ма" (mama - "mom")
- **THEN** the result SHALL be ["ма", "ма"]

#### Scenario: Complex syllable pattern

- **WHEN** the input word is "дра-кон" (drakon - "dragon")
- **THEN** the result SHALL be ["дра", "кон"]

### Requirement: Support Ukrainian vowels

The system SHALL recognize Ukrainian vowels: а, е, є, и, і, ї, о, у, ю, я, А, Е, Є, И, І, Ї, О, У, Ю, Я for syllable boundary detection.

#### Scenario: Word with various Ukrainian vowels

- **WHEN** the input word is "їжак" (yizhak - "hedgehog")
- **THEN** the result SHALL be ["ї", "жак"] or similar valid split

### Requirement: Add fake syllables

The system SHALL accept a fake syllable count parameter and generate fake syllables not present in the original word.

#### Scenario: Add 2 fake syllables

- **WHEN** fake count is 2
- **THEN** the result array SHALL include 2 phonetically plausible but non-matching syllables

#### Scenario: Zero fake syllables

- **WHEN** fake count is 0
- **THEN** no fake syllables SHALL be added

### Requirement: Shuffle syllables

The system SHALL shuffle the combined array of real and fake syllables randomly.

#### Scenario: Shuffled output

- **WHEN** word is "ма-ма" with 1 fake syllable
- **THEN** the output order SHALL be non-deterministic across multiple calls

### Requirement: Expose reactive interface

The system SHALL expose inputs as Angular signals for reactive updates.

#### Scenario: Input signal updates

- **WHEN** fake syllable count signal updates
- **THEN** output SHALL recalculate automatically without component recreation
