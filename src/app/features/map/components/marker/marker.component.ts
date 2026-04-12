import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from "@angular/core";
import { ViewQuestMarker } from "../../../quest/store/quest.types";

@Component({
  selector: "app-quest-marker",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./marker.component.html",
})
export class QuestMarkerComponent {
  readonly quest = input.required<ViewQuestMarker>();
  readonly markerClick = output<{ quest: ViewQuestMarker; event: Event }>();
  onClick(event: Event) {
    this.markerClick.emit({ quest: this.quest(), event });
  }
}
