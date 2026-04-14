## Project Overview

This project is an educational game application built with Angular called "Dragon Blocks: Reading Adventures". The application helps children learn to read by manipulating syllable blocks to build objects for the dragon character Toothless. The game features progressive difficulty levels and a syllable-based building mechanic.

## Setup Commands

- Install dependencies: `pnpm install`
- Install Angular CLI globally: `pnpm install -g @angular/cli`
- Start development server: `pnpm ng serve`
- Build for production: `pnpm ng build`

## Development Workflow

### 1. Implementation

- Use `ng generate` to create new components, services, and modules
- Follow Angular's component-based architecture patterns
- Apply TypeScript best practices and Tailwind CSS styling

### 2. Testing

- Run unit tests: `ng test`
- Verify all tests pass before proceeding

### 3. Code Quality

- Run linting: `ng lint`
- Fix any linting errors or warnings

### 4. Formatting

- Format code: `pnpm exec prettier --write .`

### 5. Build Verification

- Verify production build succeeds: `ng build`
- Ensure no build errors or warnings

## Post-Implementation Verification

Before considering any task complete, ensure all formatting, linting, and build verification steps above have been executed successfully.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Styling with Tailwind CSS

This project uses Tailwind CSS for styling. The application has a custom color palette defined in `src/styles.css`:

| Color          | CSS Variable             | Tailwind Class                                                      | Hex       |
| -------------- | ------------------------ | ------------------------------------------------------------------- | --------- |
| Deep Purple    | `--color-deep-purple`    | `bg-deep-purple`, `text-deep-purple`, `border-deep-purple`          | `#6e026f` |
| Soft Teal      | `--color-soft-teal`      | `bg-soft-teal`, `text-soft-teal`, `border-soft-teal`                | `#abdadc` |
| Warm Cream     | `--color-warm-cream`     | `bg-warm-cream`, `text-warm-cream`, `border-warm-cream`             | `#f1e6c9` |
| Vibrant Orange | `--color-vibrant-orange` | `bg-vibrant-orange`, `text-vibrant-orange`, `border-vibrant-orange` | `#fa891a` |

### Usage Guidelines

- **Always use the application palette** for UI components to maintain visual consistency
- Use opacity modifiers for variations: `bg-deep-purple/50`, `text-vibrant-orange/80`
- Combine with standard Tailwind utilities: `bg-warm-cream/95 shadow-lg shadow-deep-purple/10`
- The palette supports child-friendly UI with warm, playful colors

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.
- **Use Tailwind CSS classes for all template styling** - avoid custom CSS in component stylesheets
- **Use external template files** (`.html`) when template code exceeds ~5-10 lines or contains complex structure
- Keep inline templates only for very small components (1-5 lines of template code)

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## License

This project is licensed under the **GNU General Public License v3.0** (GPL‑3.0). See [LICENCE.md](./LICENCE.md) for details.
