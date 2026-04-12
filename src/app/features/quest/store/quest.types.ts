export type Quest = {
  id: number;
  image: string;
  syllables: string[];
  isDone: boolean;
};

export type WithWordQuest = Quest & {
  word: string;
};

export type QuestState = {
  list: Quest[];
};
