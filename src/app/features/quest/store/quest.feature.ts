import { createFeature, createReducer, createSelector } from "@ngrx/store";
import { QuestState } from "./quest.types";

const initState: QuestState = {
  isLoading: false,
};

export const questFeature = createFeature({
  name: "quest",
  reducer: createReducer(initState),
  extraSelectors: ({ selectIsLoading }) => {
    return {
      isLoading: createSelector(selectIsLoading, (isLoading) => isLoading),
    };
  },
});
