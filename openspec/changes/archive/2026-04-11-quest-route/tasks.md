## 1. Setup

- [x] 1.1 Generate the quest feature module with routing (`ng generate module quest --routing`).
- [x] 1.2 Add lazy‑loaded route entry in `app-routing.module.ts` for `quest/:id`.

## 2. Component

- [x] 2.1 Implement `QuestComponent` as a standalone component using signals to expose the `id` route parameter.
- [x] 2.2 Apply Tailwind CSS utility classes (e.g., `text-soft-teal`) to style the component.

## 3. Navigation Integration

- [x] 3.1 Update existing navigation templates (e.g., sidebar, quest list) to link to the new route using `routerLink="/quest/{{id}}"`.

## 4. Testing

- [x] 4.1 Write a unit test that verifies `QuestComponent` correctly reads the `id` param and exposes it via a signal.
- [x] 4.2 Write an e2e test that navigates to `/quest/42` and asserts the heading displays "Quest 42".

## 5. Validation & Build

- [x] 5.1 Run the full test suite (`pnpm test`) and ensure all tests pass.
- [x] 5.2 Build the application (`pnpm ng build`) and verify a separate chunk for the quest module is generated.
