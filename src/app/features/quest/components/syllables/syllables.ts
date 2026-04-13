import { Component, input } from '@angular/core';
import { ViewSyllable } from '../../store/quest.types';
import { BorderLegoBrick } from '../../../../layout/lego/border-lego-brick/border-lego-brick';
import { LegoBrick } from '../../../../layout/lego/lego-brick/lego-brick';

@Component({
  selector: 'app-quest-syllables',
  templateUrl: './syllables.html',
  imports: [LegoBrick, BorderLegoBrick],
})
export class QuestSyllablesComponent {
  syllables = input.required<ViewSyllable[]>();
}
