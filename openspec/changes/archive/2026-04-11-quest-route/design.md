## Context

The application currently uses Angular v20+ with standalone components as the default, signals for state management, and Tailwind CSS for styling. The routing configuration (`app-routing.module.ts`) defines existing routes but does not include a quest route. Users need a way to navigate directly to a specific quest by its identifier, which will improve engagement and allow the app to manage quest‑related state more cleanly.

## Goals / Non-Goals

**Goals:**

- Add a lazy‑loaded route `quest/:id` that renders a dedicated `QuestComponent`.
- Create a `quest` feature module (`quest.module.ts`) with its own routing file (`quest-routing.module.ts`).
- Pass the `id` route parameter to the component and expose it via a signal.
- Ensure the new route integrates with existing navigation and follows project accessibility and testing standards.
- Provide unit and e2e tests for the route and component.

**Non-Goals:**

- Implement full quest business logic or data fetching; that will be handled by a separate service later.
- Add guards, resolvers, or complex state management beyond the route parameter.
- Pre‑load the quest module; lazy loading is sufficient for now.
- Refactor existing unrelated routes or components.

## Decisions

### Decision: Lazy‑load the quest feature module with `loadChildren`

**Rationale:** Using a feature module gives us a clear place to grow the quest feature (additional sub‑routes, services, guards) without cluttering the root routing file. `loadChildren` is the recommended pattern for lazy‑loaded modules in Angular v20+.

**Implementation sketch:**

```typescript
// app-routing.module.ts
{
  path: 'quest/:id',
  loadChildren: () => import('./quest/quest.module')
    .then(m => m.QuestModule)
}
```

### Decision: Define a dedicated route inside `QuestModule` for the `:id` param

**Rationale:** Keeping the `:id` segment inside the feature module isolates quest‑specific routing concerns and allows future child routes (e.g., `quest/:id/summary`).

```typescript
// quest-routing.module.ts
const routes: Routes = [
  {
    path: '',
    component: QuestComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestRoutingModule {}
```

### Decision: Implement `QuestComponent` as a standalone component with signals

**Rationale:** Aligns with project standards (standalone components, OnPush change detection, signals). Using a signal for the route parameter makes the component reactive and testable.

```typescript
@Component({
  selector: 'app-quest',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="p-4">
      <h1 class="text-2xl font-bold">Quest {{ questId() }}</h1>
      <!-- placeholder content -->
    </section>
  `,
})
export class QuestComponent {
  private route = inject(ActivatedRoute);
  readonly questId = computed(() => this.route.paramMap().get('id') ?? '');
}
```

### Decision: Use Tailwind CSS utility classes for styling

**Rationale:** Consistency with the rest of the application and the defined color palette (e.g., `text-soft-teal`). No custom CSS needed for this simple view.

### Decision: Add focused unit and e2e tests

**Rationale:** Guarantees navigation works, the component receives the correct `id`, and accessibility requirements are met.

- **Unit test**: Verify `questId` signal reflects the route param.
- **E2E test**: Navigate to `/quest/42` and assert the heading shows “Quest 42”.

## Risks / Trade‑offs

| Risk                                                                          | Mitigation                                                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Introducing a new lazy‑loaded module could increase bundle size if over‑used. | Keep the module small; only load when the route is accessed.                            |
| Route parameter `id` is not validated, potentially leading to errors.         | Add simple validation in the component (e.g., numeric check) and display a fallback UI. |
| Existing navigation may need updates to include links to the new quest route. | Audit navigation templates and add a `routerLink` where appropriate.                    |
| Future guard or resolver requirements may require refactoring.                | Design the module with a placeholder for guards/resolvers to simplify later addition.   |

## Migration Plan

1. **Generate the feature module and component**
   ```bash
   ng generate module quest --routing --standalone false
   ng generate component quest/quest --standalone true
   ```
2. **Add the lazy‑loaded route** to `src/app/app-routing.module.ts` as shown above.
3. **Implement `QuestComponent`** using the provided signal‑based pattern.
4. **Update navigation links** (e.g., sidebar, quest list) to use `routerLink="/quest/{{id}}"`.
5. **Write unit tests** (`quest.component.spec.ts`) and **e2e test** (`quest.e2e-spec.ts`).
6. **Run the full test suite** (`pnpm test`) and ensure all existing tests pass.
7. **Build the application** (`pnpm ng build`) and verify that a separate chunk for the quest module is generated.
8. **Deploy** following the standard CI/CD pipeline.

## Open Questions

- Should the quest data be fetched in the component via a service now, or deferred to a later phase?
- Will the quest route require authentication/authorization checks in the future?
- Is a resolver preferred over the component handling the `id` param for data pre‑fetching?
