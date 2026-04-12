import { createActionGroup, props } from "@ngrx/store";

export const QuestActions = createActionGroup({
  source: "quest",
  events: {
    "set active quest": props<{ questId: number | null}>(),
  },
});
