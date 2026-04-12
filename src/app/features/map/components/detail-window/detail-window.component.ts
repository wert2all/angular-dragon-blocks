import type { ViewQuestMarker } from "../../../../features/quest/store/quest.types";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from "@angular/core";
import { Router } from "@angular/router";
import { QuestDetails } from "../../../../features/quest/components/details/details";

@Component({
  selector: "app-quest-detail",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./detail-window.component.html",
  styleUrl: "./detail-window.component.css",
  imports: [QuestDetails],
})
export class MapDetailWindowComponent {
  readonly quest = input.required<ViewQuestMarker | null>();
  readonly closeChange = output<void>();
  private router = inject(Router);

  onWordClick() {
    const q = this.quest();
    if (q) {
      this.router.navigate(["/quest", q.id]);
    }
  }
}
