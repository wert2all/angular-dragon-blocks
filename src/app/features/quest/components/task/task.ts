import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { questFeature } from "../../store/quest.feature";
import { QuestDetails } from "../details/details";

@Component({
  selector: "app-quest-task",
  imports: [QuestDetails],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./task.html",
})
export class TaskComponent {
  private store = inject(Store);
  taskId = input.required<number>();

  protected all = this.store.selectSignal(questFeature.selectKidQuests);

  protected quest = computed(() => {
    const questId = this.taskId();
    return this.all().quests.filter((quest) => quest.id == questId)[0];
  });
}
