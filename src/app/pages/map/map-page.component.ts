import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-map-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <h1 class="text-3xl font-bold text-deep-purple mb-4">
        Dragon's World Map
      </h1>
  `,
  styles: [``],
})
export class MapPageComponent { }
