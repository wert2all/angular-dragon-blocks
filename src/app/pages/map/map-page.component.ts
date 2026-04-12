import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { questFeature } from "../../features/quest/store/quest.feature";
import { QuestMarkerComponent } from "../../features/quest/components/quest-marker/marker.component";

@Component({
  selector: "app-map-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 class="text-3xl font-bold text-deep-purple mb-6">
        Dragon's World Map
      </h1>
      <div class="relative">
        <img
          src="/gemini_generated_map.png"
          alt="Dragon's World Map"
          class="max-w-full h-auto rounded-lg shadow-lg"
        />
        @for (quest of quests().quests; track quest.id) {
          <app-quest-marker            [quest]="quest"           />
        }
      </div>
    </div>
  `,
  imports: [QuestMarkerComponent],
})
export class MapPageComponent {
  private store = inject(Store);
  protected quests = this.store.selectSignal(questFeature.selectKidQuests);
}
