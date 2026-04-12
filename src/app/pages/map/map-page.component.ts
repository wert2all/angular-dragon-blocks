import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { questFeature } from "../../features/quest/store/quest.feature";
import { QuestDetailComponent } from "./components/quest-detail/quest-detail.component";
import { ViewQuestMarker } from "../../features/quest/store/quest.types";
import { QuestMarkerComponent } from "../../features/map/components/marker.component";
@Component({
  selector: "app-map-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./map-page.component.html",
  imports: [QuestMarkerComponent, QuestDetailComponent],
})
export class MapPageComponent {
  private store = inject(Store);
  protected quests = this.store.selectSignal(questFeature.selectKidQuests);
  protected selectedQuest = signal<ViewQuestMarker | null>(null);
  onMarkerClick(data: { quest: ViewQuestMarker; event: Event }) {
    data.event.stopPropagation();
    this.selectedQuest.set({ ...data.quest });
  }
  onMapClick() {
    this.selectedQuest.set(null);
  }
  closeDetail() {
    this.selectedQuest.set(null);
  }
}
