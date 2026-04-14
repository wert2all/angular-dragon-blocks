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
  id: string;
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

// Storage types for quest progress persistence
export const STORAGE_KEY = 'dragon-blocks-quest-progress';
export const CURRENT_VERSION = 1;

export interface ProgressEntry {
  questId: number;
  isDone: boolean;
}

export interface ProgressData {
  v: typeof CURRENT_VERSION;
  progresses: ProgressEntry[];
}

export type SavedQuestProgress = Map<number, boolean>;

// Helper functions for storage
export function isValidProgressData(data: unknown): data is ProgressData {
  const d = data as Partial<ProgressData>;
  return (
    typeof d === 'object' &&
    d !== null &&
    typeof d.v === 'number' &&
    Array.isArray(d.progresses) &&
    d.progresses.every(
      (entry: unknown) =>
        typeof entry === 'object' &&
        entry !== null &&
        typeof (entry as ProgressEntry).questId === 'number' &&
        typeof (entry as ProgressEntry).isDone === 'boolean'
    )
  );
}

export function migrateToCurrentVersion(data: Partial<ProgressData>): ProgressData {
  if (data.v === CURRENT_VERSION) {
    return data as ProgressData;
  }
  // Migration from v0 or undefined: assume flat array of quest IDs
  if (data.v === undefined || data.v === 0) {
    const oldProgresses = (data.progresses || []) as unknown[];
    const migrated: ProgressEntry[] = oldProgresses
      .filter((p): p is number => typeof p === 'number')
      .map(questId => ({ questId, isDone: true }));
    return { v: CURRENT_VERSION, progresses: migrated };
  }
  return { v: CURRENT_VERSION, progresses: [] };
}
