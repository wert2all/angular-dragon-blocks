import { ChangeDetectionStrategy, Component, input } from "@angular/core";

@Component({
  selector: "app-quest-task",
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="flex justify-center">
    <div class="inline-flex flex-wrap justify-center gap-3 rounded-lg border-2 border-dashed border-vibrant-orange p-10">
      Task {{ taskId() }}
    </div>
  </div>
  `,
})
export class TaskComponent {
  taskId = input.required<number>();
}
