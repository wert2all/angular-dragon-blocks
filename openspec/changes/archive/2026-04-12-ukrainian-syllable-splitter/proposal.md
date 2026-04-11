## Why

The game needs a syllable-splitting mechanism to teach Ukrainian children how to build words from syllable blocks. Children will drag syllable tokens to build objects for the dragon character, requiring real Ukrainian syllables mixed with distractors (fake syllables) to create educational challenge.

## What Changes

- Extend existing `Syllables` component to accept a Ukrainian word and generate a shuffled array of syllables
- Implement Ukrainian-specific syllable splitting logic using vowel-consonant pattern matching
- Add configurable fake syllable injection via input signal
- Shuffle the combined array (real + fake syllables) for game presentation

## Capabilities

### New Capabilities

- `ukrainian-syllable-splitter`: Ukrainian syllable splitting with fake syllable injection and shuffling for word-building game mechanics

### Modified Capabilities

- `syllables`: Add Ukrainian word support and configurable fake syllable injection via input signal

## Impact

- Extends existing `Syllables` component with Ukrainian-specific functionality
- No breaking changes to existing code (backward compatible)
- Uses Angular signals for reactive fake syllable count
- Affects quest/gameplay modules that generate word puzzles
