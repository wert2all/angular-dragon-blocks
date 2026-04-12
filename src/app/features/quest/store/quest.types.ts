export type MarkerPosition = {
  x: number;
  y: number;
};

export type Quest = {
  id: number;
  image: string;
  syllables: string[];
  isDone: boolean;
  position: MarkerPosition;
};

export type WithWordQuest = Quest & {
  word: string;
};

export type ViewQuestMarker = {
  id: number;
  image: string;
  word: string;
  position: MarkerPosition;
  isDone: boolean;
};

export type ViewMap = {
  quests: ViewQuestMarker[];
};

export type QuestState = {
  list: Quest[];
};
