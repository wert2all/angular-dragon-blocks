## Context

The Dragon Blocks game currently provides no visual feedback when players complete a quest successfully. We need to add celebration feedback using the existing `ModalWindowComponent` architecture and a canvas-based particle animation system.

Current constraints:
- Must use standalone Angular components with signals
- Must follow the existing modal pattern via `ModalWindowComponent` export from `@app/layout/modal-window`
- Application color palette is defined via CSS variables in `src/styles.css`
- Canvas API is available natively (no external animation libraries)

## Goals / Non-Goals

**Goals:**
- Display a congratulation modal when all syllables are correctly matched
- Provide a visually stunning "huge" salute animation using canvas particles
- Ensure animation runs for exactly 10 seconds with high visual impact
- Maintain accessibility (modal traps focus, ESC to close, proper ARIA)
- Follow Angular best practices (signals, OnPush, inject())

**Non-Goals:**
- No changes to existing quest page logic beyond triggering the modal
- No audio effects (visual only)
- No persistent state for celebration (one-time display per completion)
- No mobile-specific optimizations (responsive but not separate code paths)

## Decisions

### Decision: Canvas-based salute animation
**Choice:** Use HTML5 Canvas API with requestAnimationFrame for the salute animation.
**Rationale:**
- Native browser support, no external dependencies
- Full control over particle physics and rendering
- High performance for "huge" particle count (1000+ particles)

**Alternatives considered:**
- CSS animations: Insufficient control for complex particle physics
- External libraries (ts-canvas-confetti): Adds dependency for simple use case
- SVG: Lower performance for high particle counts

### Decision: Separate SaluteAnimationComponent
**Choice:** Create a standalone `SaluteAnimationComponent` that encapsulates canvas logic.
**Rationale:**
- Reusable if needed elsewhere
- Clean separation of concerns
- Easy to test in isolation

### Decision: Signal-based state management
**Choice:** Use Angular signals for modal visibility state.
**Rationale:**
- Follows project Angular best practices
- Fine-grained reactivity

### Decision: Hardcoded 10-second duration
**Choice:** Animation duration fixed at 10 seconds via `setTimeout` cleanup.
**Rationale:**
- Simple, predictable behavior per requirements
- No need for configuration (single use case)

### Decision: Application palette only
**Choice:** Use only the four palette colors: Deep Purple, Soft Teal, Warm Cream, Vibrant Orange.
**Rationale:**
- Consistent with project styling guidelines
- Predefined CSS variables available

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Canvas animation performance on low-end devices | Limit particle count to ~1500; use `will-change` CSS for canvas layer |
| Memory leaks from animation frames | Proper cleanup in `ngOnDestroy`; clear `requestAnimationFrame` handle |
| Modal focus trap conflicts | Use existing focus management from `ModalWindowComponent` |
| Timing drift in 10-second duration | Use `setTimeout` + `cancelAnimationFrame` combination for accuracy |

## Migration Plan

No migration needed - purely additive features. Deployment steps:
1. Create `SaluteAnimationComponent` with canvas logic
2. Create `CongratulationModalComponent` using `ModalWindowComponent`
3. Integrate into quest page to trigger when all syllables match
4. Test focus management and keyboard navigation

## Open Questions

None - all requirements are clear from proposal.
