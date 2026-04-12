import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { QuestActions } from './quest.actions';
import { quests } from './quest.store';
import { Quest, QuestState, ViewMap } from './quest.types';

const getWord = (quest: Quest) => quest.syllables.join('');

const initState: QuestState = {
  list: quests,
  activeQuest: null,
};

export const questFeature = createFeature({
  name: 'quest',
  reducer: createReducer(
    initState,

    on(QuestActions.setActiveQuest, (state, { questId }): QuestState => {
      if (!questId) {
        return { ...state, activeQuest: null };
      }
      const foundQuest = state.list.filter(quest => quest.id == questId)[0];
      if (!foundQuest) {
        return { ...state, activeQuest: null };
      }

      return {
        ...state,
        activeQuest: {
          ...foundQuest,
          word: getWord(foundQuest),
          syllables: foundQuest.syllables.map(syllable => {
            return {
              syllable,
              isDone: false,
            };
          }),
        },
      };
    })
  ),

  extraSelectors: ({ selectList }) => {
    const selectKidQuests = createSelector(selectList, (all): ViewMap => {
      return {
        quests: all.map(quest => ({ ...quest, word: getWord(quest) })),
      };
    });

    return { selectKidQuests };
  },
});
