import { Component, inject, input } from "@angular/core";
import { ViewQuestMarker } from "../../store/quest.types";
import { Router } from "@angular/router";

@Component({
  selector: "app-quest-details",
  templateUrl: "./details.html",
})
export class QuestDetails {
  private router = inject(Router);
  readonly quest = input.required<ViewQuestMarker | null>();
  readonly isSmall = input(false);
  readonly noClick = input(false);

  onWordClick() {
    const q = this.quest();
    if (q) {
      this.router.navigate(["/quest", q.id]);
    }
  }
}
