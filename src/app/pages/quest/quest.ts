import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Syllabes } from "../../features/syllables/syllables";

@Component({
  selector: "app-quest",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Syllabes],
  templateUrl: "./quest.html",
})
export class Quest {
  private readonly route = inject(ActivatedRoute);

  readonly questId = this.route.snapshot.paramMap.get("id") ?? "";
}
