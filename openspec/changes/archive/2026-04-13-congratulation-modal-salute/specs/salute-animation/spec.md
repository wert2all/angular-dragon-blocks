## ADDED Requirements

### Requirement: Salute animation renders in background

The salute animation SHALL render behind the modal content using a canvas element.

#### Scenario: Canvas present during modal

- **WHEN** the congratulation modal is open
- **THEN** a canvas element SHALL be present rendering the salute animation

#### Scenario: Canvas covers viewport

- **WHEN** the animation is active
- **THEN** the canvas SHALL cover the visible modal area

### Requirement: Animation uses canvas particles

The salute animation SHALL use HTML5 Canvas API to render particles.

#### Scenario: Particles rendered via canvas

- **WHEN** the animation is running
- **THEN** particles SHALL be drawn using the Canvas 2D rendering context

#### Scenario: Particle physics applied

- **WHEN** the animation is running
- **THEN** particles SHALL have physics (gravity, velocity) for realistic movement

### Requirement: Animation uses application palette colors

The salute animation SHALL only use the four application palette colors.

#### Scenario: Colors from palette only

- **WHEN** particles are rendered
- **THEN** colors SHALL be limited to: Deep Purple (#6e026f), Soft Teal (#abdadc), Warm Cream (#f1e6c9), Vibrant Orange (#fa891a)

#### Scenario: Random color distribution

- **WHEN** particles are spawned
- **THEN** each particle SHALL randomly select one of the four palette colors

### Requirement: Animation runs for 10 seconds

The salute animation SHALL automatically run for exactly 10 seconds.

#### Scenario: Animation starts with modal

- **WHEN** the congratulation modal opens
- **THEN** the salute animation SHALL begin immediately

#### Scenario: Animation stops after 10 seconds

- **WHEN** 10 seconds have elapsed since animation started
- **THEN** the animation SHALL stop and canvas SHALL clear

#### Scenario: Animation does not restart automatically

- **WHEN** the animation completes after 10 seconds
- **THEN** it SHALL NOT restart until the modal closes and reopens

### Requirement: Animation has huge visual impact

The salute animation SHALL have a "huge" visual impact with high particle count.

#### Scenario: High particle count

- **WHEN** the animation is running
- **THEN** there SHALL be approximately 1500 particles active

#### Scenario: Continuous particle emission

- **WHEN** the animation is running
- **THEN** particles SHALL continuously spawn throughout the 10-second duration

### Requirement: Animation performance requirements

The salute animation SHALL use requestAnimationFrame for smooth rendering.

#### Scenario: Smooth animation

- **WHEN** the animation is running
- **THEN** it SHALL use requestAnimationFrame for rendering updates

#### Scenario: Proper cleanup on destroy

- **WHEN** the component is destroyed before 10 seconds
- **THEN** the animation frame handle SHALL be cancelled and timer cleared
