import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-map-detail-window',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './detail-window.component.html',
  styleUrl: './detail-window.component.css',
})
export class MapDetailWindowComponent {
  readonly closeWindow = output<void>();
}
