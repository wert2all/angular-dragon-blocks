import { Component, input } from '@angular/core';
import { ViewSyllable } from '../../store/quest.types';
import { LegoBrick } from '../../../../layout/lego-brick/lego-brick';
import { BorderLegoBrick } from '../../../../layout/border-lego-brick/border-lego-brick';

@Component({
  selector: 'app-quest-syllables',
  templateUrl: './syllables.html',
  imports: [LegoBrick, BorderLegoBrick],
})
export class QuestSyllablesComponent {
  syllables = input.required<ViewSyllable[]>();
}
