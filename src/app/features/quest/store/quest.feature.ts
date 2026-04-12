import { createFeature, createReducer } from "@ngrx/store";
import { QuestState } from "./quest.types";
import { quests } from "./quest.store";

const initState: QuestState = {
  list: quests,
};

export const questFeature = createFeature({
  name: "quest",
  reducer: createReducer(initState),
  extraSelectors: ({ }) => {
    return {};
  },
});
