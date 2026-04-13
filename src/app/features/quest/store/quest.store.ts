import { Quest } from './quest.types';

export const quests: Quest[] = [
  {
    id: 1,
    image: '/assets/quests/quest-1.png',
    syllables: ['ма', 'ма'],
    isDone: false,
    position: { x: 10, y: 85 },
    fakeSyllables: 1,
  },
  {
    id: 2,
    image: '/assets/quests/quest-2.png',
    syllables: ['та', 'то'],
    isDone: false,
    position: { x: 17, y: 78 },
    fakeSyllables: 1,
  },
  {
    id: 3,
    image: '/assets/quests/quest-3.png',
    syllables: ['да', 'вид'],
    isDone: false,
    position: { x: 23, y: 70 },
    fakeSyllables: 1,
  },
  {
    id: 4,
    image: '/assets/quests/quest-4.png',
    syllables: ['сир'],
    isDone: false,
    position: { x: 26, y: 67 },
    fakeSyllables: 1,
  },
  {
    id: 5,
    image: '/assets/quests/quest-5.png',
    syllables: ['ко', 'ро', 'на'],
    isDone: false,
    position: { x: 22, y: 60 },
    fakeSyllables: 2,
  },
  {
    id: 6,
    image: '/assets/quests/quest-6.png',
    syllables: ['ба', 'ра', 'бан'],
    isDone: false,
    position: { x: 25, y: 52 },
    fakeSyllables: 2,
  },
];
