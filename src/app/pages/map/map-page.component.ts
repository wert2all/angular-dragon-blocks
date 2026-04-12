import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { questFeature } from "../../features/quest/store/quest.feature";

@Component({
  selector: "app-map-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="flex justify-center">
    <div class="items-center justify-center p-12 border-4 border-vibrant-orange bg-warm-cream rounded-2xl ">
      <img
        src="/gemini_generated_map.png"
        alt="Dragon's World Map"
        class="max-w-full h-auto rounded-lg shadow-lg"
      />
    </div>
    </div>
  `,
})
export class MapPageComponent {
  private store = inject(Store);
  protected quests = this.store.selectSignal(questFeature.selectKidQuests);
}
