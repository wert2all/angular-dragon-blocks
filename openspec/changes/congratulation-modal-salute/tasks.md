## 1. Salute Animation Component

- [ ] 1.1 Create `SaluteAnimationComponent` as standalone Angular component
- [ ] 1.2 Add canvas element with full coverage sizing
- [ ] 1.3 Implement particle class with position, velocity, color, and size properties
- [ ] 1.4 Create particle system that spawns ~1500 particles using palette colors randomly
- [ ] 1.5 Implement gravity physics and particle lifecycle
- [ ] 1.6 Add `requestAnimationFrame` animation loop with canvas rendering
- [ ] 1.7 Implement 10-second timer that stops animation and clears canvas
- [ ] 1.8 Add proper cleanup in `ngOnDestroy` (cancel animation frame, clear timeout)

## 2. Congratulation Modal Component

- [ ] 2.1 Create `CongratsModalComponent` as standalone Angular component
- [ ] 2.2 Import and use `ModalWindowComponent` for modal container
- [ ] 2.3 Add congratulatory message text content (child-friendly success message)
- [ ] 2.4 Style modal content with Warm Cream background and Deep Purple text
- [ ] 2.5 Add `SaluteAnimationComponent` as background behind modal content
- [ ] 2.6 Wire close output from `ModalWindowComponent` to component output
- [ ] 2.7 Add proper signal-based state management for modal visibility
- [ ] 2.8 Ensure accessibility: ARIA attributes, focus trap, ESC key handling

## 3. Quest Page Integration

- [ ] 3.1 Add logic to detect when all syllables are correctly matched
- [ ] 3.2 Add signal or state to track quest completion status
- [ ] 3.3 Import `CongratsModalComponent` in quest page
- [ ] 3.4 Render `CongratsModalComponent` conditional on completion signal
- [ ] 3.5 Handle modal close event to reset/dismiss celebration state

## 4. Testing and Verification

- [ ] 4.1 Test modal opens when all syllables are correct
- [ ] 4.2 Test modal does not open on partial or incorrect attempts
- [ ] 4.3 Verify salute animation runs for exactly 10 seconds
- [ ] 4.4 Verify animation stops and clears after 10 seconds
- [ ] 4.5 Test keyboard navigation (TAB trap, ESC close)
- [ ] 4.6 Test screen reader compatibility
- [ ] 4.7 Verify only palette colors are used in animation
- [ ] 4.8 Test proper cleanup on component destruction (no memory leaks)

## 5. Storybook Stories (Optional)

- [ ] 5.1 Create Storybook story for `SaluteAnimationComponent`
- [ ] 5.2 Create Storybook story for `CongratsModalComponent`
