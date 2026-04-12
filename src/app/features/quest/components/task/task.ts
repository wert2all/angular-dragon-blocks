import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  selector: "app-quest-task",
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./task.html",
})
export class TaskComponent {
  taskId = input.required<number>();
}
