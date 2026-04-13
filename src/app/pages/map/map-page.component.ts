import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { questFeature } from '../../features/quest/store/quest.feature';
import { ViewQuestMarker } from '../../features/quest/store/quest.types';
import { QuestMarkerComponent } from '../../features/map/components/marker/marker.component';
import { MapDetailWindowComponent } from '../../features/map/components/detail-window/detail-window.component';
import { QuestDetails } from '../../features/quest/components/details/details';

@Component({
  selector: 'app-map-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './map-page.component.html',
  imports: [QuestMarkerComponent, MapDetailWindowComponent, QuestDetails],
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
