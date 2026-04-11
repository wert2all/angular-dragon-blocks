## Context

The game currently has a basic `Syllables` component that accepts a word input. We need to extend it with Ukrainian-specific syllable splitting logic for the educational word-building mechanic. Ukrainian phonetics differ from English (e.g., "дра-кон" has clear vowel-based syllable boundaries) and requires handling Cyrillic unicode properly.

## Goals / Non-Goals

**Goals:**

- Split Ukrainian words into correct syllable blocks using phonetic rules
- Generate fake (distractor) syllables that sound plausible but don't match the word
- Shuffle real + fake syllables randomly for game presentation
- Use Angular signals for reactive updates to fake syllable count
- Maintain backward compatibility with existing component usage

**Non-Goals:**

- Multi-language support (Ukrainian only for now)
- Server-side syllable processing (client-side only)
- Persistent high scores or state management
- Text-to-speech integration

## Decisions

### Where to place syllable splitting logic

**Decision:** Create a standalone `syllable.service.ts` for splitting logic, inject into `Syllables` component.
**Rationale:** Separates business logic (phonetic rules) from presentation. Service can be tested independently and potentially reused for other game modes.
**Alternative considered:** Inline logic in component — rejected to keep component focused on presentation only.

### Ukrainian vowel detection

**Decision:** Define constant array of Ukrainian vowels (а, е, є, и, і, ї, о, у, ю, я uppercase variants). Split syllable before each vowel that starts a new syllable.
**Rationale:** Simple and fast for the game's use case. Works for age-appropriate vocabulary.
**Alternative considered:** Full dictionary-based NLP — rejected as overkill for ~100 basic game words.

### Fake syllable generation

**Decision:** Generate fake syllables by combining random consonants from the original word with random vowels, ensuring no exact match with real syllables.
**Rationale:** Guarantees phonetic similarity (same consonant set as the word) while creating guaranteed distractors.
**Alternative considered:** Fuzzy dictionary matching — rejected due to complexity and bundle size.

### Signal usage

**Decision:** `fakeCount` as `input()` signal. Splitting operation wrapped in `computed()` for automatic re-computation.
**Rationale:** Native Angular reactivity. When fake count slider changes (if added later), syllables update without explicit change detection.
**Alternative considered:** RxJS `BehaviorSubject` — signals are preferred in Angular v20+.

### Array shuffling

**Decision:** Fisher-Yates shuffle algorithm (in-place). Copy array before shuffle to preserve original order for answer validation.
**Rationale:** Unbiased random distribution, trivial implementation.

## Risks / Trade-offs

- [Risk] Apple/etc. word may have ambiguous syllable boundaries → Polish with content designer; accept "close enough" splits for age-appropriate vocabulary
- [Risk] Fake syllables might accidentally match real word parts → Filter out exact matches before shuffle
- [Risk] Screen reader pronunciation of shuffled syllables lacks context → Markup each token as individual button with aria-label containing full word context

## Migration Plan

1. **Phase 1:** Implement service + component extension in feature branch
2. **Phase 2:** QA with sample Ukrainian words from content
3. **Phase 3:** Merge to main; existing quest pages unaffected (no new inputs required)
4. **Rollback:** Simply revert commit; component still works with old word prop

## Open Questions

- Should fake syllable count have a maximum cap? (e.g., `max(5, len(realSyllables))`)
- Should we persist the seed/shuffle seed for replay consistency?
