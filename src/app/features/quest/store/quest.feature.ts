import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { QuestActions } from './quest.actions';
import { quests } from './quest.store';
import { Quest, QuestState, ViewMap } from './quest.types';

function getWord(quest: Quest): string {
  return quest.syllables.join('');
}

const initState: QuestState = {
  list: quests,
  activeQuest: null,
};

export const questFeature = createFeature({
  name: 'quest',
  reducer: createReducer(
    initState,

    on(QuestActions.setActiveQuest, (state, { questId }): QuestState => {
      const foundQuest = state.list.find(quest => quest.id === questId);
      if (!foundQuest) {
        return { ...state, activeQuest: null };
      }

      return {
        ...state,
        activeQuest: {
          ...foundQuest,
          word: getWord(foundQuest),
          syllables: foundQuest.syllables.map(syllable => ({
            syllable,
            isDone: false,
            color: null,
          })),
        },
      };
    }),

    on(QuestActions.setDoneSyllable, (state, { syllable, color }): QuestState => {
      if (!state.activeQuest) {
        return state;
      }

      return {
        ...state,
        activeQuest: {
          ...state.activeQuest,
          syllables: state.activeQuest.syllables.map(syl => {
            if (syl.syllable !== syllable) {
              return syl;
            }
            return { ...syl, isDone: true, color };
          }),
        },
      };
    })
  ),

  extraSelectors: ({ selectList }) => ({
    selectKidQuests: createSelector(
      selectList,
      (all): ViewMap => ({
        quests: all.map(quest => ({ ...quest, word: getWord(quest) })),
      })
    ),
  }),
});
