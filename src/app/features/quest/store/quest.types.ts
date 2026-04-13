import { BrickColor } from '../../../layout/lego-brick/lego-brick';

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

export type ActiveQuest = Omit<Quest, 'syllables'> & {
  word: string;
  syllables: ViewSyllable[];
};

export type ViewActiveQuest = Omit<Quest, 'syllables'> & {
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
