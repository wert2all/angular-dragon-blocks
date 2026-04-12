import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { QuestDetails } from "../details/details";
import { ViewActiveQuest } from "../../store/quest.types";

@Component({
  selector: "app-quest-task",
  imports: [QuestDetails],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./task.html",
})
export class TaskComponent {
  quest = input.required<ViewActiveQuest | null>();
}
