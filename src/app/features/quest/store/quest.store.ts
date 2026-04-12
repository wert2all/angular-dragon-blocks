import { Quest } from "./quest.types";

export const quests: Quest[] = [
  {
    id: 1,
    image: "/assets/quests/quest-1.png",
    syllables: ["ма", "ма"],
    isDone: true,
    position: { x: 30, y: 25 },
  },
  {
    id: 2,
    image: "/assets/quests/quest-1.png",
    syllables: ["та", "то"],
    isDone: false,
    position: { x: 65, y: 40 },
  },
];
