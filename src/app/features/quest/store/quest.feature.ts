import { createFeature, createReducer, createSelector } from "@ngrx/store";
import { Quest, QuestState, ViewMap } from "./quest.types";
import { quests } from "./quest.store";

const getWord = (quest: Quest) => quest.syllables.join("");

const initState: QuestState = {
  list: quests,
};

export const questFeature = createFeature({
  name: "quest",
  reducer: createReducer(initState),
  extraSelectors: ({ selectList }) => {
    const selectKidQuests = createSelector(selectList, (all): ViewMap => {
      return {
        quests: all.map((quest) => ({ ...quest, word: getWord(quest) })),
      };
    });
    return {
      selectKidQuests,
    };
  },
});
