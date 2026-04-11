## 1. Ukrainian Syllable Service

- [x] 1.1 Create `src/app/core/services/syllable.service.ts` with `splitUkrainianWord(word: string): string[]` function
- [x] 1.2 Define Ukrainian vowels constant array (а, е, є, и, і, ї, о, у, ю, я, uppercase variants)
- [x] 1.3 Implement syllable splitting using vowel-consonant pattern matching
- [x] 1.4 Add unit tests for syllable splitting (single, two, complex syllable words)
- [x] 1.5 Implement `generateFakeSyllables(word: string, count: number): string[]` function
- [x] 1.6 Add filtering to ensure fake syllables don't match real syllables
- [x] 1.7 Implement Fisher-Yates shuffle for shuffling array
- [x] 1.8 Add unit tests for fake generation and shuffling

## 2. Syllables Component Extension

- [x] 2.1 Add `fakeCount = input<number>(0)` signal to `Syllables` component
- [x] 2.2 Inject `SyllableService` into `Syllables` component
- [x] 2.3 Create computed signal `syllables = computed(() => ...)` combining split, fake injection, and shuffle
- [x] 2.4 Update `syllables.html` template to render shuffled syllables using `<app-syllable>`
- [x] 2.5 Add fallback when word input is empty (show empty state)
- [x] 2.6 Ensure backward compatibility with existing word input usage

## 3. Template & Styling Updates

- [x] 3.1 Update `syllables.html` to replace hardcoded syllables with dynamic `@for` loop
- [x] 3.2 Ensure proper gap/layout preserved for shuffled syllable display
- [x] 3.3 Test responsive behavior with varying syllable counts

## 4. Integration & Verification

- [x] 4.1 Verify `Syllables` component works with sample Ukrainian words from specs
- [x] 4.2 Test fake syllable injection with different counts (0, 1, 2, 3)
- [x] 4.3 Verify shuffling produces non-deterministic output
- [x] 4.4 Test signal reactivity: changing fakeCount updates syllables automatically
- [x] 4.5 Run all unit tests and ensure passing (14 ✓)

## 5. QA & Polish

- [x] 5.1 Validate Ukrainian vowel patterns with QA content samples
- [x] 5.2 Verify no exact match between fake and real syllables in edge cases
- [x] 5.3 Ensure TypeScript strict mode compliance (build ✓)

## 6. UI Colors (Additional)

- [x] 6.1 Assign random `colorClass` to each syllable (lego-deep-purple, lego-soft-teal, lego-vibrant-orange)
- [x] 6.2 Update template to bind `[colorClass]` to `<app-syllable>`
