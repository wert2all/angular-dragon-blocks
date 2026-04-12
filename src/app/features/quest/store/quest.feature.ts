import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { Quest, QuestState, ViewActiveQuest, ViewMap } from "./quest.types";
import { quests } from "./quest.store";
import { QuestActions } from "./quest.actions";

const getWord = (quest: Quest) => quest.syllables.join("");

const initState: QuestState = {
  list: quests,
  activeQuestId: null,
};

export const questFeature = createFeature({
  name: "quest",
  reducer: createReducer(
    initState,

    on(
      QuestActions.setActiveQuest,
      (state, { questId }): QuestState => ({
        ...state,
        activeQuestId: questId,
      }),
    ),
  ),

  extraSelectors: ({ selectList, selectActiveQuestId }) => {
    const selectKidQuests = createSelector(selectList, (all): ViewMap => {
      return {
        quests: all.map((quest) => ({ ...quest, word: getWord(quest) })),
      };
    });
    const selectActiveQuest = createSelector(
      selectList,
      selectActiveQuestId,
      (all, activeQuestId): ViewActiveQuest | null => {
        if (!activeQuestId) {
          return null;
        }
        const activeQuest = all.filter((quest) => quest.id == activeQuestId)[0];

        return activeQuest
          ? {
            ...activeQuest,
            word: getWord(activeQuest),
            syllables: activeQuest.syllables.map((syllable) => ({
              syllable: syllable,
              isDone: true,
            })),
          }
          : null;
      },
    );
    return {
      selectKidQuests,
      selectActiveQuest,
    };
  },
});
