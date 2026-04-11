import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-quest",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: "./quest.html",
})
export class Quest {
  private readonly route = inject(ActivatedRoute);

  readonly questId = this.route.snapshot.paramMap.get("id") ?? "";
}
