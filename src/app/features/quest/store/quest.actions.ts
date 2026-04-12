import { createActionGroup, props } from '@ngrx/store';
import { BrickColor } from '../../../layout/lego-brick/lego-brick';

export const QuestActions = createActionGroup({
  source: 'quest',
  events: {
    'set active quest': props<{ questId: number | null }>(),
    'set done syllable': props<{ syllable: string; color: BrickColor }>(),
  },
});
