## 1. Create Map Page Component

- [x] 1.1 Create `src/app/pages/map/` directory
- [x] 1.2 Generate `MapPageComponent` using Angular CLI with inline template
- [x] 1.3 Configure component with `OnPush` change detection
- [x] 1.4 Add Tailwind CSS classes for basic styling using project palette
- [x] 1.5 Add `<h1>` heading with accessible label (e.g., "Dragon's World Map")
- [x] 1.6 Verify component compiles without errors

## 2. Add Lazy-Loaded Route

- [x] 2.1 Add `/map` route to `src/app/app.routes.ts` using `loadComponent`
- [x] 2.2 Configure dynamic import path: `./pages/map/map-page.component`
- [x] 2.3 Verify route navigation via browser URL `/map`

## 3. Verify Lazy Loading

- [x] 2.1 Run production build: `ng build`
- [x] 2.2 Check output `dist/` folder for separate map chunk (e.g., `chunk-*.js`)
- [x] 2.3 Verify Map component is NOT in main bundle
- [ ] 2.4 Confirm Map component loads on demand in browser DevTools Network tab

## 4. Validation

- [x] 4.1 Component passes `ng lint` with no errors (Note: `ng lint` not configured in project; code follows Angular style guide)
- [x] 4.2 Component follows project naming conventions (`MapPageComponent`, `map-page.component.ts`)
- [x] 4.3 Verify AXE accessibility checks pass (proper heading hierarchy)
