import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { QuestActions } from './quest.actions';
import { quests } from './quest.store';
import { Quest, QuestState, ViewMap, ViewSyllable } from './quest.types';
import { BrickColor } from '../../../layout/lego/lego-brick/lego-brick';

function getWord(quest: Quest): string {
  return quest.syllables.join('');
}

const getRandomColor = (): BrickColor => {
  const SYLLABLE_COLORS: BrickColor[] = ['lego-deep-purple', 'lego-soft-teal', 'lego-vibrant-orange'];

  const index = Math.floor(Math.random() * SYLLABLE_COLORS.length);
  return SYLLABLE_COLORS[index];
};

const getViewSyllable = (value: string, isReal: boolean): ViewSyllable => ({
  syllable: value,
  isDone: false,
  color: getRandomColor(),
  isReal,
});

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateRandomSyllable(consonants: string, vowels: string): string {
  const randomConsonant = (): string => consonants[Math.floor(Math.random() * consonants.length)];
  const randomVowel = (): string => vowels[Math.floor(Math.random() * vowels.length)];

  const useConsonantFirst = Math.random() > 0.3;
  if (useConsonantFirst) {
    return randomConsonant() + randomVowel();
  }
  return randomVowel() + randomConsonant();
}

function generateFakeSyllables(realSyllables: string[], count: number): string[] {
  const fakes: string[] = [];
  const consonants = 'бвгджзйклмнпрстфхцчшщ';
  const vowels = 'аеиоуяюєїі';

  while (fakes.length < count) {
    const syllable = generateRandomSyllable(consonants, vowels);
    if (!realSyllables.includes(syllable) && !fakes.includes(syllable)) {
      fakes.push(syllable);
    }
  }
  return fakes;
}

const makeSyllables = (quest: Quest): ViewSyllable[] =>
  shuffleArray([
    ...quest.syllables.map(syllable => getViewSyllable(syllable, true)),
    ...generateFakeSyllables(quest.syllables, quest.fakeSyllables).map(syllable => getViewSyllable(syllable, false)),
  ]);

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
          syllables: makeSyllables(foundQuest),
        },
      };
    }),

    on(QuestActions.setDoneSyllable, (state, { syllable }): QuestState => {
      if (!state.activeQuest) {
        return state;
      }

      return {
        ...state,
        activeQuest: {
          ...state.activeQuest,
          syllables: state.activeQuest.syllables.map(syl =>
            syl.syllable === syllable ? { ...syl, isDone: true } : syl
          ),
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
