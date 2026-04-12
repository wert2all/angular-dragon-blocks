import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Syllabes } from "../../features/syllables/syllables";
import { TaskComponent } from "../../features/quest/components/task/task";

@Component({
  selector: "app-quest",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Syllabes, TaskComponent],
  templateUrl: "./quest.html",
})
export class Quest {
  private readonly route = inject(ActivatedRoute);

  readonly questId = this.route.snapshot.paramMap.get("id") ?? "";
}
