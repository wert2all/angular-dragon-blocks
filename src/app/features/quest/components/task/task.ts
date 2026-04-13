import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { QuestDetails } from '../details/details';
import { ViewTaskQuest } from '../../store/quest.types';
import { QuestSyllablesComponent } from '../syllables/syllables';

@Component({
  selector: 'app-quest-task',
  imports: [QuestDetails, QuestSyllablesComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task.html',
})
export class TaskComponent {
  readonly quest = input.required<ViewTaskQuest | null>();
  readonly syllables = computed(() => this.quest()?.syllables.filter(sylable => sylable.isReal) || []);
}
