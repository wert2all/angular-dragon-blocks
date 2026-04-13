import { BrickColor } from '../../../layout/lego/lego-brick/lego-brick';

export interface MarkerPosition {
  x: number;
  y: number;
}

export interface Quest {
  id: number;
  image: string;
  syllables: string[];
  isDone: boolean;
  position: MarkerPosition;
  fakeSyllables: number;
}

export type WithWordQuest = Quest & {
  word: string;
};

export interface ViewQuestMarker {
  id: number;
  image: string;
  word: string;
  position: MarkerPosition;
  isDone: boolean;
}

export interface ViewMap {
  quests: ViewQuestMarker[];
}

export interface ViewSyllable {
  syllable: string;
  color: BrickColor;
  isDone: boolean;
  isReal: boolean;
}

export interface ViewSyllableForShow {
  syllable: string;
  color: BrickColor;
}

export type ActiveQuest = Omit<Quest, 'syllables'> & {
  word: string;
  correctSyllables: ViewSyllable[];
  syllablesForQuest: ViewSyllableForShow[];
};

export type ViewTaskQuest = Omit<Quest, 'syllables'> & {
  id: number;
  image: string;
  isDone: boolean;
  word: string;
  syllables: ViewSyllable[];
};
export interface QuestState {
  list: Quest[];

  activeQuest: ActiveQuest | null;
}
