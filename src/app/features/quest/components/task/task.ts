import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { QuestDetails } from '../details/details';
import { ViewActiveQuest } from '../../store/quest.types';
import { QuestSyllablesComponent } from '../syllables/syllables';

@Component({
  selector: 'app-quest-task',
  imports: [QuestDetails, QuestSyllablesComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task.html',
})
export class TaskComponent {
  readonly quest = input.required<ViewActiveQuest | null>();
  readonly syllables = computed(() => this.quest()?.syllables.filter(sylable => sylable.isReal) || []);
}
