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

export interface QuestState {
  list: Quest[];
}
