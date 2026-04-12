import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { ViewQuestMarker } from "../../store/quest.types";

@Component({
  selector: "app-quest-marker",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./marker.component.html",
})
export class QuestMarkerComponent {
  readonly quest = input.required<ViewQuestMarker>();
}
