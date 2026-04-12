import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { questFeature } from "../../features/quest/store/quest.feature";

@Component({
  selector: "app-map-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <h1 class="text-3xl font-bold text-deep-purple mb-4">
        Dragon's World Map
      </h1>
  `,
})
export class MapPageComponent {
  private store = inject(Store);
  protected quests = this.store.selectSignal(questFeature.selectKidQuests)
}
