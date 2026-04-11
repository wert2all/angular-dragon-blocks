import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { QuestPageState } from "./quest-page.types";
import { QuestPageActions } from "./quest-page.actions";

const initState: QuestPageState = {
  isLoading: false,
};

export const questFeature = createFeature({
  name: "quest",
  reducer: createReducer(
    initState,
    on(
      QuestPageActions.setLoading,
      (state, { isLoading }): QuestPageState => ({
        ...state,
        isLoading,
      }),
    ),
  ),
  extraSelectors: ({ selectIsLoading }) => {
    return {
      isLoading: createSelector(selectIsLoading, (isLoading) => isLoading),
    };
  },
});
