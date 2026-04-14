# Development Workflow Guide

This document outlines the development workflow for **Dragon Blocks: Reading Adventures** — an Angular-based educational game application.

---

## Prerequisites

| Tool        | Version | Install Command                 |
| ----------- | ------- | ------------------------------- |
| Node.js     | v20+    | [Download](https://nodejs.org/) |
| pnpm        | 10.x+   | `npm install -g pnpm`           |
| Angular CLI | 21.x+   | `pnpm install -g @angular/cli`  |

---

## Quick Start

```bash
# 1. Clone the repository
git clone git@github.com:wert2all/angular-dragon-blocks.git
cd angular-dragon-blocks

# 2. Install dependencies
pnpm install

# 3. Start development server
pnpm ng serve

# 4. Open browser at http://localhost:4200/
```

---

## Available Scripts

| Command           | Purpose                                   |
| ----------------- | ----------------------------------------- |
| `pnpm ng serve`   | Start dev server with hot reload          |
| `pnpm ng build`   | Build for production (outputs to `dist/`) |
| `pnpm ng test`    | Run unit tests with Vitest                |
| `pnpm ng lint`    | Run ESLint + Prettier checks              |
| `pnpm lint --fix` | Auto-fix linting issues                   |
| `pnpm format`     | Format all files with Prettier            |
| `pnpm commitlint` | Validate commit message format            |

---

## Project Architecture

```
src/
├── app/
│   ├── features/     # Feature modules/components
│   ├── layout/       # Layout components (header, footer)
│   ├── pages/        # Page-level components (routed)
│   ├── store/        # NgRx state management
│   ├── app.config.ts # App configuration
│   ├── app.routes.ts # Route definitions
│   └── app.ts        # Root component
├── styles.css        # Tailwind CSS + theme variables
└── main.ts           # Application entry point
```

### Key Technologies

- **Angular v21** — Standalone components, signals, OnPush change detection
- **NgRx v21** — Reactive state management
- **Tailwind CSS v4** — Utility-first styling
- **Vitest** — Unit testing framework
- **ESLint + Prettier** — Code quality and formatting

---

## Development Workflow

### 1. Creating New Components

```bash
# Generate a standalone component
ng generate component features/my-feature

# Generate a service
ng generate service services/my-service

# Generate a signal store
ng generate service store/my-store
```

#### Component Structure

```typescript
@Component({
  selector: 'app-my-component',
  imports: [CommonModule],
  templateUrl: './my-component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.active]': 'isActive()',
  },
})
export class MyComponent {
  // Use signals for state
  readonly items = signal<Item[]>([]);

  // Use computed for derived state
  readonly itemCount = computed(() => this.items().length);

  // Use input/output functions (not decorators)
  readonly id = input<string>('');
  readonly onSelect = output<Item>();
}
```

### 2. Styling Guidelines

#### Tailwind CSS Palette

| Color          | Variable                 | Class                           | Hex       |
| -------------- | ------------------------ | ------------------------------- | --------- |
| Deep Purple    | `--color-deep-purple`    | `bg/text/border-deep-purple`    | `#6e026f` |
| Soft Teal      | `--color-soft-teal`      | `bg/text/border-soft-teal`      | `#abdadc` |
| Warm Cream     | `--color-warm-cream`     | `bg/text/border-warm-cream`     | `#f1e6c9` |
| Vibrant Orange | `--color-vibrant-orange` | `bg/text/border-vibrant-orange` | `#fa891a` |

#### Usage Examples

```html
<!-- With opacity variations -->
<button class="bg-deep-purple/90 text-warm-cream hover:bg-deep-purple">Click me</button>

<!-- Combined with Tailwind utilities -->
<div class="rounded-xl bg-warm-cream/95 p-6 shadow-lg shadow-deep-purple/10">
  <!-- content -->
</div>
```

### 3. State Management (NgRx + Signals)

```typescript
// Use signals for local component state
export class QuestPageComponent {
  private readonly store = inject(Store);
  readonly questData = this.store.selectSignal(selectQuestData);

  // Local signal state
  readonly selectedBlock = signal<SyllableBlock | null>(null);

  // Derived computed values
  readonly canSubmit = computed(() => this.selectedBlock() !== null && !this.isSubmitting());
}
```

### 4. Routing

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'map',
    loadComponent: () => import('./pages/map/map.page').then(m => m.MapPageComponent),
  },
  {
    path: 'quest/:id',
    loadComponent: () => import('./pages/quest/quest.page').then(m => m.QuestPageComponent),
  },
];
```

---

## Code Quality Checklist

Before committing, ensure:

### ✅ Must Pass

- [ ] Code is formatted (`pnpm format`)
- [ ] Lint checks pass (`pnpm ng lint`)
- [ ] All auto-fixable issues resolved (`pnpm ng lint --fix`)
- [ ] No `any` types — use `unknown` instead
- [ ] Components use `ChangeDetectionStrategy.OnPush`
- [ ] Uses signals for state (no `mutate`)

### ✅ Accessibility (WCAG AA)

- [ ] All interactive elements focusable
- [ ] Proper ARIA attributes on custom components
- [ ] Color contrast ratios meet AA standards
- [ ] Passes AXE accessibility checks

### ✅ Performance

- [ ] Use `NgOptimizedImage` for static images
- [ ] Lazy load feature routes
- [ ] Use `computed()` for derived state

---

## Commit Message Format

This project uses [Conventional Commits](https://conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

| Type       | Use for                                 |
| ---------- | --------------------------------------- |
| `feat`     | New features                            |
| `fix`      | Bug fixes                               |
| `docs`     | Documentation changes                   |
| `style`    | Code style changes (formatting)         |
| `refactor` | Code refactoring                        |
| `test`     | Adding/updating tests                   |
| `chore`    | Build process or auxiliary tool changes |

### Examples

```
feat(quest): add syllable block dragging

Implement drag-and-drop mechanics for syllable blocks
with touch and mouse support.

fix(map): resolve route parameter parsing

docs(readme): update installation instructions
```

---

## Testing

### Unit Tests (Vitest)

```bash
# Run all tests
pnpm ng test

# Run with watch mode
pnpm ng test --watch

# Run with coverage
pnpm ng test --coverage
```

### Test Structure

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

---

## Build & Deployment

### Development Build

```bash
pnpm ng build
```

### Production Build

```bash
pnpm ng build --configuration production
# Output: dist/angular-dragon-blocks/
```

### Bundle Budgets

| Type                | Warning | Error |
| ------------------- | ------- | ----- |
| Initial             | 500 kB  | 1 MB  |
| Any component style | 4 kB    | 8 kB  |

---

## VS Code Extensions (Recommended)

| Extension                 | Purpose               |
| ------------------------- | --------------------- |
| Angular Language Service  | Template autocomplete |
| Tailwind CSS IntelliSense | Class autocomplete    |
| ESLint + Prettier         | Code quality          |
| Angular Snippets          | Code snippets         |

---
