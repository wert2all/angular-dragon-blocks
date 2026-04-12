import { Quest } from './quest.types';

export const quests: Quest[] = [
  {
    id: 1,
    image: '/assets/quests/quest-1.png',
    syllables: ['ма', 'ма'],
    isDone: false,
    position: { x: 10, y: 85 },
  },
  {
    id: 2,
    image: '/assets/quests/quest-2.png',
    syllables: ['та', 'то'],
    isDone: false,
    position: { x: 17, y: 78 },
  },
  {
    id: 3,
    image: '/assets/quests/quest-3.png',
    syllables: ['да', 'вид'],
    isDone: false,
    position: { x: 23, y: 70 },
  },
  {
    id: 4,
    image: '/assets/quests/quest-4.png',
    syllables: ['сир'],
    isDone: false,
    position: { x: 26, y: 67 },
  },
];
