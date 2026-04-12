import type { ViewQuestMarker } from "../../../../features/quest/store/quest.types";
import { ChangeDetectionStrategy, Component, inject, input, output } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-quest-detail",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./quest-detail.component.html",
  styleUrl: "./quest-detail.component.css"
})
export class QuestDetailComponent {
  readonly quest = input.required<ViewQuestMarker | null>();
  readonly closeChange = output<void>();
  private router = inject(Router);

  onWordClick() {
    const q = this.quest();
    if (q) {
      this.router.navigate(['/quest', q.id]);
    }
  }
}
