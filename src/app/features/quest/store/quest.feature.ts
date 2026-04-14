import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { QuestActions } from './quest.actions';
import { quests } from './quest.store';
import { Quest, QuestState, ViewMap, ViewSyllable, ViewTaskQuest, ProgressEntry } from './quest.types';
import { BrickColor } from '../../../layout/lego/lego-brick/lego-brick';

function getWord(quest: Quest): string {
  return quest.syllables.join('');
}

const getRandomColor = (): BrickColor => {
  const SYLLABLE_COLORS: BrickColor[] = ['lego-deep-purple', 'lego-soft-teal', 'lego-vibrant-orange'];
  const index = Math.floor(Math.random() * SYLLABLE_COLORS.length);
  return SYLLABLE_COLORS[index];
};

const generateId = (): string => crypto.randomUUID();

const getViewSyllable = (value: string, isReal: boolean): ViewSyllable => ({
  id: generateId(),
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

const makeSyllablesForQuest = (quest: Quest): ViewSyllable[] => {
  const realSyllables = quest.syllables.map(syllable => getViewSyllable(syllable, true));
  const fakeSyllables = generateFakeSyllables(quest.syllables, quest.fakeSyllables).map(syllable =>
    getViewSyllable(syllable, false)
  );
  return shuffleArray([...realSyllables, ...fakeSyllables]);
};

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
          correctSyllables: foundQuest.syllables.map(syllable => getViewSyllable(syllable, true)),
          syllablesForQuest: makeSyllablesForQuest(foundQuest),
        },
      };
    }),
    on(QuestActions.setDoneSyllable, (state, { id }): QuestState => {
      if (!state.activeQuest) {
        return state;
      }
      // Mark only the specific syllable instance by id
      return {
        ...state,
        activeQuest: {
          ...state.activeQuest,
          correctSyllables: state.activeQuest.correctSyllables.map(syl =>
            syl.id === id ? { ...syl, isDone: true } : syl
          ),
        },
      };
    }),
    on(
      QuestActions.completeQuest,
      (state, { questId }): QuestState => ({
        ...state,
        list: state.list.map(quest => ({
          ...quest,
          isDone: quest.id === questId ? true : quest.isDone,
        })),
      })
    ),
    on(QuestActions.hydrateQuestProgress, (state, { progresses }: { progresses: ProgressEntry[] }): QuestState => {
      const progressMap = new Map<number, boolean>(progresses.map(p => [p.questId, p.isDone]));
      return {
        ...state,
        list: state.list.map(quest => ({
          ...quest,
          isDone: progressMap.has(quest.id) ? progressMap.get(quest.id)! : quest.isDone,
        })),
      };
    })
  ),
  extraSelectors: ({ selectList, selectActiveQuest }) => ({
    selectKidQuests: createSelector(
      selectList,
      (all): ViewMap => ({
        quests: all.map(quest => ({
          ...quest,
          word: getWord(quest),
        })),
      })
    ),
    selectTaskQuest: createSelector(selectActiveQuest, (active): ViewTaskQuest | null =>
      active ? { ...active, syllables: active.correctSyllables } : null
    ),
  }),
});
