import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProgressEntry } from './quest.types';

export const QuestActions = createActionGroup({
  source: 'quest',
  events: {
    'set active quest': props<{ questId: number | null }>(),
    'set done syllable': props<{ id: string }>(),
    'complete quest': props<{ questId: number }>(),
    'load saved progress': emptyProps(),
    'hydrate quest progress': props<{ progresses: ProgressEntry[] }>(),
    'save progress success': emptyProps(),
    'store error': props<{ error: Error }>(),
  },
});
