import { createActionGroup, props } from "@ngrx/store";

export const QuestPageActions = createActionGroup({
  source: "quest-page",
  events: {
    "set loading": props<{ isLoading: boolean }>(),
  },
});
