import { createActionGroup, emptyProps } from "@ngrx/store";

export const AppActions = createActionGroup({
  source: "app",
  events: {
    "toggle sound": emptyProps(),
  },
});
