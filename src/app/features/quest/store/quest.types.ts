export type Quest = {
  id: number;
  image: string;
  syllables: string[];
  isDone: boolean;
};

export type QuestState = {
  list: Quest[];
};
