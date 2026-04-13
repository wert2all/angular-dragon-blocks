import { createActionGroup, props } from '@ngrx/store';

export const QuestActions = createActionGroup({
  source: 'quest',
  events: {
    'set active quest': props<{ questId: number | null }>(),
    'set done syllable': props<{ syllable: string }>(),
    'complete quest': props<{ questId: number }>(),
  },
});
