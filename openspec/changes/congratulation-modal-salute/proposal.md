## Why

The Dragon Blocks game needs to celebrate player achievements when they correctly complete a syllable-matching quest. Currently, there's no visual feedback or celebration when the player succeeds, leaving the experience feeling incomplete. Adding a congratulation modal with a festive salute animation will provide positive reinforcement and create a more engaging, rewarding experience for children learning to read.

## What Changes

- Add congratulation modal that displays when player correctly matches all syllables
- Integrate with existing `ModalWindowComponent` for consistent UI
- Implement "huge" salute (confetti/fireworks) animation that fires for 10 seconds
- Use application color palette (Deep Purple, Soft Teal, Warm Cream, Vibrant Orange)
- Modal displays success message and celebration visuals
- Salute automatically stops after 10 seconds, modal can be closed by user

## Capabilities

### New Capabilities

- `congratulation-modal`: Modal component that displays success state when quest is completed correctly. Integrates with existing ModalWindowComponent and includes congratulatory message.
- `salute-animation`: Canvas-based confetti/fireworks animation system that renders colorful particles using application palette. Animation runs for fixed 10-second duration with high particle count for "huge" visual impact.

### Modified Capabilities

- None - this is a purely additive change with no modifications to existing spec requirements.

## Impact

- **Quest page**: Will need logic to detect when all syllables are correct and trigger modal display
- **ModalWindowComponent**: Existing component will be reused for consistent modal behavior
- **Styling**: Tailwind CSS classes from application palette will be used
- **New files**: Congratulation modal component, salute animation service/component
- **Dependencies**: No new external dependencies; canvas API is native
